import React from "react";
import Link from "next/link";
import { Sparkles, Calendar, User, ArrowRight } from "lucide-react";
import { cacheLife } from "next/cache";
import { posts } from "@/data/posts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guild Chronicles | Mystic Vault Society",
  description: "Delve into the archives of the Mystic Vault Society. Read essays on worldbuilding, magic systems, mythology, and SFF publishing.",
  openGraph: {
    title: "Guild Chronicles | Mystic Vault Society",
    description: "Delve into the archives of the Mystic Vault Society. Read essays on worldbuilding, magic systems, mythology, and SFF publishing.",
    url: "https://mysticvaultsociety.com/blog",
    type: "website",
    images: [
      {
        url: "https://mysticvaultsociety.com/wp-content/uploads/2025/07/IMG_7628-scaled.jpg",
        width: 1200,
        height: 630,
        alt: "Mystic Vault Society Blog",
      }
    ],
  },
};

async function getPostsData() {
  "use cache";
  cacheLife("weeks");
  return posts;
}

function getAuthorName(creator: string) {
  if (creator === "MSchustereit") return "Michael Schustereit";
  if (creator === "Bonesy") return "Thomas Schustereit";
  return "Mystic Vault Society";
}

export default async function BlogIndexPage() {
  const blogPosts = await getPostsData();

  return (
    <div className="flex flex-col gap-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header section */}
      <header className="text-center pt-16 flex flex-col items-center gap-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          The Guild Chronicles
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground tracking-tight">
          Lore &amp; Worldbuilding Archives
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed">
          Delve into the histories of Binsmuth, discussions on mechanical magic design, creative illustrations, and the chronicles of independent SFF publishing.
        </p>
      </header>

      {/* Post Grid */}
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => {
          const author = getAuthorName(post.creator);
          const dateStr = new Date(post.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });

          return (
            <article
              key={post.slug}
              className="bg-card border border-border hover:border-primary/30 rounded-xl p-6 transition-all duration-300 flex flex-col justify-between group crimson-glow-hover"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  <span>{dateStr}</span>
                  <span className="text-border">|</span>
                  <User className="w-3.5 h-3.5 text-primary" />
                  <span>{author}</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-foreground leading-snug group-hover:text-primary transition-all duration-300">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/50">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-all duration-300"
                >
                  Read Chronicles
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </article>
          );
        })}
      </main>
    </div>
  );
}
