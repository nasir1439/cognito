import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, AlertTriangle } from "lucide-react";

import CourseCard from "./CourseCard";
import CourseSkeleton from "./CourseSkeleton";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";

function Courses() {
  const { data, isLoading, isError } = useGetPublishedCourseQuery();

  // Error State
  if (isError) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center px-4 py-16">
        <div className="mx-auto w-full max-w-md text-center">
          <div className="bg-destructive/10 mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl">
            <AlertTriangle className="text-destructive h-8 w-8" />
          </div>

          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Something Went Wrong
          </h2>

          <p className="text-muted-foreground mt-3 text-sm leading-relaxed sm:text-base">
            We couldn't load the courses right now. Please refresh the page or
            try again later.
          </p>

          <Button
            className="mt-6 rounded-xl"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </section>
    );
  }

  // Empty State
  if (!isLoading && data?.courses?.length === 0) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center px-4 py-16">
        <div className="mx-auto w-full max-w-md text-center">
          <div className="bg-primary/10 mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl">
            <BookOpen className="text-primary h-8 w-8" />
          </div>

          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            No Courses Available
          </h2>

          <p className="text-muted-foreground mt-3 text-sm leading-relaxed sm:text-base">
            There are no published courses at the moment. Please check back
            later for new learning opportunities.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="courses"
      className="bg-background relative isolate overflow-hidden px-4 py-16 sm:py-20 lg:py-24"
    >
      {/* Background Gradient */}
      <div className="from-background to-background pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b via-indigo-100/20 dark:via-indigo-950/20" />

      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <div className="border-border/70 bg-background/70 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 backdrop-blur-sm sm:px-4">
            <BookOpen className="text-primary h-4 w-4" />
            <span className="text-muted-foreground text-xs font-medium sm:text-sm">
              Popular Courses
            </span>
          </div>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:mt-6 sm:text-4xl md:text-5xl">
            Explore Our{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
              Top Courses
            </span>
          </h2>

          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-sm leading-relaxed sm:mt-5 sm:text-base md:text-lg">
            Learn in-demand skills from industry experts and boost your career
            with modern practical courses.
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <CourseSkeleton key={index} />
              ))
            : data?.courses?.map((course) => (
                <CourseCard key={course._id || course.id} course={course} />
              ))}
        </div>

        {/* View All Courses */}
        {!isLoading && data?.courses?.length > 0 && (
          <div className="mt-10 flex justify-center sm:mt-14">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="group h-11 rounded-xl px-6 text-sm sm:h-12 sm:px-8 sm:text-base"
            >
              <Link to="/course/search?query=">
                View All Courses
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Courses;
