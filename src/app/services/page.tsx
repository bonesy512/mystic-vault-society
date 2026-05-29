import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Globe, CheckCircle2, ChevronRight, PenTool, Milestone, Megaphone } from "lucide-react";
import { cacheLife } from "next/cache";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guild Services | Mystic Vault Society",
  description: "Bespoke publishing, editorial, and platform design services for science fiction and fantasy authors. Developmental editing, cover brief design, formatting, and distribution project management.",
  openGraph: {
    title: "Guild Services | Mystic Vault Society",
    description: "Bespoke publishing, editorial, and platform design services for science fiction and fantasy authors. Developmental editing, cover brief design, formatting, and distribution project management.",
    url: "https://mysticvaultsociety.com/services",
    type: "website",
  },
};

async function getServicesData() {
  "use cache";
  cacheLife("days");
  
  return {
    hero: {
      title: "Your Publishing Quest, Your Way",
      description: "We believe in empowering authors. Instead of a one-size-fits-all package, our author publishing services are offered as a suite of professional, fee-for-service options. This allows you to maintain creative control and invest in the specific areas you need to make your book a success."
    },
    sections: [
      {
        id: "editorial",
        title: "Professional Author Editing Services",
        description: "Every great story deserves to be told with clarity and power. Our editorial process is designed to elevate your manuscript to its highest potential while preserving your unique voice. We act as your trusted partner to refine your narrative from the foundational structure to the final polish.",
        image: "https://mysticvaultsociety.com/wp-content/uploads/2025/07/close-up-opened-book-page-with-blurry-background-2025-02-25-01-51-14-utc.png",
        items: [
          {
            name: "Developmental Editing for Sci-Fi & Fantasy",
            description: "This is the crucial first step where we focus on the 'big picture.' We provide actionable feedback on core elements like plot structure, character development, pacing, worldbuilding consistency, and resolving plot holes. Our goal is to ensure your story's foundation is solid and compelling."
          },
          {
            name: "Line Editing",
            description: "Once the story is solid, we zoom in on the prose itself. This detailed, sentence-by-sentence pass focuses on improving flow, clarity, style, and tone. We address awkward phrasing and strengthen word choice to make your authorial voice shine."
          },
          {
            name: "Proofreading",
            description: "The final guard against error. This last pass is a meticulous hunt for any lingering typos, grammatical mistakes, punctuation errors, and formatting inconsistencies before your book goes to print."
          }
        ]
      },
      {
        id: "publishing",
        title: "Book Distribution & Publishing Support",
        description: "The journey from a finished manuscript to a book in a reader's hands is filled with technical hurdles. We serve as your dedicated project manager, guiding you through the essential steps to prepare your book for a global audience.",
        image: "https://mysticvaultsociety.com/wp-content/uploads/2025/07/white-book-cover-mock-up-and-coffee-cup-on-the-tab-2024-12-07-13-36-23-utc.png",
        items: [
          {
            name: "Cover Design Consultation",
            description: "A book cover is your most important marketing tool. We help you find a high-quality cover artist and assist in preparing a professional 'artist's brief' that clearly communicates your vision, genre expectations, and target audience."
          },
          {
            name: "Print & eBook Formatting",
            description: "We manage the complex process of getting your interior and exterior files formatted to the precise specifications required for platforms like Amazon KDP and IngramSpark, including trim sizes, gutter margins, and clean EPUB files."
          },
          {
            name: "Global Distribution via IngramSpark",
            description: "Using our experience with the industry's leading distribution network, we guide you through the setup process to make your book available to thousands of online retailers and physical bookstores worldwide through print-on-demand."
          }
        ]
      },
      {
        id: "marketing",
        title: "Author Marketing & Platform Services",
        description: "A great book deserves to be discovered. Building a platform is essential for connecting with your audience and driving sales. We use our real-world experience to help you establish a professional author brand from the ground up.",
        image: "https://mysticvaultsociety.com/wp-content/uploads/2025/07/young-student-watching-lesson-online-and-studying-2024-11-27-14-04-40-utc.png",
        items: [
          {
            name: "Tailored Marketing Programs",
            description: "Based on your book's specific genre, we help you design and execute a launch plan and ongoing marketing strategy, including social media tactics and newsletter marketing."
          },
          {
            name: "Author Webpage",
            description: "Your website is your digital home base. We can build and host a professional, modern author webpage for you, creating a central hub for your readers with a blog, book pages, and newsletter integration."
          },
          {
            name: "Promotional Merchandise",
            description: "Ready to give your superfans something more? We can brainstorm and assist with the development of creative merchandise that your readers will love, from custom bookmarks and art prints to apparel and other unique items."
          }
        ]
      }
    ]
  };
}

export default async function ServicesPage() {
  const data = await getServicesData();

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#0B0B0C] to-[#642B36]/30 py-20 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground tracking-tight">
            {data.hero.title}
          </h1>
          <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
            {data.hero.description}
          </p>
          <div className="mt-4">
            <Link
              href="/contact"
              className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg crimson-glow crimson-glow-hover hover:bg-primary/95 transition-all duration-300"
            >
              Request a Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Services Subsections */}
      {data.sections.map((section, idx) => {
        const isEven = idx % 2 === 0;
        return (
          <section
            key={section.id}
            className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center`}
          >
            {/* Image block (swap order for alternates) */}
            <div className={`lg:col-span-5 relative aspect-square bg-card border border-border rounded-xl overflow-hidden crimson-glow ${
              isEven ? "lg:order-1" : "lg:order-2"
            }`}>
              <Image
                src={section.image}
                alt={section.title}
                fill
                className="object-cover opacity-75"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>

            {/* Content block */}
            <div className={`lg:col-span-7 flex flex-col gap-8 ${
              isEven ? "lg:order-2" : "lg:order-1"
            }`}>
              <div className="flex flex-col gap-3">
                <div className="inline-flex w-fit px-3 py-1 bg-primary/10 border border-primary/20 rounded text-xs font-semibold uppercase tracking-wider text-primary">
                  {section.id === "editorial" && <PenTool className="w-3.5 h-3.5 mr-1.5 inline" />}
                  {section.id === "publishing" && <Milestone className="w-3.5 h-3.5 mr-1.5 inline" />}
                  {section.id === "marketing" && <Megaphone className="w-3.5 h-3.5 mr-1.5 inline" />}
                  {section.id}
                </div>
                <h2 className="text-3xl font-serif font-bold text-foreground">{section.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">{section.description}</p>
              </div>

              <div className="flex flex-col gap-6">
                {section.items.map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-lg bg-card/45 border border-border/50 hover:border-primary/20 transition-all duration-300">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-1">
                      <h4 className="font-semibold text-foreground text-base">{item.name}</h4>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Call to Action Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-[#642B36]/25 border border-primary/20 rounded-2xl p-8 sm:p-12 text-center flex flex-col items-center gap-6 crimson-glow">
          <h2 className="text-3xl font-serif font-bold text-foreground">Ready to Begin Your Quest?</h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed">
            Every author&apos;s needs are unique. Contact us today for a free, no-obligation consultation to discuss your project. We can provide a personalized quote tailored to the specific author publishing services that will best serve you and your story. Let&apos;s build your legacy together.
          </p>
          <div className="mt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/95 transition-all duration-300 group"
            >
              Request a Consultation
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-all duration-300" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
