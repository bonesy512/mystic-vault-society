"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart, ChevronDown } from "lucide-react";

// Client-side only Cart Badge to prevent hydration mismatch and preserve static layout pre-rendering
function CartBadge() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Listen for custom events to update cart count
    const updateCount = () => {
      const cart = JSON.parse(localStorage.getItem("mvs_cart") || "[]");
      const count = cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
      setCartCount(count);
    };

    updateCount();
    window.addEventListener("mvs_cart_updated", updateCount);
    return () => window.removeEventListener("mvs_cart_updated", updateCount);
  }, []);

  if (cartCount === 0) return null;

  return (
    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
      {cartCount}
    </span>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthorsOpen, setIsAuthorsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Shop", href: "/shop" },
    { name: "Blog", href: "/blog" },
    { name: "Tools", href: "/tools" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && pathname !== "/") return false;
    return pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 bg-primary/10 border border-primary/30 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:border-primary group-hover:bg-primary/20">
                <span className="text-primary font-bold text-lg tracking-wider font-serif group-hover:text-primary-foreground transition-all duration-300">MVS</span>
              </div>
              <div className="hidden sm:block">
                <span className="block text-sm font-semibold tracking-wider uppercase text-foreground/90 font-serif">Mystic Vault</span>
                <span className="block text-[10px] tracking-[0.25em] uppercase text-muted-foreground group-hover:text-primary transition-all duration-300">Society</span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Home link */}
            <Link
              href="/"
              className={`relative py-2 text-sm font-medium tracking-wide uppercase transition-all duration-300 ${
                isActive("/")
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Home
              {isActive("/") && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full" />
              )}
            </Link>

            {/* Authors hover-trigger dropdown link */}
            <div
              className="relative"
              onMouseEnter={() => setIsAuthorsOpen(true)}
              onMouseLeave={() => setIsAuthorsOpen(false)}
            >
              <Link
                href="/authors"
                className={`py-2 text-sm font-medium tracking-wide uppercase flex items-center gap-1 transition-all duration-300 ${
                  isActive("/authors")
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Authors
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isAuthorsOpen ? "rotate-180" : ""}`} />
                {isActive("/authors") && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full" />
                )}
              </Link>
              
              {isAuthorsOpen && (
                <div className="absolute top-[2.5rem] left-0 w-64 bg-[#0F0F10] border border-red-900/30 rounded-xl shadow-2xl p-4 backdrop-blur-md z-50 flex flex-col gap-2 transition-all duration-300 animate-in fade-in slide-in-from-top-2">
                  <Link
                    href="/authors"
                    className="block px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground border-b border-border/30 pb-2 mb-1"
                  >
                    View All Guild Roster
                  </Link>
                  <Link
                    href="/authors/michael-schustereit"
                    className="flex flex-col px-3 py-2 rounded-lg hover:bg-red-950/20 hover:border hover:border-red-900/20 transition-all duration-200"
                  >
                    <span className="text-sm font-semibold text-foreground">Michael Schustereit</span>
                    <span className="text-[10px] text-muted-foreground">Epic Sci-Fi &amp; Dark Fantasy</span>
                  </Link>
                  <Link
                    href="/authors/thomas-schustereit"
                    className="flex flex-col px-3 py-2 rounded-lg hover:bg-red-950/20 hover:border hover:border-red-900/20 transition-all duration-200"
                  >
                    <span className="text-sm font-semibold text-foreground">Thomas Schustereit</span>
                    <span className="text-[10px] text-muted-foreground">Creative Design &amp; Illustration</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Other static links */}
            {navLinks.filter(l => l.name !== "Home").map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative py-2 text-sm font-medium tracking-wide uppercase transition-all duration-300 ${
                  isActive(link.href)
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full" />
                )}
              </Link>
            ))}

            {/* Shopping Cart Trigger */}
            <Link
              href="/shop"
              className="relative p-2 text-muted-foreground hover:text-primary transition-all duration-300"
              aria-label="View Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              <Suspense fallback={null}>
                <CartBadge />
              </Suspense>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-4">
            <Link
              href="/shop"
              className="relative p-2 text-muted-foreground hover:text-primary transition-all duration-300"
              aria-label="View Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              <Suspense fallback={null}>
                <CartBadge />
              </Suspense>
            </Link>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-muted-foreground hover:text-foreground focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border transition-all duration-300">
          <div className="px-2 pt-2 pb-6 space-y-2 sm:px-3">
            {/* Home link */}
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-lg text-base font-medium tracking-wider uppercase transition-all duration-300 ${
                isActive("/")
                  ? "bg-primary/10 text-primary font-semibold border-l-4 border-primary"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              }`}
            >
              Home
            </Link>

            {/* Authors detail sublinks group */}
            <div className="flex flex-col">
              <Link
                href="/authors"
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium tracking-wider uppercase transition-all duration-300 ${
                  pathname === "/authors"
                    ? "bg-primary/10 text-primary font-semibold border-l-4 border-primary"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                }`}
              >
                Authors
              </Link>
              <div className="pl-6 flex flex-col gap-1 border-l border-border/40 ml-4 mt-1 mb-2">
                <Link
                  href="/authors/michael-schustereit"
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    pathname === "/authors/michael-schustereit"
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Michael Schustereit
                </Link>
                <Link
                  href="/authors/thomas-schustereit"
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    pathname === "/authors/thomas-schustereit"
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Thomas Schustereit
                </Link>
              </div>
            </div>

            {/* Static links */}
            {navLinks.filter(l => l.name !== "Home").map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium tracking-wider uppercase transition-all duration-300 ${
                  isActive(link.href)
                    ? "bg-primary/10 text-primary font-semibold border-l-4 border-primary"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
