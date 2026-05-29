import React from "react";
import Quiz from "@/components/tools/Quiz";
import { Sparkles } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publishing Readiness Quiz | Mystic Vault Society",
  description: "Test your manuscript readiness for publishing. Get recommendations on developmental editing, line editing, book formatting, and print-on-demand setups.",
  openGraph: {
    title: "Publishing Readiness Quiz | Mystic Vault Society",
    description: "Test your manuscript readiness for publishing. Get recommendations on developmental editing, line editing, book formatting, and print-on-demand setups.",
    url: "https://mysticvaultsociety.com/tools/quiz",
    type: "website",
  },
};

export default function QuizPage() {
  return (
    <div className="flex flex-col gap-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header section */}
      <header className="text-center pt-16 flex flex-col items-center gap-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Manuscript Assessment
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground tracking-tight">
          Publishing Readiness Quiz
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed">
          Answer a few brief questions about your book draft's current stage to discover which publishing, editing, or formatting path matches your manuscript.
        </p>
      </header>

      {/* Quiz Workspace */}
      <main className="w-full mt-4">
        <Quiz />
      </main>
    </div>
  );
}
