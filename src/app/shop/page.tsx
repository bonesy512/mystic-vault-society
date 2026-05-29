import React from "react";
import Image from "next/image";
import { products } from "@/config/products";
import BuyButton from "./BuyButton";
import { Sparkles, ShieldCheck } from "lucide-react";
import { cacheLife } from "next/cache";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Official Guild Shop | Mystic Vault Society",
  description: "Browse official Mystic Vault Society apparel, steel bookmarks, fleece hoodies, classic dad caps, and custom SFF wall art posters.",
};

async function getShopData() {
  "use cache";
  cacheLife("days");
  return products;
}

export default async function ShopPage() {
  const shopProducts = await getShopData();

  return (
    <div className="flex flex-col gap-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <header className="text-center pt-16 flex flex-col items-center gap-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Guild Gear &amp; Tomes
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground tracking-tight">
          Official Guild Merchandise
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed">
          Welcome to the official shop for Mystic Vault Society merchandise. Here you&apos;ll find high-quality apparel and accessories designed for authors, readers, and adventurers. Every item is a badge of honor for SFF lovers.
        </p>
      </header>

      {/* Trust Banner */}
      <section className="bg-card/45 border border-border rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 crimson-glow">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-primary shrink-0" />
          <div className="flex flex-col">
            <h3 className="font-semibold text-foreground text-sm sm:text-base">Secure Checkout via Stripe</h3>
            <p className="text-muted-foreground text-xs sm:text-sm">We accept credit cards, debit cards, and standard digital payment formats.</p>
          </div>
        </div>
        <div className="text-xs font-semibold text-muted-foreground tracking-wider uppercase bg-secondary/80 px-4 py-2 border border-border rounded-lg">
          Fast Shipping Options Available
        </div>
      </section>

      {/* Product Grid */}
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {shopProducts.map((product) => (
          <div
            key={product.id}
            className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 flex flex-col justify-between group crimson-glow-hover"
          >
            {/* Image container */}
            <div className="relative aspect-square bg-[#0E0E10] border-b border-border overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-[1.03] transition-all duration-500 opacity-90 group-hover:opacity-100"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 30vw"
              />
              <span className="absolute top-3 left-3 bg-secondary/85 backdrop-blur border border-border text-muted-foreground text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded">
                {product.category}
              </span>
            </div>

            {/* Product Meta */}
            <div className="p-6 flex flex-col gap-4">
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-serif font-bold text-lg text-foreground group-hover:text-primary transition-all duration-300 leading-snug">
                  {product.name}
                </h3>
                <span className="font-serif font-semibold text-primary text-lg">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed line-clamp-3">
                {product.description}
              </p>
            </div>

            {/* Buy Action */}
            <div className="p-6 pt-0 mt-auto">
              <BuyButton priceId={product.stripePriceId} />
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
