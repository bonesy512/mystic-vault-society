import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { z } from "zod";

const StripeAddressSchema = z.object({
  city: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  line1: z.string().nullable().optional(),
  line2: z.string().nullable().optional(),
  postal_code: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
}).nullable().optional();

const StripeShippingDetailsSchema = z.object({
  address: StripeAddressSchema,
  name: z.string().nullable().optional(),
}).nullable().optional();

const StripeCustomerDetailsSchema = z.object({
  email: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
}).nullable().optional();

const CheckoutSessionPayloadSchema = z.object({
  id: z.string(),
  customer_details: StripeCustomerDetailsSchema,
  amount_total: z.number().nullable().optional(),
  metadata: z.record(z.string(), z.string()).nullable().optional(),
  shipping_details: StripeShippingDetailsSchema,
});

export async function POST(req: NextRequest) {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const resendApiKey = process.env.RESEND_API_KEY;
  const printifyApiKey = process.env.PRINTIFY_API_KEY;

  if (!stripeSecret || !webhookSecret) {
    console.error("Missing Stripe secrets in environment configuration.");
    return NextResponse.json({ error: "Configuration Error" }, { status: 500 });
  }

  const stripe = new Stripe(stripeSecret, {
    apiVersion: "2025-01-27" as unknown as typeof Stripe.API_VERSION,
  });

  const body = await req.text();
  const signature = req.headers.get("stripe-signature") || "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown signature verification error";
    console.error(`Webhook signature verification failed: ${errorMessage}`);
    return NextResponse.json({ error: `Webhook Error: ${errorMessage}` }, { status: 400 });
  }

  console.log(`Received validated Stripe webhook event: ${event.type}`);

  if (event.type === "checkout.session.completed") {
    const parseResult = CheckoutSessionPayloadSchema.safeParse(event.data.object);
    if (!parseResult.success) {
      console.error("Webhook payload validation failed:", parseResult.error.format());
      return NextResponse.json({ error: "Invalid webhook payload structure" }, { status: 400 });
    }
    const session = parseResult.data;
    
    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name || "Customer";
    const amountTotal = session.amount_total ? (session.amount_total / 100).toFixed(2) : "0.00";
    const metadata = session.metadata || {};
    const priceId = metadata.priceId || "unknown";

    console.log(`Processing successful order: ${session.id} | Amount: $${amountTotal} | Customer: ${customerEmail}`);

    // 1. Transactional Email Receipt via Resend
    if (resendApiKey && customerEmail) {
      const resend = new Resend(resendApiKey);
      try {
        await resend.emails.send({
          from: "Mystic Vault Society <orders@mysticvaultsociety.com>",
          to: customerEmail,
          subject: "Your Mystic Vault Society Order Confirmation",
          text: `Hi ${customerName},\n\nThank you for your order! We have received your payment of $${amountTotal} for item code ${priceId}.\n\nYour order ID is: ${session.id}.\n\nIf you purchased physical merchandise, our print-on-demand fulfillment partner is preparing the item for production. We will email tracking details once it ships.\n\nThank you for supporting SFF authors!\n\nAll the best,\nMystic Vault Society`,
        });
        console.log(`Sent customer order receipt to: ${customerEmail}`);
      } catch (emailErr) {
        console.error("Failed to send customer receipt email:", emailErr);
      }
    } else {
      console.warn("Skipping email receipt: Resend API Key or customer email is missing.");
    }

    // 2. Print-on-Demand Fulfillment via Printify REST API
    if (printifyApiKey) {
      const shippingAddress = session.shipping_details?.address;
      
      if (shippingAddress) {
        // Map order parameters to Printify REST payload format
        const printifyOrderPayload = {
          external_id: session.id,
          line_items: [
            {
              // For demonstration, map our stripe price ID to a Printify product ID/variant ID
              product_id: "printify_product_placeholder_id",
              variant_id: 12345, // default variant
              quantity: 1
            }
          ],
          shipping_method: 1, // standard shipping
          send_shipping_notification: true,
          address_to: {
            first_name: customerName.split(" ")[0] || "Customer",
            last_name: customerName.split(" ").slice(1).join(" ") || "GuildMember",
            email: customerEmail || "",
            phone: session.customer_details?.phone || "",
            country: shippingAddress.country || "",
            region: shippingAddress.state || "",
            address1: shippingAddress.line1 || "",
            address2: shippingAddress.line2 || "",
            city: shippingAddress.city || "",
            zip: shippingAddress.postal_code || ""
          }
        };

        try {
          const shopId = process.env.PRINTIFY_SHOP_ID || "123456";
          const response = await fetch(`https://api.printify.com/v1/shops/${shopId}/orders.json`, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${printifyApiKey}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(printifyOrderPayload)
          });

          const resData = await response.json() as Record<string, unknown>;

          if (!response.ok) {
            const errorMsg = typeof resData.message === "string" ? resData.message : `HTTP error ${response.status}`;
            throw new Error(errorMsg);
          }

          console.log(`Successfully dispatched order ${session.id} to Printify. Printify Order ID: ${resData.id}`);
        } catch (printifyErr) {
          const printifyErrMsg = printifyErr instanceof Error ? printifyErr.message : "Unknown Printify fulfillment error";
          console.error("Printify API Order Submission failed:", printifyErrMsg);

          // Fallback: Alert MVS admin via Resend for manual order fulfillment
          if (resendApiKey) {
            const resend = new Resend(resendApiKey);
            try {
              await resend.emails.send({
                from: "Mystic Vault Society Alerts <system@mysticvaultsociety.com>",
                to: "publisher@mysticvaultsociety.com",
                subject: `URGENT: Printify Fulfillment Failed for Order ${session.id}`,
                text: `Stripe checkout completed successfully, but Printify API fulfillment submission failed.\n\nError: ${printifyErrMsg}\n\nOrder ID: ${session.id}\nCustomer Name: ${customerName}\nCustomer Email: ${customerEmail}\nTotal Amount: $${amountTotal}\nPrice ID: ${priceId}\nShipping Details:\n${JSON.stringify(session.shipping_details, null, 2)}\n\nPlease log in to the Printify Dashboard to manually construct this order.`,
              });
              console.log(`Dispatched administrative manual-fulfillment alert for order ${session.id}`);
            } catch (alertErr) {
              console.error("Failed to send admin alert email:", alertErr);
            }
          }
        }
      } else {
        console.warn(`Skipping Printify fulfillment for order ${session.id}: Shipping details are missing (possibly a digital product or donation).`);
      }
    } else {
      console.warn("Printify API integration is stubbed: PRINTIFY_API_KEY is not defined.");
    }
  }

  return NextResponse.json({ received: true });
}
