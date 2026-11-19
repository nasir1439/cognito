import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, BookOpen, UserRound, IndianRupee } from "lucide-react";

const SearchResult = ({ course }) => {
  const instructorName = course?.creator?.name || "Instructor";
  const instructorInitial = instructorName.charAt(0).toUpperCase();

  const courseTitle = course?.courseTitle || "Untitled Course";

  return (
    <article className="group border-border/60 bg-card/70 overflow-hidden rounded-2xl border shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 sm:rounded-3xl">
      <div className="flex flex-col sm:flex-row">
        {/* Course Thumbnail */}
        <div className="bg-muted relative aspect-video w-full shrink-0 overflow-hidden sm:aspect-auto sm:min-h-[220px] sm:w-56 md:w-64 lg:w-72">
          {course?.courseThumbnail ? (
            <img
              src={course.courseThumbnail}
              alt={courseTitle}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full min-h-40 items-center justify-center">
              <BookOpen className="text-muted-foreground/40 h-12 w-12" />
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        {/* Course Details */}
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-5 p-4 sm:p-5 md:p-6">
          <div>
            {/* Badges */}
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {course?.courseLevel && (
                <Badge className="rounded-full border-0 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-600 hover:bg-indigo-500/15 dark:text-indigo-400">
                  {course.courseLevel}
                </Badge>
              )}

              {course?.category && (
                <Badge
                  variant="secondary"
                  className="max-w-full rounded-full px-3 py-1 text-xs font-medium"
                >
                  {course.category}
                </Badge>
              )}
            </div>

            {/* Title */}
            <h2 className="line-clamp-2 text-lg leading-snug font-bold tracking-tight transition-colors group-hover:text-indigo-600 sm:text-xl dark:group-hover:text-indigo-400">
              {courseTitle}
            </h2>

            {/* Subtitle */}
            {course?.subTitle && (
              <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-relaxed">
                {course.subTitle}
              </p>
            )}
          </div>

          {/* Instructor & Price */}
          <div className="mt-auto space-y-4">
            <div className="flex min-w-0 items-center gap-2.5">
              <Avatar className="border-border/60 h-8 w-8 shrink-0 border">
                {course?.creator?.photoUrl && (
                  <AvatarImage
                    src={course.creator.photoUrl}
                    alt={instructorName}
                  />
                )}

                <AvatarFallback className="bg-indigo-500/10 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  {instructorInitial || <UserRound className="h-4 w-4" />}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0">
                <p className="text-muted-foreground text-[11px]">Instructor</p>
                <p className="truncate text-sm font-semibold">
                  {instructorName}
                </p>
              </div>
            </div>

            <div className="border-border/60 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-muted-foreground mb-1 text-xs">
                  Course Price
                </p>

                <div className="text-primary flex items-center gap-0.5 text-xl font-bold tracking-tight sm:text-2xl">
                  <IndianRupee className="h-5 w-5" />
                  {course?.coursePrice ?? "N/A"}
                </div>
              </div>

              <Button
                asChild
                className="w-full rounded-xl bg-indigo-600 shadow-sm shadow-indigo-500/20 transition-all hover:bg-indigo-700 sm:w-auto"
              >
                <Link to={`/course-detail/${course?._id}`}>
                  View Course
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default SearchResult;
