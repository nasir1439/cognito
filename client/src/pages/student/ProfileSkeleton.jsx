import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background pt-28 pb-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-indigo-100/20 to-background dark:from-slate-950 dark:via-indigo-950/20 dark:to-slate-950" />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Heading */}
        <div className="mb-10 space-y-4">
          <Skeleton className="h-8 w-40 rounded-full" />

          <Skeleton className="h-12 w-72" />

          <Skeleton className="h-5 w-[500px] max-w-full" />
        </div>

        {/* Profile Card */}
        <div className="rounded-3xl border bg-background/60 p-8 backdrop-blur-xl">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            {/* Avatar */}
            <Skeleton className="h-32 w-32 rounded-full" />

            {/* Profile Info */}
            <div className="flex-1 space-y-6 w-full">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-56" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-6 w-72" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-8 w-28 rounded-full" />
              </div>

              <Skeleton className="h-11 w-40 rounded-2xl" />
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <div className="mt-16">
          <div className="space-y-3">
            <Skeleton className="h-10 w-80" />
            <Skeleton className="h-5 w-96 max-w-full" />
          </div>

          {/* Course Cards */}
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-3xl border bg-background/60 backdrop-blur"
              >
                <Skeleton className="h-52 w-full" />

                <div className="space-y-4 p-5">
                  <Skeleton className="h-5 w-3/4" />

                  <Skeleton className="h-4 w-1/2" />

                  <div className="flex items-center gap-3 pt-2">
                    <Skeleton className="h-10 w-10 rounded-full" />

                    <Skeleton className="h-4 w-32" />
                  </div>

                  <Skeleton className="h-10 w-full rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSkeleton;
