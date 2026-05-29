import React from "react";
import BriefBuilder from "@/components/tools/BriefBuilder";
import { Sparkles } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Cover Brief Builder | Mystic Vault Society",
  description: "Outline your book cover genre, tone, key symbols, and aesthetic preferences. Generate a cover brief markdown file to send directly to designers.",
  openGraph: {
    title: "Book Cover Brief Builder | Mystic Vault Society",
    description: "Outline your book cover genre, tone, key symbols, and aesthetic preferences. Generate a cover brief markdown file to send directly to designers.",
    url: "https://mysticvaultsociety.com/tools/brief-builder",
    type: "website",
  },
};

export default function BriefBuilderPage() {
  return (
    <div className="flex flex-col gap-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header section */}
      <header className="text-center pt-16 flex flex-col items-center gap-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Aesthetic Alignment
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground tracking-tight">
          Book Cover Brief Builder
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed">
          Help cover designers capture the visual soul of your story. Define your title, genre, aesthetic, color palettes, and key symbols, and download a custom brief instantly.
        </p>
      </header>

      {/* Brief Builder Workspace */}
      <main className="w-full mt-4">
        <BriefBuilder />
      </main>
    </div>
  );
}
