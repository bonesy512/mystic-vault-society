import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, Sparkles, BookOpen } from "lucide-react";
import { authors } from "@/config/authors";
import { cacheLife } from "next/cache";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guild Authors | Mystic Vault Society",
  description: "Meet the elite science fiction and fantasy authors of the Mystic Vault Society. Explore published bibliographies, detailed worldbuilding projects, and exclusive merchandise.",
};

async function getAuthorsDirectoryData() {
  "use cache";
  cacheLife("days");
  return authors;
}

export default async function AuthorsDirectoryPage() {
  const guildAuthors = await getAuthorsDirectoryData();

  return (
    <div className="flex flex-col gap-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header section */}
      <header className="text-center pt-16 flex flex-col items-center gap-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          The Guild Roster
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground tracking-tight">
          Guild Authors &amp; Creators
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed">
          Welcome to the guild hall of the Mystic Vault Society. Here lie the architects of star-spanning sagas, forgotten realms, and custom merchandise. Learn about our creators, read their writing tips, and explore their published novels.
        </p>
      </header>

      {/* Grid listing */}
      <main className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {guildAuthors.map((author) => {
          // Explicitly resolve literary or creative focus based on the author slug
          const primaryFocus = author.slug === "michael-schustereit" 
            ? "Epic Sci-Fi / Dark Fantasy" 
            : "Creative Design & Cover Illustration";

          return (
            <div
              key={author.slug}
              className="bg-card border border-border rounded-2xl p-6 sm:p-8 flex flex-col gap-6 justify-between group hover:border-primary/30 transition-all duration-300 crimson-glow-hover"
            >
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                {/* Profile Image with Premium Avatar Frame */}
                <div className="relative w-32 h-32 rounded-xl overflow-hidden shrink-0 border border-primary/20 bg-background shadow-lg group-hover:border-primary/45 transition-colors duration-300">
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    fill
                    className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                    sizes="128px"
                  />
                  {/* Subtle corner highlights for fantasy border aesthetic */}
                  <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-primary/40 rounded-tl" />
                  <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-primary/40 rounded-tr" />
                  <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-primary/40 rounded-bl" />
                  <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-primary/40 rounded-br" />
                </div>

                {/* Text Meta */}
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col">
                    <h3 className="font-serif font-bold text-2xl text-foreground group-hover:text-primary transition-all duration-300">
                      {author.name}
                    </h3>
                    <span className="text-primary/95 text-xs font-semibold uppercase tracking-wider mt-0.5">
                      {primaryFocus}
                    </span>
                    <span className="text-muted-foreground text-[11px] italic mt-0.5">
                      {author.title}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {author.bio}
                  </p>
                </div>
              </div>

              {/* Bottom Actions and Book indicators */}
              <div className="border-t border-border/40 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-primary" />
                    {author.books.length} {author.books.length === 1 ? "Published Book" : "Published Books"}
                  </span>
                  <span className="text-border/50">|</span>
                  <a
                    href={`mailto:${author.email}`}
                    className="flex items-center gap-1.5 hover:text-primary transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-primary" />
                    Contact
                  </a>
                </div>

                <Link
                  href={`/authors/${author.slug}`}
                  className="inline-flex items-center gap-1.5 bg-secondary hover:bg-secondary/70 text-secondary-foreground border border-border hover:border-primary/20 text-xs font-bold uppercase tracking-wider py-2.5 px-5 rounded-lg transition-all duration-300 active:scale-[0.98]"
                >
                  Enter Vault
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
