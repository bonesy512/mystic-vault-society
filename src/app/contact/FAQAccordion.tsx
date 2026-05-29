"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is the difference between Mystic Vault Society and a traditional publisher?",
    answer: "As a service-based publishing guild, you, the author, retain 100% of your rights and royalties. You pay for the specific professional services you need, such as editing or distribution support. Traditional publishers acquire the rights to your book in exchange for covering all costs and paying you a smaller royalty percentage."
  },
  {
    question: "Do you accept all manuscript submissions?",
    answer: "No. While we are not as selective as traditional publishers, we are a curated press. We only take on science fiction and fantasy projects that we believe are a good fit for our expertise and where we feel we can genuinely help the author succeed. Our goal is partnership, not just a transaction."
  },
  {
    question: "How much do your services cost?",
    answer: "Every project is unique, so we do not offer one-size-fits-all pricing. After our initial free consultation, we will provide you with a detailed, personalized quote based on the specific services your manuscript requires."
  }
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="bg-card border border-border rounded-xl overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full px-6 py-5 flex items-center justify-between text-left font-serif font-bold text-foreground text-sm sm:text-base hover:bg-secondary/40 transition-all duration-300"
            >
              <span>{faq.question}</span>
              <ChevronDown className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`} />
            </button>
            
            <div
              className={`transition-all duration-300 overflow-hidden ${
                isOpen ? "max-h-48 border-t border-border/50" : "max-h-0"
              }`}
            >
              <p className="p-6 text-muted-foreground text-xs sm:text-sm leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
