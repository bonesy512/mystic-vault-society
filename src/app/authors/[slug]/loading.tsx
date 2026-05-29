import React from "react";

export default function AuthorLoading() {
  return (
    <div className="flex flex-col gap-20 pb-20 animate-pulse font-serif">
      {/* 1. Profile Header Skeleton */}
      <section className="bg-gradient-to-b from-[#161618] to-transparent py-16 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Avatar box skeleton */}
          <div className="md:col-span-4 flex justify-center">
            <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-2xl bg-neutral-900 border border-neutral-800" />
          </div>
          {/* Bio text skeleton */}
          <div className="md:col-span-8 flex flex-col gap-4">
            <div className="h-4 w-32 bg-primary/10 rounded" />
            <div className="h-10 w-3/4 bg-neutral-900 rounded" />
            <div className="h-5 w-1/2 bg-neutral-900/60 rounded" />
            <div className="mt-4 flex flex-col gap-3">
              <div className="h-4 w-full bg-neutral-900/40 rounded" />
              <div className="h-4 w-5/6 bg-neutral-900/40 rounded" />
              <div className="h-4 w-4/5 bg-neutral-900/40 rounded" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Bibliography Skeleton */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="h-8 w-48 bg-neutral-900 rounded mx-auto" />
        <div className="flex flex-col gap-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-card/30 border border-border/60 rounded-2xl p-6 sm:p-10">
            {/* Book cover skeleton */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-48 h-72 sm:w-60 sm:h-90 bg-neutral-900 rounded border border-neutral-800" />
            </div>
            {/* Book details skeleton */}
            <div className="lg:col-span-8 flex flex-col gap-5 w-full">
              <div className="flex flex-col gap-2">
                <div className="h-8 w-1/3 bg-neutral-900 rounded" />
                <div className="h-4 w-20 bg-primary/10 rounded" />
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-4 w-full bg-neutral-900/40 rounded" />
                <div className="h-4 w-full bg-neutral-900/40 rounded" />
                <div className="h-4 w-2/3 bg-neutral-900/40 rounded" />
              </div>
              <div className="h-10 w-40 bg-neutral-900 rounded mt-4" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
