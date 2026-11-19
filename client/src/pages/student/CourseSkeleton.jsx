import React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const CourseSkeleton = () => {
  return (
    <Card className="border-border/60 bg-card flex h-full flex-col overflow-hidden rounded-2xl border sm:rounded-3xl">
      {/* Thumbnail */}
      <div className="bg-muted relative aspect-video w-full overflow-hidden">
        <Skeleton className="absolute inset-0 h-full w-full rounded-none" />

        {/* Category */}
        <Skeleton className="absolute top-3 left-3 h-5 w-20 rounded-full sm:top-4 sm:left-4 sm:h-6 sm:w-24" />

        {/* Price */}
        <Skeleton className="absolute right-3 bottom-3 h-6 w-16 rounded-full sm:right-4 sm:bottom-4 sm:h-8 sm:w-20" />
      </div>

      {/* Course Content */}
      <CardContent className="flex flex-1 flex-col gap-3 p-3 sm:gap-4 sm:p-5">
        {/* Instructor */}
        <div className="flex items-center gap-2.5">
          <Skeleton className="h-8 w-8 shrink-0 rounded-full sm:h-10 sm:w-10" />

          <div className="space-y-1.5">
            <Skeleton className="h-2.5 w-16 rounded-md sm:h-3 sm:w-20" />
            <Skeleton className="h-3 w-24 rounded-md sm:h-4 sm:w-28" />
          </div>
        </div>

        {/* Title and Subtitle */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-full rounded-md sm:h-6" />
          <Skeleton className="h-5 w-3/4 rounded-md sm:h-6" />

          <div className="space-y-1.5 pt-0.5">
            <Skeleton className="h-3.5 w-full rounded-md sm:h-4" />
            <Skeleton className="h-3.5 w-5/6 rounded-md sm:h-4" />
          </div>
        </div>

        {/* Course Statistics */}
        <div className="border-border/60 bg-muted/30 mt-auto grid grid-cols-3 gap-1.5 rounded-xl border p-2 sm:gap-2 sm:rounded-2xl sm:p-3">
          <div className="flex items-center justify-center gap-1">
            <Skeleton className="h-3.5 w-3.5 shrink-0 rounded-full sm:h-4 sm:w-4" />
            <Skeleton className="h-3 w-9 rounded-md sm:w-12" />
          </div>

          <div className="flex items-center justify-center gap-1">
            <Skeleton className="h-3.5 w-3.5 shrink-0 rounded-full sm:h-4 sm:w-4" />
            <Skeleton className="h-3 w-10 rounded-md sm:w-14" />
          </div>

          <div className="flex items-center justify-center gap-1">
            <Skeleton className="h-3.5 w-3.5 shrink-0 rounded-full sm:h-4 sm:w-4" />
            <Skeleton className="h-3 w-7 rounded-md sm:w-10" />
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <Skeleton className="h-3 w-20 rounded-md sm:h-3.5 sm:w-24" />
          <Skeleton className="h-3 w-14 rounded-md sm:h-3.5 sm:w-16" />
        </div>
      </CardContent>

      {/* Action */}
      <CardFooter className="p-3 pt-0 sm:p-5 sm:pt-0">
        <Skeleton className="h-9 w-full rounded-xl sm:h-11" />
      </CardFooter>
    </Card>
  );
};

export default CourseSkeleton;
