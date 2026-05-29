import React from "react";
import Timeline from "@/components/tools/Timeline";
import { Sparkles } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rise of the Veilbreaker Lore Timeline | Mystic Vault Society",
  description: "Explore the mythological timeline and historical lore milestones of Binsmuth, the fantasy setting of Rise of the Veilbreaker.",
  openGraph: {
    title: "Rise of the Veilbreaker Lore Timeline | Mystic Vault Society",
    description: "Explore the mythological timeline and historical lore milestones of Binsmuth, the fantasy setting of Rise of the Veilbreaker.",
    url: "https://mysticvaultsociety.com/tools/timeline",
    type: "website",
  },
};

export default function TimelinePage() {
  return (
    <div className="flex flex-col gap-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header section */}
      <header className="text-center pt-16 flex flex-col items-center gap-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          The Chronicles of Binsmuth
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground tracking-tight">
          Lore &amp; Backstory Timeline
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed">
          Embark on a chronological tour through the ages of Binsmuth. Discover the celestial origins, the divine sibling gods, and the cataclysms leading up to the Veilbreaker prophecy.
        </p>
      </header>

      {/* Timeline Workspace */}
      <main className="w-full mt-4">
        <Timeline />
      </main>
    </div>
  );
}
