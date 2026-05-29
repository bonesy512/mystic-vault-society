import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { authors, getAuthor } from "@/config/authors";
import { posts } from "@/config/posts";
import { ArrowRight, Download, ExternalLink, Calendar, User } from "lucide-react";
import { cacheLife } from "next/cache";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params at build time for sub-millisecond Edge delivery
export async function generateStaticParams() {
  return authors.map((author) => ({
    slug: author.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) return {};
  
  return {
    title: `${author.name} | ${author.title}`,
    description: `${author.bio.slice(0, 155)}... Browse published books by ${author.name} including Rise of the Veilbreaker.`,
  };
}

// Caching function for author page data
async function getAuthorPageData(slug: string) {
  "use cache";
  cacheLife("days");
  
  const author = getAuthor(slug);
  if (!author) return null;

  // Filter posts created by this author
  // Michael Schustereit creator slug in XML is 'MSchustereit' or 'Bonesy' for Thomas
  const creatorKey = slug === "michael-schustereit" ? "MSchustereit" : "Bonesy";
  const authorPosts = posts.filter(p => p.creator.toLowerCase() === creatorKey.toLowerCase() || p.creator.toLowerCase() === slug.replace("-", "").toLowerCase());

  return {
    author,
    posts: authorPosts
  };
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getAuthorPageData(slug);

  if (!data) {
    notFound();
  }

  const { author, posts: authorPosts } = data;

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* 1. Bio Section */}
      <section className="bg-gradient-to-b from-[#161618] to-transparent py-16 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Avatar image */}
          <div className="md:col-span-4 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden crimson-glow border border-primary/20">
              <Image
                src={author.avatar}
                alt={author.name}
                fill
                className="object-cover opacity-95"
                sizes="(max-width: 768px) 100vw, 30vw"
                priority
              />
            </div>
          </div>

          {/* Description */}
          <div className="md:col-span-8 flex flex-col gap-4">
            <div className="text-primary text-xs font-bold uppercase tracking-[0.25em] font-serif">Featured Guild Member</div>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground tracking-tight">{author.name}</h1>
            <p className="text-primary/95 italic font-medium text-sm sm:text-base tracking-wide">{author.title}</p>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mt-2 whitespace-pre-line">{author.bio}</p>
          </div>
        </div>
      </section>

      {/* 2. Bibliography / Book Showcase */}
      {author.books.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
          <h2 className="text-3xl font-serif font-bold text-foreground text-center">Books by {author.name}</h2>
          
          <div className="flex flex-col gap-16">
            {author.books.map((book, idx) => (
              <div 
                key={book.slug} 
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-card/30 border border-border/60 rounded-2xl p-6 sm:p-10 crimson-glow"
              >
                {/* Book Mockup Image */}
                <div className="lg:col-span-4 flex justify-center">
                  <div className="relative w-48 h-72 sm:w-60 sm:h-90 border border-border/80 shadow-2xl rounded overflow-hidden">
                    <Image
                      src={book.coverImage}
                      alt={book.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 25vw"
                    />
                  </div>
                </div>

                {/* Book Details */}
                <div className="lg:col-span-8 flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">{book.title}</h3>
                    {book.highlight && (
                      <span className="text-primary text-xs font-bold uppercase tracking-wider">{book.highlight}</span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{book.description}</p>
                  
                  {/* Retailers / Download actions */}
                  <div className="flex flex-wrap gap-4 mt-2">
                    {book.buyUrl && (
                      <a
                        href={book.buyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg text-sm hover:bg-primary/95 transition-all duration-300 flex items-center gap-2 group"
                      >
                        Buy on Amazon
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {book.retailers && book.retailers.map(r => r.name !== "Amazon" && (
                      <a
                        key={r.name}
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-secondary text-secondary-foreground border border-border rounded-lg text-sm hover:border-muted-foreground hover:bg-secondary/70 transition-all duration-300 flex items-center gap-2"
                      >
                        Buy on {r.name}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ))}
                    {book.downloadUrl && (
                      <a
                        href={book.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-secondary text-secondary-foreground border border-primary/20 rounded-lg text-sm hover:bg-primary/10 hover:border-primary transition-all duration-300 flex items-center gap-2"
                      >
                        Download Free Preview
                        <Download className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. Latest News & Blog Updates */}
      {authorPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
          <h2 className="text-3xl font-serif font-bold text-foreground text-center">Latest News &amp; Lore</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {authorPosts.map((post) => (
              <article 
                key={post.slug} 
                className="bg-card border border-border hover:border-primary/30 rounded-xl p-6 transition-all duration-300 flex flex-col justify-between crimson-glow-hover"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    <span className="text-border">|</span>
                    <User className="w-3.5 h-3.5 text-primary" />
                    <span>{post.creator === "MSchustereit" ? "Michael" : post.creator}</span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-foreground leading-snug group-hover:text-primary transition-all duration-300">
                    {post.title}
                  </h3>
                  {/* Render the post excerpt */}
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/50">
                  {/* Dynamic blog posts can render post content, but let's link to shop/services or read more */}
                  <Link
                    href={`/authors/${slug}?post=${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-all duration-300"
                  >
                    Read Lore
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* 4. Newsletter Readers List */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-card border border-border rounded-2xl p-8 sm:p-12 crimson-glow flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-2 max-w-md">
            <h3 className="text-2xl font-serif font-bold text-foreground">Join My Readers&apos; List</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Get exclusive updates, behind-the-scenes content, and new release announcements delivered directly from me to your inbox.
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
