import React from "react";
import Link from "next/link";
import { CheckCircle2, ChevronRight, ShoppingBag, ArrowRight } from "lucide-react";

interface SuccessPageProps {
  searchParams: Promise<{
    session_id?: string;
    mock?: string;
    priceId?: string;
    error?: string;
  }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id, mock, priceId, error } = await searchParams;

  const isMock = mock === "true";

  return (
    <div className="flex items-center justify-center min-h-[75vh] px-4 py-20">
      <div className="max-w-md w-full bg-card border border-border rounded-2xl p-8 sm:p-10 text-center flex flex-col items-center gap-6 crimson-glow">
        <div className="w-16 h-16 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center text-primary animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-serif font-bold text-foreground">Order Placed!</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Thank you for supporting the Mystic Vault Society. Your transaction has completed successfully.
          </p>
        </div>

        {isMock && (
          <div className="w-full text-left bg-secondary/70 border border-border p-4 rounded-lg flex flex-col gap-1.5 text-xs text-muted-foreground">
            <span className="text-primary font-bold uppercase tracking-wider text-[10px]">Developer Environment Active</span>
            <p>This was a mock redirection. No charges were made.</p>
            {priceId && <p><strong>Product ID:</strong> {priceId}</p>}
            {error && <p className="text-destructive font-mono overflow-auto max-h-20 mt-1">Stripe Error: {error}</p>}
          </div>
        )}

        {!isMock && session_id && (
          <div className="w-full text-left bg-secondary/40 border border-border p-4 rounded-lg text-xs text-muted-foreground font-mono truncate">
            <strong>Session ID:</strong> {session_id}
          </div>
        )}

        <div className="flex flex-col w-full gap-3 mt-2">
          <Link
            href="/authors/michael-schustereit"
            className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/95 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            Meet the Authors
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-all duration-300" />
          </Link>
          <Link
            href="/shop"
            className="w-full py-3 bg-secondary text-secondary-foreground border border-border hover:border-muted-foreground hover:bg-secondary/70 transition-all duration-300 rounded-lg flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
