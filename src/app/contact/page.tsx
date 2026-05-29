import React from "react";
import ContactForm from "./ContactForm";
import FAQAccordion from "./FAQAccordion";
import { Sparkles, Calendar, Clock, HelpCircle } from "lucide-react";
import { cacheLife } from "next/cache";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a Consultation | Mystic Vault Society",
  description: "Get in touch with the Mystic Vault Society. Request a free consultation for developmental editing, print formatting, or cover brief design support.",
};

async function getContactPageData() {
  "use cache";
  cacheLife("days");
  
  return {
    hero: {
      title: "Contact Mystic Vault Society",
      description: "Your quest is important to us. Whether you have a question about our services, are ready for a consultation, or simply want to connect, send us a message. We will respond within two business days."
    },
    info: {
      processTitle: "Our Process",
      processDescription: "Once you submit your request, we will review the details of your project and typically respond within 48 hours to schedule a free, no-obligation consultation call. This allows us to understand your goals and provide an accurate, personalized quote for the services you need.",
      hoursTitle: "Business Hours",
      hoursDetails: "Monday – Friday\n9:00 AM – 5:00 PM (CST)"
    }
  };
}

export default async function ContactPage() {
  const data = await getContactPageData();

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#0B0B0C] to-[#642B36]/20 py-20 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground tracking-tight">
            {data.hero.title}
          </h1>
          <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
            {data.hero.description}
          </p>
        </div>
      </section>

      {/* Contact Form & Info Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 w-full">
        {/* Form Column */}
        <div className="lg:col-span-7 bg-card/35 border border-border p-6 sm:p-10 rounded-2xl crimson-glow text-center flex flex-col gap-6">
          <h2 className="text-2xl font-serif font-bold text-foreground text-left">Send a Message</h2>
          <ContactForm />
        </div>

        {/* Info Column */}
        <div className="lg:col-span-5 flex flex-col gap-8 text-left">
          {/* Our Process */}
          <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-3">
            <h3 className="font-serif font-bold text-lg text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary shrink-0" />
              {data.info.processTitle}
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
              {data.info.processDescription}
            </p>
          </div>

          {/* Business Hours */}
          <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-3">
            <h3 className="font-serif font-bold text-lg text-foreground flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary shrink-0" />
              {data.info.hoursTitle}
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed whitespace-pre-line">
              {data.info.hoursDetails}
            </p>
          </div>
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-10 w-full">
        <h2 className="text-3xl font-serif font-bold text-foreground text-center flex items-center gap-3">
          <HelpCircle className="w-8 h-8 text-primary" />
          Frequently Asked Questions
        </h2>
        <FAQAccordion />
      </section>
    </div>
  );
}
