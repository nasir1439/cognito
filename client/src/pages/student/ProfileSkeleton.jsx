import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <section className="bg-background relative min-h-screen overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20">
      {/* Background */}
      <div className="from-background to-background pointer-events-none absolute inset-0 bg-gradient-to-b via-indigo-100/20 dark:from-slate-950 dark:via-indigo-950/20 dark:to-slate-950" />

      {/* Glow */}
      <div className="pointer-events-none absolute top-10 left-1/2 h-[280px] w-[280px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl sm:h-[400px] sm:w-[400px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-8 space-y-3 sm:mb-12 sm:space-y-4">
          <Skeleton className="h-7 w-36 rounded-full sm:h-8 sm:w-48" />

          <Skeleton className="h-9 w-56 rounded-lg sm:h-12 sm:w-72" />

          <Skeleton className="h-4 w-64 max-w-full rounded-md sm:h-5 sm:w-[500px]" />
        </div>

        {/* Profile Card */}
        <div className="border-border/60 bg-background/70 overflow-hidden rounded-2xl border shadow-lg shadow-indigo-500/5 backdrop-blur-xl sm:rounded-3xl sm:shadow-xl">
          {/* Gradient Header */}
          <div className="h-2 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />

          <div className="p-5 sm:p-7 md:p-9">
            <div className="flex flex-col items-center gap-6 sm:gap-8 md:flex-row md:items-start">
              {/* Avatar */}
              <Skeleton className="h-24 w-24 shrink-0 rounded-full sm:h-32 sm:w-32" />

              {/* Profile Information */}
              <div className="w-full min-w-0 flex-1">
                {/* Account Name */}
                <div className="mb-5 space-y-2">
                  <Skeleton className="mx-auto h-3 w-32 md:mx-0" />

                  <Skeleton className="mx-auto h-7 w-48 sm:h-8 sm:w-56 md:mx-0" />
                </div>

                {/* Information Grid */}
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  {/* Full Name */}
                  <div className="border-border/60 bg-muted/20 rounded-xl border p-3.5 sm:p-4">
                    <Skeleton className="mx-auto mb-3 h-3.5 w-20 md:mx-0" />

                    <Skeleton className="mx-auto h-4 w-32 md:mx-0" />
                  </div>

                  {/* Email */}
                  <div className="border-border/60 bg-muted/20 rounded-xl border p-3.5 sm:p-4">
                    <Skeleton className="mx-auto mb-3 h-3.5 w-24 md:mx-0" />

                    <Skeleton className="mx-auto h-4 w-40 max-w-full md:mx-0" />
                  </div>

                  {/* Role */}
                  <div className="border-border/60 bg-muted/20 rounded-xl border p-3.5 sm:p-4">
                    <Skeleton className="mx-auto mb-3 h-3.5 w-20 md:mx-0" />

                    <div className="flex justify-center md:justify-start">
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                  </div>

                  {/* Enrolled Courses */}
                  <div className="border-border/60 bg-muted/20 rounded-xl border p-3.5 sm:p-4">
                    <Skeleton className="mx-auto mb-3 h-3.5 w-28 md:mx-0" />

                    <Skeleton className="mx-auto h-4 w-16 md:mx-0" />
                  </div>
                </div>

                {/* Edit Profile Button */}
                <div className="mt-6 flex justify-center md:justify-start">
                  <Skeleton className="h-10 w-full rounded-xl sm:w-36" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enrolled Courses Section */}
        <div className="mt-12 sm:mt-16">
          {/* Section Heading */}
          <div className="mb-6 space-y-3 sm:mb-8">
            <Skeleton className="h-4 w-40" />

            <Skeleton className="h-8 w-64 max-w-full sm:h-9 sm:w-96" />

            <Skeleton className="h-4 w-56 max-w-full" />
          </div>

          {/* Course Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-7">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="border-border/60 bg-background/60 flex h-full flex-col overflow-hidden rounded-2xl border backdrop-blur-xl sm:rounded-3xl"
              >
                {/* Thumbnail */}
                <Skeleton className="aspect-video w-full rounded-none" />

                {/* Card Content */}
                <div className="flex flex-1 flex-col gap-3 p-3 sm:gap-4 sm:p-5">
                  {/* Instructor */}
                  <div className="flex items-center gap-2.5">
                    <Skeleton className="h-8 w-8 shrink-0 rounded-full sm:h-10 sm:w-10" />

                    <div className="flex-1 space-y-1.5">
                      <Skeleton className="h-3 w-16 sm:w-20" />

                      <Skeleton className="h-3.5 w-24 sm:h-4 sm:w-32" />
                    </div>
                  </div>

                  {/* Title and Subtitle */}
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-4/5 sm:h-5" />

                    <Skeleton className="h-4 w-3/5 sm:h-5" />

                    <Skeleton className="mt-2 h-3 w-full sm:h-4" />

                    <Skeleton className="h-3 w-2/3 sm:h-4" />
                  </div>

                  {/* Course Stats */}
                  <div className="border-border/60 bg-muted/20 mt-auto grid grid-cols-3 gap-1.5 rounded-xl border p-2 sm:gap-2 sm:rounded-2xl sm:p-3">
                    <Skeleton className="mx-auto h-3 w-12 sm:h-4 sm:w-16" />

                    <Skeleton className="mx-auto h-3 w-12 sm:h-4 sm:w-16" />

                    <Skeleton className="mx-auto h-3 w-10 sm:h-4 sm:w-14" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5">
                    <Skeleton className="h-3 w-20 sm:h-3.5 sm:w-24" />

                    <Skeleton className="h-3 w-12 sm:h-3.5 sm:w-16" />
                  </div>
                </div>

                {/* Action */}
                <div className="p-3 pt-0 sm:p-5 sm:pt-0">
                  <Skeleton className="h-9 w-full rounded-xl sm:h-11" />
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
