"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error securely to the console (or internal logging service)
    console.error("Unhandled Application Exception:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center justify-center p-6 relative overflow-hidden font-serif">
      {/* Decorative background aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(153,27,27,0.08),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-md w-full bg-neutral-900 border border-red-900/30 rounded-xl p-8 shadow-2xl relative z-10 backdrop-blur-sm flex flex-col items-center text-center">
        {/* Shield/Alert Icon with pulsing glow */}
        <div className="h-16 w-16 rounded-full bg-red-950/50 border border-red-800/40 flex items-center justify-center mb-6 relative">
          <div className="absolute inset-0 rounded-full bg-red-900/20 animate-ping opacity-75 pointer-events-none" />
          <AlertTriangle className="h-8 w-8 text-red-500 relative z-10" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-red-500 mb-2">
          Vault Anomaly
        </h1>
        <p className="text-neutral-400 font-sans text-sm mb-6 leading-relaxed">
          The Mystic Vault encountered a disruption. To safeguard internal scripts, the operation has been intercepted.
        </p>

        {/* Masked Error Details Box */}
        <div className="w-full bg-neutral-950/80 border border-neutral-800 rounded-lg p-4 mb-8 text-left font-mono text-xs text-neutral-500">
          <div className="flex justify-between border-b border-neutral-800/50 pb-2 mb-2">
            <span>Security ID (Digest):</span>
            <span className="text-neutral-400 select-all">{error.digest || "MVS-ANOMALY-DEFAULT"}</span>
          </div>
          <p className="font-sans text-[11px] text-neutral-600 leading-snug">
            System stack traces have been masked for security purposes. The anomaly ID above can be referenced in server logs.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white font-sans font-medium py-2.5 px-5 rounded-lg border border-red-700/30 transition-all duration-200 cursor-pointer shadow-lg shadow-red-950/30 active:scale-[0.98]"
          >
            <RefreshCw className="h-4 w-4" />
            Attempt Recall
          </button>
          
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-sans font-medium py-2.5 px-5 rounded-lg border border-neutral-700 transition-all duration-200 active:scale-[0.98]"
          >
            <Home className="h-4 w-4" />
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
