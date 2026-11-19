import React from "react";
import {
  BookOpen,
  AlertTriangle,
  GraduationCap,
  RefreshCw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import CourseCard from "./CourseCard";
import CourseSkeleton from "./CourseSkeleton";

import { useLoadUserQuery } from "@/features/api/authApi";

const MyLearning = () => {
  const { data, isLoading, isFetching, isError, refetch } = useLoadUserQuery();

  const myLearningCourses = data?.user?.enrolledCourses || [];

  // Initial Loading State
  if (isLoading) {
    return (
      <section className="bg-background relative min-h-screen overflow-hidden px-4 pt-24 pb-16 sm:px-6 sm:pt-28 sm:pb-20">
        <div className="from-background to-background pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b via-indigo-100/20 dark:via-indigo-950/20" />

        <div className="mx-auto max-w-7xl">
          {/* Heading Skeleton */}
          <div className="mb-10 space-y-4 sm:mb-12">
            <div className="bg-muted h-7 w-44 animate-pulse rounded-full" />
            <div className="bg-muted h-9 w-64 animate-pulse rounded-lg sm:h-12 sm:w-80" />
            <div className="bg-muted h-4 w-full max-w-xl animate-pulse rounded-md" />
          </div>

          {/* Course Skeletons */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <CourseSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error State
  if (isError) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center px-4 py-16">
        <div className="mx-auto w-full max-w-md text-center">
          <div className="bg-destructive/10 mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl">
            <AlertTriangle className="text-destructive h-8 w-8" />
          </div>

          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Something Went Wrong
          </h2>

          <p className="text-muted-foreground mt-3 text-sm leading-relaxed sm:text-base">
            Unable to load your courses right now. Please try again.
          </p>

          <Button onClick={() => refetch()} className="mt-6 rounded-xl">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </div>
      </section>
    );
  }

  // Empty State
  if (myLearningCourses.length === 0) {
    return (
      <section className="bg-background relative flex min-h-[75vh] items-center justify-center overflow-hidden px-4 py-16">
        <div className="from-background to-background pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b via-indigo-100/20 dark:via-indigo-950/20" />

        <div className="mx-auto w-full max-w-md text-center">
          <div className="bg-primary/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl sm:h-20 sm:w-20">
            <GraduationCap className="text-primary h-8 w-8 sm:h-10 sm:w-10" />
          </div>

          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            No Courses Found
          </h2>

          <p className="text-muted-foreground mt-3 text-sm leading-relaxed sm:text-base">
            You haven't enrolled in any courses yet. Explore our courses and
            start your learning journey today.
          </p>

          <Button
            asChild
            className="mt-6 h-11 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-6 text-white hover:from-indigo-600 hover:to-violet-600"
          >
            <a href="/course/search?query=">Explore Courses</a>
          </Button>
        </div>
      </section>
    );
  }

  // Main UI
  return (
    <section className="bg-background relative isolate min-h-screen overflow-hidden px-4 pt-24 pb-16 sm:px-6 sm:pt-28 sm:pb-20">
      {/* Background Gradient */}
      <div className="from-background to-background pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b via-indigo-100/20 dark:via-indigo-950/20" />

      {/* Background Glow */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl sm:h-96 sm:w-96" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-9 sm:mb-12">
          <div className="border-border/70 bg-background/70 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 backdrop-blur-sm sm:px-4">
            <BookOpen className="text-primary h-4 w-4" />

            <span className="text-muted-foreground text-xs font-medium sm:text-sm">
              Your Learning Journey
            </span>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 sm:mt-6">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              My{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                Learnings
              </span>
            </h1>

            <div className="border-border/60 bg-background/70 text-muted-foreground flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium sm:text-sm">
              <BookOpen className="text-primary h-3.5 w-3.5 sm:h-4 sm:w-4" />
              {myLearningCourses.length}{" "}
              {myLearningCourses.length === 1 ? "Course" : "Courses"}
            </div>
          </div>

          <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-relaxed sm:mt-4 sm:text-base md:text-lg">
            Continue learning from your enrolled courses and improve your skills
            every day.
          </p>

          {/* Background Refetch Indicator */}
          {isFetching && (
            <p className="text-muted-foreground mt-3 flex items-center gap-2 text-xs">
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              Updating your courses...
            </p>
          )}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {myLearningCourses.map((course) => (
            <CourseCard key={course._id || course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyLearning;
