"use client";

import React, { useTransition } from "react";
import { createCheckoutSession } from "@/app/actions/stripe";
import { Loader2, ShoppingCart } from "lucide-react";

interface BuyButtonProps {
  priceId: string;
}

export default function BuyButton({ priceId }: BuyButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleBuy = () => {
    startTransition(async () => {
      try {
        await createCheckoutSession(priceId);
      } catch (err) {
        console.error("Redirection failed:", err);
      }
    });
  };

  return (
    <button
      onClick={handleBuy}
      disabled={isPending}
      className="w-full px-5 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/95 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
    >
      {isPending ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Preparing Checkout...
        </>
      ) : (
        <>
          <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-all duration-300" />
          Buy Now
        </>
      )}
    </button>
  );
}
