import React from "react";
import { Link } from "react-router-dom";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Star,
  Users,
  Clock3,
  Signal,
  IndianRupee,
  ArrowRight,
} from "lucide-react";

import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";

function CourseCard({ course }) {
  const courseId = course?._id;

  const { data } = useGetCourseDetailWithStatusQuery(courseId, {
    skip: !courseId,
  });

  const purchased = data?.purchased;
  const instructorName = course?.creator?.name || "Instructor";

  return (
    <Link
      to={`/course-detail/${courseId}`}
      className="group focus-visible:ring-primary block h-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
    >
      <Card className="border-border/60 bg-card sm:hover:border-primary/30 sm:hover:shadow-primary/10 flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-300 sm:rounded-3xl sm:hover:-translate-y-1 sm:hover:shadow-xl">
        {/* Thumbnail */}
        <div className="bg-muted relative aspect-video w-full overflow-hidden">
          <img
            src={course?.courseThumbnail}
            alt={course?.courseTitle || "Course thumbnail"}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 sm:group-hover:scale-105"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

          {/* Category */}
          {course?.category && (
            <Badge className="absolute top-3 left-3 max-w-[70%] truncate rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[10px] font-medium text-white shadow-none backdrop-blur-md hover:bg-black/50 sm:top-4 sm:left-4 sm:px-3 sm:text-xs">
              {course.category}
            </Badge>
          )}

          {/* Price */}
          <div className="bg-background/90 absolute right-3 bottom-3 flex items-center rounded-full border border-white/20 px-2.5 py-1 text-xs font-bold shadow-sm backdrop-blur-md sm:right-4 sm:bottom-4 sm:px-3 sm:py-1.5 sm:text-sm">
            <IndianRupee className="text-primary mr-0.5 h-3 w-3 sm:h-4 sm:w-4" />
            {course?.coursePrice ?? 0}
          </div>
        </div>

        {/* Course Content */}
        <CardContent className="flex flex-1 flex-col gap-3 p-3 sm:gap-4 sm:p-5">
          {/* Instructor */}
          <div className="flex min-w-0 items-center gap-2.5">
            <Avatar className="border-primary/20 h-8 w-8 shrink-0 border sm:h-10 sm:w-10">
              <AvatarImage
                src={course?.creator?.photoUrl}
                alt={instructorName}
              />

              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-500 text-xs font-semibold text-white">
                {instructorName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <p className="text-muted-foreground text-[10px] sm:text-xs">
                Instructor
              </p>

              <h4 className="truncate text-xs font-semibold sm:text-sm">
                {instructorName}
              </h4>
            </div>
          </div>

          {/* Title and Subtitle */}
          <div>
            <h2 className="group-hover:text-primary line-clamp-2 text-base leading-snug font-bold tracking-tight transition-colors duration-300 sm:text-lg lg:text-xl">
              {course?.courseTitle}
            </h2>

            <p className="text-muted-foreground mt-1.5 line-clamp-2 text-xs leading-relaxed sm:mt-2 sm:text-sm">
              {course?.subTitle}
            </p>
          </div>

          {/* Course Stats */}
          <div className="border-border/60 bg-muted/30 mt-auto grid grid-cols-3 gap-1.5 rounded-xl border p-2 sm:gap-2 sm:rounded-2xl sm:p-3">
            <div className="text-muted-foreground flex min-w-0 items-center justify-center gap-1">
              <Users className="h-3.5 w-3.5 shrink-0 text-indigo-500 sm:h-4 sm:w-4" />

              <span className="truncate text-[10px] font-medium sm:text-xs">
                {course?.enrolledStudents?.length || 0} Students
              </span>
            </div>

            <div className="text-muted-foreground flex min-w-0 items-center justify-center gap-1">
              <Signal className="h-3.5 w-3.5 shrink-0 text-violet-500 sm:h-4 sm:w-4" />

              <span className="truncate text-[10px] font-medium sm:text-xs">
                {course?.courseLevel || "All Levels"}
              </span>
            </div>

            <div className="text-muted-foreground flex min-w-0 items-center justify-center gap-1">
              <Clock3 className="h-3.5 w-3.5 shrink-0 text-pink-500 sm:h-4 sm:w-4" />

              <span className="truncate text-[10px] font-medium sm:text-xs">
                12h
              </span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex shrink-0 items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className="h-3 w-3 fill-yellow-400 text-yellow-400 sm:h-3.5 sm:w-3.5"
                />
              ))}
            </div>

            <span className="text-muted-foreground text-[10px] font-medium sm:text-xs">
              4.9 Ratings
            </span>
          </div>
        </CardContent>

        {/* Action */}
        <CardFooter className="p-3 pt-0 sm:p-5 sm:pt-0">
          <div
            className={`flex h-9 w-full items-center justify-center gap-2 rounded-xl text-xs font-semibold transition-all duration-300 sm:h-11 sm:text-sm ${
              purchased
                ? "bg-green-500 text-white sm:group-hover:bg-green-600"
                : "bg-gradient-to-r from-indigo-500 to-violet-500 text-white sm:group-hover:shadow-lg sm:group-hover:shadow-indigo-500/20"
            }`}
          >
            <span>{purchased ? "Continue Course" : "Enroll Now"}</span>

            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 sm:h-4 sm:w-4 sm:group-hover:translate-x-1" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default CourseCard;
