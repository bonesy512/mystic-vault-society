"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, ArrowLeft } from "lucide-react";

export default function AuthorRouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Author details route error intercepted:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center font-serif">
      <div className="max-w-md w-full bg-card border border-border p-8 rounded-2xl shadow-xl flex flex-col items-center gap-6 crimson-glow">
        <div className="h-12 w-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
          <AlertCircle className="h-6 w-6 text-primary" />
        </div>
        
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-foreground">Author Profile Unavailable</h2>
          <p className="text-muted-foreground text-sm leading-relaxed font-sans">
            We were unable to load the requested guild author details. The profile may have relocated or is undergoing lore maintenance.
          </p>
        </div>

        <div className="w-full bg-background border border-border/80 rounded-lg p-3 text-left font-mono text-[11px] text-muted-foreground">
          <div className="flex justify-between border-b border-border/40 pb-1 mb-1">
            <span>Security ID:</span>
            <span className="text-foreground">{error.digest || "MVS-AUTH-ERR"}</span>
          </div>
          <span>Trace details are hidden for security reasons.</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center mt-2">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-sans font-semibold py-2.5 px-5 rounded-lg text-sm hover:bg-primary/95 transition-all duration-200 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Retry Load
          </button>
          
          <Link
            href="/authors"
            className="flex items-center justify-center gap-2 bg-secondary text-secondary-foreground border border-border font-sans font-semibold py-2.5 px-5 rounded-lg text-sm hover:bg-secondary/70 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Guild
          </Link>
        </div>
      </div>
    </div>
  );
}
