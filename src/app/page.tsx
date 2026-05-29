import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Sparkles, Megaphone, ArrowRight } from "lucide-react";
import { cacheLife } from "next/cache";

// Enable caching for static data fetching at build time
async function getHomepageData() {
  "use cache";
  cacheLife("days");
  
  return {
    hero: {
      title: "Your Quest to Publication Starts Here",
      description: "Mystic Vault Society is a premier publishing guild for science fiction and fantasy authors. Founded by an author, for authors, we provide the map, the tools, and the guidance to get your novel from concept to completion."
    },
    featuredAuthor: {
      name: "Michael Schustereit",
      title: "Architect of Star-Spanning Sagas and Forgotten Realms",
      quote: "As a science fiction and fantasy author, Michael Schustereit writes stories that explore the frontiers of human potential and the echoes of ancient magic. He founded the Society to create a better path for fellow genre authors.",
      book: "Rise of the Veilbreaker",
      slug: "michael-schustereit"
    }
  };
}

export default async function HomePage() {
  const data = await getHomepageData();

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* 1. Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-border bg-gradient-to-br from-[#0B0B0C] via-[#101012] to-[#642B36]/15">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(114,47,55,0.08),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center gap-8 py-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-semibold tracking-wider uppercase animate-pulse">
            <Sparkles className="w-3 h-3" />
            Welcoming SFF Authors
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-foreground max-w-4xl leading-tight">
            {data.hero.title}
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl leading-relaxed">
            {data.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              href="/services"
              className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg crimson-glow crimson-glow-hover hover:bg-primary/95 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Explore Our Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all duration-300" />
            </Link>
            <Link
              href="/authors/michael-schustereit"
              className="px-8 py-4 bg-secondary text-secondary-foreground border border-border hover:border-muted-foreground hover:bg-secondary/70 transition-all duration-300 rounded-lg flex items-center justify-center"
            >
              Meet Our Authors
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Value Propositions & Services Quick List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-card border border-border rounded-xl p-8 hover:border-primary/40 transition-all duration-300 flex flex-col gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-serif font-bold text-foreground">Expert Editorial Services</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Strengthen your plot, character arcs, and pacing with in-depth developmental editing. Meticulous line editing refines your prose and sharpens your unique authorial voice.
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 hover:border-primary/40 transition-all duration-300 flex flex-col gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-serif font-bold text-foreground">Publishing & Distribution</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Navigate the complex path to print. We act as your project manager, assisting with trim sizing, layout specifications, and global print-on-demand setups via IngramSpark.
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 hover:border-primary/40 transition-all duration-300 flex flex-col gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
            <Megaphone className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-serif font-bold text-foreground">Custom Marketing & Platform</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Get your books discovered. We design launch campaigns, build gorgeous, modern author webspaces, and assist in designing exclusive guild-branded merchandise.
          </p>
        </div>
      </section>

      {/* 3. Featured Author Spotlight */}
      <section className="bg-gradient-to-b from-transparent via-secondary/30 to-transparent py-10 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Featured Spotlight</div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground leading-tight">
              Meet {data.featuredAuthor.name}
            </h2>
            <p className="text-muted-foreground italic leading-relaxed text-lg border-l-2 border-primary pl-4">
              &ldquo;{data.featuredAuthor.quote}&rdquo;
            </p>
            <div className="text-sm font-medium text-foreground">
              Author of <span className="font-serif italic text-primary">{data.featuredAuthor.book}</span>
            </div>
            <div>
              <Link
                href={`/authors/${data.featuredAuthor.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase text-primary hover:text-primary/80 tracking-wider transition-all duration-300 group"
              >
                Explore His Showcase
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            </div>
          </div>
          
          <div className="relative aspect-video sm:aspect-square bg-card border border-border rounded-xl overflow-hidden crimson-glow flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            {/* The primary author image path extracted from WordPress */}
            <Image
              src="https://mysticvaultsociety.com/wp-content/uploads/2025/07/IMG_7628-scaled.jpg"
              alt={data.featuredAuthor.name}
              fill
              className="object-cover opacity-80"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* 4. Operations Philosophy */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">Our Philosophy: By an Author, For Authors</h2>
        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
          The quest to publish a great book can feel like a solitary one. At Mystic Vault Society, we believe it shouldn&apos;t be. Our mission is to be a trusted partner for science fiction and fantasy authors, offering the focused support and education needed to navigate the modern publishing world. We plan on growing responsibly, publishing up to ten books a year. This allows us to give each author in our society the dedicated attention they deserve. The &ldquo;mystical&rdquo; is in your story; the &ldquo;adventurous&rdquo; is in the journey we&apos;ll take together.
        </p>
      </section>

      {/* 5. Newsletter Sign-Up Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-card border border-border rounded-2xl p-8 sm:p-12 crimson-glow flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-2 max-w-md">
            <h3 className="text-2xl font-serif font-bold text-foreground">Join the Society</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Stay up to date with writing tips, publishing news, and announcements from the Vault. Subscribe to our newsletter.
            </p>
          </div>
          <form className="flex w-full md:w-auto items-stretch gap-2 shrink-0">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="px-4 py-3 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary transition-all duration-300 w-full md:w-64"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/95 transition-all duration-300 text-sm whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
