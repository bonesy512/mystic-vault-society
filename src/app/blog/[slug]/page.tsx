import React, { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User, ChevronLeft } from "lucide-react";
import { cacheLife } from "next/cache";
import { posts } from "@/data/posts";
import { Metadata } from "next";

interface PostProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

async function getPostData(slug: string) {
  "use cache";
  cacheLife("weeks");
  return posts.find((p) => p.slug === slug) || null;
}

function getAuthorName(creator: string) {
  if (creator === "MSchustereit") return "Michael Schustereit";
  if (creator === "Bonesy") return "Thomas Schustereit";
  return "Mystic Vault Society";
}

function getAuthorLink(creator: string) {
  if (creator === "MSchustereit") return "/authors/michael-schustereit";
  if (creator === "Bonesy") return "/authors/thomas-schustereit";
  return "/authors";
}

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostData(slug);
  if (!post) return {};

  const title = `${post.title} | Guild Chronicles`;
  const description = post.excerpt;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://mysticvaultsociety.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [getAuthorName(post.creator)],
      images: [
        {
          url: "https://mysticvaultsociety.com/wp-content/uploads/2025/07/IMG_7628-scaled.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
    },
  };
}

export default async function BlogPostPage({ params }: PostProps) {
  return (
    <Suspense fallback={<BlogPostSkeleton />}>
      <BlogPostContent params={params} />
    </Suspense>
  );
}

async function BlogPostContent({ params }: PostProps) {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) {
    notFound();
  }

  const author = getAuthorName(post.creator);
  const authorLink = getAuthorLink(post.creator);
  const dateStr = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col gap-8">
      {/* BlogPosting JSON-LD E-E-A-T Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "datePublished": post.date,
            "author": {
              "@type": "Person",
              "name": author,
              "url": `https://mysticvaultsociety.com${authorLink}`
            },
            "publisher": {
              "@type": "Organization",
              "name": "Mystic Vault Society",
              "logo": "https://mysticvaultsociety.com/wp-content/uploads/2025/06/Text-White@3x-scaled.png"
            },
            "mainEntityOfPage": `https://mysticvaultsociety.com/blog/${post.slug}`
          })
        }}
      />
      {/* Back button */}
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Chronicles
        </Link>
      </div>

      {/* Header */}
      <header className="flex flex-col gap-4 border-b border-border/50 pb-8">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="w-4 h-4 text-primary" />
          <span>{dateStr}</span>
          <span className="text-border">|</span>
          <User className="w-4 h-4 text-primary" />
          <Link href={authorLink} className="hover:text-primary transition-colors">
            {author}
          </Link>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-foreground leading-tight tracking-tight">
          {post.title}
        </h1>
      </header>

      {/* Main Content Body */}
      <div 
        className="blog-content text-foreground/90 text-sm sm:text-base leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}

function BlogPostSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col gap-8 animate-pulse">
      <div className="w-32 h-5 bg-[#1C1C1E] rounded" />
      <div className="flex flex-col gap-4 border-b border-border/50 pb-8">
        <div className="w-48 h-4 bg-[#1C1C1E] rounded" />
        <div className="w-3/4 h-12 bg-[#1C1C1E] rounded sm:h-16" />
      </div>
      <div className="space-y-4">
        <div className="w-full h-6 bg-[#1C1C1E] rounded" />
        <div className="w-full h-6 bg-[#1C1C1E] rounded" />
        <div className="w-5/6 h-6 bg-[#1C1C1E] rounded" />
        <div className="w-2/3 h-6 bg-[#1C1C1E] rounded" />
      </div>
    </div>
  );
}
