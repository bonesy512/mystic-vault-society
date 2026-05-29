import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, HelpCircle, Calendar, Edit3 } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guild Tools | Mystic Vault Society",
  description: "Explore interactive SFF author tools. Take the Publishing Readiness Quiz, view the Rise of the Veilbreaker Lore Timeline, or build a custom Cover Brief.",
  openGraph: {
    title: "Guild Tools | Mystic Vault Society",
    description: "Explore interactive SFF author tools. Take the Publishing Readiness Quiz, view the Rise of the Veilbreaker Lore Timeline, or build a custom Cover Brief.",
    url: "https://mysticvaultsociety.com/tools",
    type: "website",
  },
};

export default function ToolsIndexPage() {
  const tools = [
    {
      title: "Publishing Readiness Quiz",
      description: "Assess your manuscript status, target word counts, and editing passes to discover if you are ready for publication.",
      icon: HelpCircle,
      href: "/tools/quiz",
      actionText: "Take Quiz",
    },
    {
      title: "Book Cover Brief Builder",
      description: "Compile and outline your SFF cover design specifications, tone sliders, and key elements into a downloadable markdown brief.",
      icon: Edit3,
      href: "/tools/brief-builder",
      actionText: "Build Brief",
    },
    {
      title: "Rise of the Veilbreaker Timeline",
      description: "Dive into the chronological lore, mythology, and historical milestones of Michael Schustereit's debut fantasy universe.",
      icon: Calendar,
      href: "/tools/timeline",
      actionText: "View Timeline",
    },
  ];

  return (
    <div className="flex flex-col gap-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <header className="text-center pt-16 flex flex-col items-center gap-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Interactive Chambers
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground tracking-tight">
          Guild Tools &amp; Lore Chambers
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed">
          Welcome to the guild chambers. We have prepared interactive assistants to guide SFF creators through publishing preparation, and chronicled lore from Binsmuth for our readers.
        </p>
      </header>

      {/* Grid listing */}
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool) => {
          const IconComponent = tool.icon;
          return (
            <div
              key={tool.href}
              className="bg-card border border-border rounded-2xl p-6 sm:p-8 flex flex-col justify-between group hover:border-primary/30 transition-all duration-300 crimson-glow-hover"
            >
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center text-primary transition-all duration-300 group-hover:bg-primary/20 group-hover:border-primary">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">
                  {tool.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-border/50">
                <Link
                  href={tool.href}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors"
                >
                  {tool.actionText}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
