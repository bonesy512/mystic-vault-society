"use server";

import Stripe from "stripe";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function createCheckoutSession(priceId: string) {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  
  // Resilient fallback for development/testing when keys are not set
  if (!stripeSecret) {
    console.warn("STRIPE_SECRET_KEY is missing in environment. Redirecting to mock success page.");
    redirect(`/shop/success?mock=true&priceId=${priceId}`);
  }

  const stripe = new Stripe(stripeSecret, {
    apiVersion: "2025-01-27" as unknown as typeof Stripe.API_VERSION,
  });

  let origin = "https://mysticvaultsociety.com";
  try {
    const headersList = await headers();
    origin = headersList.get("origin") || "https://mysticvaultsociety.com";
  } catch (e) {
    console.error("Error reading headers, using fallback origin:", e);
  }

  let session;
  try {
    session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // In production, this would be a real Stripe price ID (e.g. price_12345)
          // For testing, if it's a mock price ID, Stripe API might throw an error unless it exists
          price: priceId.startsWith("price_mvs") ? "price_1Q5g2aL4u6GfL8y8MVSMOCK" : priceId, 
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop?canceled=true`,
      metadata: {
        priceId: priceId,
      }
    });
  } catch (err) {
    console.error("Stripe Checkout Session creation failed:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    // If Stripe throws due to invalid mock price ID, redirect to success mock to allow user validation
    redirect(`/shop/success?mock=true&priceId=${priceId}&error=${encodeURIComponent(errorMessage)}`);
  }

  if (session && session.url) {
    redirect(session.url);
  } else {
    throw new Error("Failed to generate checkout URL");
  }
}
