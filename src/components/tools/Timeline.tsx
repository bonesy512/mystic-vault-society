"use client";

import React, { useState } from "react";
import { Sparkles, ChevronDown } from "lucide-react";

interface Milestone {
  id: number;
  epoch: string;
  title: string;
  summary: string;
  details: string;
  footnote: string;
  category: "mythos" | "gods" | "veilbreaker";
}

const MILESTONES: Milestone[] = [
  {
    id: 1,
    epoch: "Day 1 of Creation",
    title: "The Aether and the Sun",
    summary: "The twin sibling gods, Aleara and Donegal, sitting in the void of chaos, speak of light and forge the sun from the raw aether.",
    details: "Before time began, the universe was filled with unstructured, unstable energy known as the aether. Recognizing that raw chaos could yield nothing permanent, the sibling gods channeled their thoughts to establish a stable source of power. The sun became the first anchor of order, pushing back the dark void.",
    footnote: "Wizards in the modern era tap directly into this original raw aether, risking their minds to bypass the gods' order.",
    category: "mythos",
  },
  {
    id: 2,
    epoch: "Day 4 of Creation",
    title: "The Forging of Binsmuth",
    summary: "Donegal anchors the mountains and soil, while Aleara seeds the first forests and breathes life into mortal human souls.",
    details: "Donegal laid down the physical structure of Binsmuth: the tectonic plates, the iron veins, and the granite walls. Under his hands, the geography solidified. Simultaneously, Aleara walked the lands, planting the sacred groves and breathing life into plants, animals, and humankind, establishing the law of balance.",
    footnote: "This joint effort created a duality where the land serves both physical progression and spiritual alignment.",
    category: "gods",
  },
  {
    id: 3,
    epoch: "Day 9 of Creation",
    title: "The Descent of Klydos",
    summary: "Klydos, the Lord of Tempests and father of the twins, attacks the world to dissolve the structures of order.",
    details: "Enraged by his children's attempts to bound the universe in order, Klydos launched an army of monsters and storm tempests down onto Binsmuth. To defend their creations, Aleara consecrated the first holy orders, granting divine powers to Priests, Druids, and the Paladins of the Order of Valor.",
    footnote: "This celestial struggle is why paladins and priests fight; they view combat as a divine duty to preserve the world.",
    category: "gods",
  },
  {
    id: 4,
    epoch: "The Second Age",
    title: "Consecration of the Groves",
    summary: "Aleara establishes nine sacred groves across the world, creating sanctuaries where the tempests cannot reach.",
    details: "To provide respite for her followers, Aleara placed nine magical groves across the globe. Within these groves, the climate is warm and serene, even during the harshest winters. Here, predators and prey drink from the same pools in peace, and believers can directly commune with the goddess.",
    footnote: "Three groves remain on the frozen continent of Versevor, including the grove at the capital city of Drea.",
    category: "mythos",
  },
  {
    id: 5,
    epoch: "The Modern Era",
    title: "The Rise of the Veilbreaker",
    summary: "The magical Veil protecting Binsmuth thins. A young knight discovers that the greatest threat lies within his own order.",
    details: "The events of Michael Schustereit's debut novel unfold. Thomas, a knight errant of the Order of Valor, uncovers a conspiracy revealing that the division between order and chaos is a deception. To prevent the collapse of reality, he must embrace the forbidden power of the Veilbreaker.",
    footnote: "Rise of the Veilbreaker explores these moral ambiguities and structural deceptions of Binsmuth's mythos.",
    category: "veilbreaker",
  },
];

export default function Timeline() {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const toggleNode = (id: number) => {
    if (activeNode === id) {
      setActiveNode(null);
    } else {
      setActiveNode(id);
    }
  };

  const filteredMilestones = MILESTONES.filter(
    (m) => filter === "all" || m.category === filter
  );

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
      {/* Category filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-border/50 pb-6">
        {["all", "mythos", "gods", "veilbreaker"].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setFilter(cat);
              setActiveNode(null);
            }}
            className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 border ${
              filter === cat
                ? "bg-primary/10 border-primary text-foreground"
                : "bg-card border-border text-muted-foreground hover:border-primary/20 hover:text-foreground"
            }`}
          >
            {cat === "all" ? "All Lore" : cat}
          </button>
        ))}
      </div>

      {/* Vertical Timeline container */}
      <div className="relative border-l border-border/60 ml-4 md:ml-32 pl-6 md:pl-12 py-4 flex flex-col gap-10">
        {filteredMilestones.map((milestone) => {
          const isOpen = activeNode === milestone.id;

          return (
            <div key={milestone.id} className="relative group">
              {/* Timeline dot */}
              <div 
                onClick={() => toggleNode(milestone.id)}
                className={`absolute -left-[31px] md:-left-[55px] w-5 h-5 rounded-full border-2 transition-all duration-300 cursor-pointer flex items-center justify-center z-10 ${
                  isOpen
                    ? "bg-primary border-primary scale-125"
                    : "bg-background border-border group-hover:border-primary"
                }`}
              >
                {isOpen && <div className="w-1.5 h-1.5 bg-foreground rounded-full" />}
              </div>

              {/* Epoch Label on Left (Desktop only) */}
              <div className="hidden md:block absolute -left-[180px] w-[130px] text-right text-xs font-mono font-bold uppercase tracking-wider text-primary mt-1">
                {milestone.epoch}
              </div>

              {/* Card Container */}
              <div 
                className={`bg-card border rounded-2xl p-6 transition-all duration-300 ${
                  isOpen 
                    ? "border-primary/45 crimson-glow" 
                    : "border-border hover:border-primary/20 hover:bg-neutral-900/10"
                }`}
              >
                <div 
                  onClick={() => toggleNode(milestone.id)}
                  className="flex justify-between items-start gap-4 cursor-pointer"
                >
                  <div className="flex flex-col gap-1">
                    {/* Epoch for mobile */}
                    <span className="md:hidden text-[10px] font-mono font-bold uppercase tracking-wider text-primary">
                      {milestone.epoch}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-foreground group-hover:text-primary transition-colors">
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                      {milestone.summary}
                    </p>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 mt-1 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`} />
                </div>

                {/* Expanded content details */}
                {isOpen && (
                  <div className="mt-5 pt-5 border-t border-border/50 flex flex-col gap-4 animate-in fade-in slide-in-from-top-3">
                    <p className="text-sm text-foreground/90 leading-relaxed">
                      {milestone.details}
                    </p>

                    {/* Footnote details */}
                    <div className="bg-[#0F0F10] border border-border/60 rounded-xl p-4 flex gap-3">
                      <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-mono font-bold text-muted-foreground tracking-wider">Worldbuilding Footnote</span>
                        <p className="text-xs text-muted-foreground italic leading-relaxed">
                          {milestone.footnote}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
