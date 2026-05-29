import type { Metadata } from "next";
import { Outfit, Cinzel } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";
import { Suspense } from "react";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const cinzel = Cinzel({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Mystic Vault Society",
    default: "Mystic Vault Society | Sci-Fi & Fantasy Publishing Guild",
  },
  description: "Beyond the Door, Forgotten Gods Still Whisper. Mystic Vault Society is a boutique independent publishing press and service guild for science fiction and fantasy authors.",
  keywords: ["fantasy publishing", "sci-fi publishing", "independent authors", "worldbuilding", "developmental editing", "book formatting", "publishing guild", "Rise of the Veilbreaker"],
  metadataBase: new URL("https://mysticvaultsociety.com"),
  openGraph: {
    title: "Mystic Vault Society | Sci-Fi & Fantasy Publishing Guild",
    description: "Empowering science fiction and fantasy authors to navigate their quest from manuscript to print.",
    url: "https://mysticvaultsociety.com",
    siteName: "Mystic Vault Society",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/wp-content/uploads/2025/07/IMG_7628-scaled.jpg",
        width: 1200,
        height: 630,
        alt: "Mystic Vault Society Publishing Guild",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mystic Vault Society",
    description: "Empowering sci-fi and fantasy authors to navigate their publishing quest.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${cinzel.variable} scroll-smooth`}>
      <body className="bg-background text-foreground min-h-screen flex flex-col font-sans selection:bg-primary/30 selection:text-foreground">
        {/* LocalBusiness Austin, TX Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Mystic Vault Society",
              "url": "https://mysticvaultsociety.com",
              "logo": "https://mysticvaultsociety.com/wp-content/uploads/2025/06/Text-White@3x-scaled.png",
              "description": "Bespoke publishing press, editorial, and platform design service guild for independent science fiction and fantasy authors.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Austin",
                "addressRegion": "TX",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 30.2672,
                "longitude": -97.7431
              },
              "areaServed": [
                { "@type": "AdministrativeArea", "name": "Austin" },
                { "@type": "AdministrativeArea", "name": "Lakeway" },
                { "@type": "AdministrativeArea", "name": "Bee Cave" },
                { "@type": "AdministrativeArea", "name": "West Lake Hills" }
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "publisher@mysticvaultsociety.com"
              }
            })
          }}
        />
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            {children}
          </Suspense>
        </main>
        
        {/* Footer Section */}
        <footer className="bg-[#070708] border-t border-border py-12 px-4 sm:px-6 lg:px-8 mt-auto">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary/10 border border-primary/30 rounded flex items-center justify-center">
                  <span className="text-primary font-bold font-serif text-sm tracking-wider">MVS</span>
                </div>
                <span className="text-base font-serif font-semibold tracking-wider text-foreground">Mystic Vault Society</span>
              </div>
              <p className="text-muted-foreground text-sm max-w-sm">
                A service-based publishing guild dedicated to empowering SFF authors. Headquartered in Austin, Texas, we offer local in-person consultations, workshops, and design reviews across Lakeway, Bee Cave, and West Lake Hills, alongside our global publishing support.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground font-serif mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/" className="hover:text-primary transition-all duration-300">Home</a></li>
                <li><a href="/authors/michael-schustereit" className="hover:text-primary transition-all duration-300">Featured Author</a></li>
                <li><a href="/services" className="hover:text-primary transition-all duration-300">Guild Services</a></li>
                <li><a href="/shop" className="hover:text-primary transition-all duration-300">Guild Shop</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground font-serif mb-4">Guild Values</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                By an Author, For Authors.<br />
                Maintain 100% of your rights and royalties.<br />
                Tailored service models instead of restrictive contracts.
              </p>
              <div className="mt-4 text-[10px] text-muted-foreground/60">
                &copy; 2026 Mystic Vault Society. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
