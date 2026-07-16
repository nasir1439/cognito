import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const MyLearningSkeleton = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background pt-28 pb-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-indigo-100/20 to-background dark:from-slate-950 dark:via-indigo-950/20 dark:to-slate-950" />

      {/* Glow */}
      <div className="absolute top-20 left-1/2 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Heading */}
        <div className="mb-12 space-y-4">
          <Skeleton className="h-8 w-48 rounded-full" />

          <Skeleton className="h-12 w-72" />

          <Skeleton className="h-5 w-[500px] max-w-full" />
        </div>

        {/* Course Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-3xl border bg-background/60 backdrop-blur-xl"
            >
              {/* Thumbnail */}
              <Skeleton className="h-52 w-full" />

              <div className="space-y-5 p-5">
                {/* Category */}
                <Skeleton className="h-5 w-24 rounded-full" />

                {/* Title */}
                <Skeleton className="h-6 w-3/4" />

                <Skeleton className="h-6 w-1/2" />

                {/* Rating + Duration */}
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-16" />

                  <Skeleton className="h-4 w-20" />
                </div>

                {/* Instructor */}
                <div className="flex items-center gap-3 pt-2">
                  <Skeleton className="h-10 w-10 rounded-full" />

                  <Skeleton className="h-4 w-32" />
                </div>

                {/* Button */}
                <Skeleton className="h-11 w-full rounded-2xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyLearningSkeleton;
