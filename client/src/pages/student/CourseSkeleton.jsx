import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const CourseSkeleton = () => {
  return (
    <Card className="overflow-hidden rounded-3xl border border-border/50 bg-background/70 backdrop-blur-xl">
      {/* Thumbnail */}
      <div className="relative">
        <Skeleton className="h-52 w-full rounded-none" />

        {/* Category */}
        <Skeleton className="absolute left-4 top-4 h-6 w-20 rounded-full" />

        {/* Price */}
        <Skeleton className="absolute bottom-4 right-4 h-8 w-20 rounded-full" />
      </div>

      <CardContent className="space-y-5 p-5">
        {/* Instructor */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />

          <div className="space-y-2">
            <Skeleton className="h-3 w-20 rounded-md" />
            <Skeleton className="h-4 w-28 rounded-md" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-3">
          <Skeleton className="h-6 w-full rounded-md" />
          <Skeleton className="h-6 w-3/4 rounded-md" />

          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-5/6 rounded-md" />
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between rounded-2xl border bg-muted/40 p-3">
          <Skeleton className="h-5 w-12 rounded-md" />
          <Skeleton className="h-5 w-16 rounded-md" />
          <Skeleton className="h-5 w-10 rounded-md" />
        </div>

        {/* Ratings */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-24 rounded-md" />
          <Skeleton className="h-4 w-20 rounded-md" />
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0">
        <Skeleton className="h-11 w-full rounded-2xl" />
      </CardFooter>
    </Card>
  );
};

export default CourseSkeleton;
