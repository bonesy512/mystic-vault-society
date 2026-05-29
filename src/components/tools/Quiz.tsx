"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ArrowLeft, RefreshCw, CheckCircle } from "lucide-react";

interface Question {
  id: number;
  text: string;
  options: { text: string; score: number }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "What is your manuscript's current phase?",
    options: [
      { text: "Concept / Outline / Worldbuilding notes", score: 10 },
      { text: "First Draft currently in progress", score: 25 },
      { text: "Completed rough draft", score: 50 },
      { text: "Polished draft (completed self-edits)", score: 75 },
      { text: "Professionally edited & ready for design/formatting", score: 100 },
    ],
  },
  {
    id: 2,
    text: "What is your target word count range?",
    options: [
      { text: "Under 50k words (Novella / Short Story)", score: 80 },
      { text: "50k - 80k words (Standard Sci-Fi/Fantasy Novella)", score: 90 },
      { text: "80k - 120k words (Standard Epic SFF Novel)", score: 100 },
      { text: "Over 120k words (Jumbo Epic SFF Novel)", score: 70 },
    ],
  },
  {
    id: 3,
    text: "Which editing phases have you completed so far?",
    options: [
      { text: "None (Self-edit in progress)", score: 10 },
      { text: "Critique partners / Alpha & Beta readers review", score: 40 },
      { text: "Professional developmental editing pass", score: 70 },
      { text: "Professional line editing and proofreading passes", score: 100 },
    ],
  },
  {
    id: 4,
    text: "What is your desired publishing target?",
    options: [
      { text: "Traditional agent queries & publisher submissions", score: 50 },
      { text: "Self-publishing (Amazon KDP & IngramSpark print-on-demand)", score: 100 },
      { text: "Crowdfunding campaigns (Kickstarter / BackerKit special editions)", score: 90 },
      { text: "Unsure / want to explore options", score: 70 },
    ],
  },
];

export default function Quiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
  };

  const handleNext = () => {
    if (selectedOption === null) return;
    const score = QUESTIONS[currentStep].options[selectedOption].score;
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);
    setSelectedOption(null);
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep === 0) return;
    const newAnswers = [...answers];
    newAnswers.pop();
    setAnswers(newAnswers);
    setSelectedOption(null);
    setCurrentStep(currentStep - 1);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers([]);
    setSelectedOption(null);
  };

  // Calculate final score average
  const calculateResult = () => {
    if (answers.length === 0) return 0;
    const total = answers.reduce((sum, val) => sum + val, 0);
    return Math.round(total / answers.length);
  };

  const score = calculateResult();

  // Determine tier based on score
  const getTier = () => {
    if (score < 45) {
      return {
        title: "Quest Initiated",
        desc: "You are in the world-forging and foundational writing phase. Your focus should be on building outlines, draft completeness, and structural logic.",
        recommendation: "Developmental Editing & Worldbuilding Consultation",
        actionText: "Request Editorial Review",
        actionLink: "/contact",
      };
    } else if (score < 75) {
      return {
        title: "Journey Underway",
        desc: "You have a complete manuscript draft! Now it needs polishing, refining the flow, and checking line-by-line consistency.",
        recommendation: "Line Editing & Cover Consultation",
        actionText: "Explore Editing Services",
        actionLink: "/services",
      };
    } else {
      return {
        title: "Ready for the Vault",
        desc: "Your manuscript is polished and edited. Your primary focus is global distribution, KDP/IngramSpark layout compliance, and cover artwork.",
        recommendation: "Book Formatting & Global Distribution Setup",
        actionText: "Order Publishing Support",
        actionLink: "/shop",
      };
    }
  };

  const tier = getTier();

  return (
    <div className="w-full max-w-2xl mx-auto bg-card border border-border rounded-2xl p-6 sm:p-10 shadow-xl relative overflow-hidden crimson-glow">
      {/* Absolute design highlights */}
      <div className="absolute top-1 left-1 w-3 h-3 border-t border-l border-primary/40 rounded-tl" />
      <div className="absolute top-1 right-1 w-3 h-3 border-t border-r border-primary/40 rounded-tr" />
      <div className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-primary/40 rounded-bl" />
      <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-primary/40 rounded-br" />

      {currentStep < QUESTIONS.length ? (
        <div className="flex flex-col gap-6">
          {/* Progress bar */}
          <div className="flex items-center justify-between text-xs text-muted-foreground uppercase tracking-widest font-mono">
            <span>Step {currentStep + 1} of {QUESTIONS.length}</span>
            <span>{Math.round(((currentStep) / QUESTIONS.length) * 100)}% Complete</span>
          </div>
          <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500" 
              style={{ width: `${((currentStep) / QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-foreground mt-2">
            {QUESTIONS[currentStep].text}
          </h2>

          {/* Options List */}
          <div className="flex flex-col gap-3 mt-4">
            {QUESTIONS[currentStep].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                className={`w-full text-left p-4 rounded-xl border text-sm sm:text-base transition-all duration-300 ${
                  selectedOption === idx
                    ? "bg-primary/10 border-primary text-foreground crimson-glow"
                    : "bg-background border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {option.text}
              </button>
            ))}
          </div>

          {/* Nav Actions */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                currentStep === 0
                  ? "text-muted-foreground/30 cursor-not-allowed"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className={`flex items-center gap-1.5 px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                selectedOption === null
                  ? "bg-secondary text-muted-foreground/50 cursor-not-allowed"
                  : "bg-primary text-primary-foreground hover:bg-primary/95 crimson-glow-hover"
              }`}
            >
              Next Step
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6 text-center items-center py-6">
          <div className="w-16 h-16 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary mb-2">
            <CheckCircle className="w-8 h-8" />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-primary text-xs font-bold uppercase tracking-[0.2em] font-mono">Publishing Readiness Result</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground">
              {tier.title}
            </h2>
            <div className="text-lg font-semibold text-primary mt-1">
              Readiness Score: {score}/100
            </div>
          </div>

          <p className="text-muted-foreground text-sm sm:text-base max-w-md leading-relaxed mt-2">
            {tier.desc}
          </p>

          <div className="w-full bg-[#0F0F10] border border-border rounded-xl p-5 text-left mt-4 flex flex-col gap-2">
            <span className="text-[10px] text-muted-foreground uppercase font-mono tracking-widest">Recommended Service Focus</span>
            <div className="font-serif font-bold text-foreground text-lg">{tier.recommendation}</div>
            <p className="text-xs text-muted-foreground">
              We specialize in preparing manuscripts for this exact stage of the journey.
            </p>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-4 w-full mt-6">
            <button
              onClick={handleRestart}
              className="flex items-center justify-center gap-1.5 px-6 py-3.5 bg-secondary text-secondary-foreground border border-border rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-secondary/70 transition-all duration-300 w-full"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Retake Quiz
            </button>

            <Link
              href={tier.actionLink}
              className="flex items-center justify-center gap-1.5 px-6 py-3.5 bg-primary text-primary-foreground rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-primary/95 transition-all duration-300 crimson-glow w-full"
            >
              {tier.actionText}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
