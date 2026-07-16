import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock3 } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import CourseCard from "./CourseCard";
import CourseSkeleton from "./CourseSkeleton";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";

function Courses() {
  const { data, isLoading, isError } = useGetPublishedCourseQuery();
  // console.log(data);
  if (isError) return <h1>Some Error Occured While Fetching Courses.</h1>;

  return (
    <section
      id="courses"
      className="relative overflow-hidden bg-background py-24 px-4"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-indigo-100/20 to-background dark:from-slate-950 dark:via-indigo-950/20 dark:to-slate-950" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-14 text-center">
          <div className="inline-flex items-center rounded-full border border-border bg-background/60 px-4 py-1.5 backdrop-blur">
            <span className="text-sm text-muted-foreground">
              📚 Popular Courses
            </span>
          </div>

          <h2 className="mt-6 text-4xl font-extrabold tracking-tight md:text-5xl">
            Explore Our{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
              Top Courses
            </span>
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-lg text-muted-foreground">
            Learn in-demand skills from industry experts and boost your career
            with modern practical courses.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <CourseSkeleton key={index} />
              ))
            : data?.courses &&
              data.courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
        </div>

        {/* Bottom Button */}
        <div className="mt-14 text-center">
          <Button size="lg" variant="outline" className="rounded-2xl px-8">
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Courses;
