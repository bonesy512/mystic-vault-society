"use server";

import { Resend } from "resend";

export interface ContactFormState {
  success?: boolean;
  message?: string;
  errors?: {
    name?: string;
    email?: string;
    message?: string;
  };
}

export async function submitContactForm(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  // Basic validation
  const errors: { name?: string; email?: string; message?: string } = {};
  if (!name || name.trim() === "") errors.name = "Name is required.";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email address.";
  if (!message || message.trim() === "") errors.message = "Message is required.";

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.warn("RESEND_API_KEY is missing. Simulating contact form submission.");
    // Wait 500ms to simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      success: true,
      message: "Thank you for your message! We will be in touch shortly. (Mock Submission Success)"
    };
  }

  const resend = new Resend(resendApiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: "Mystic Vault Contact <onboarding@resend.dev>", // Resend test sandbox domain
      to: "publisher@mysticvaultsociety.com",
      subject: `MVS Contact: Message from ${name}`,
      text: `From: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return {
        success: false,
        message: `Failed to dispatch email: ${error.message}`
      };
    }

    return {
      success: true,
      message: "Thank you for your message! We will be in touch shortly."
    };
  } catch (err: any) {
    console.error("Resend execution error:", err);
    return {
      success: false,
      message: err.message || "An unexpected error occurred. Please try again."
    };
  }
}
