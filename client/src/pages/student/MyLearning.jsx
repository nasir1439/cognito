import React from "react";
import CourseCard from "./CourseCard";
import { BookOpen } from "lucide-react";
import CourseSkeleton from "./CourseSkeleton";
import { useLoadUserQuery } from "@/features/api/authApi";

const MyLearning = () => {
  const { data, isLoading } = useLoadUserQuery();
  const myLearningCourses = data?.user.enrolledCourses || [];
  // console.log(myLearningCourses);
  if (myLearningCourses.length === 0)
    return (
      <div className="flex flex-col items-center mt-30 justify-center rounded-3xl border border-dashed py-40 text-center">
        <h2 className="text-2xl font-bold">No Courses Found</h2>

        <p className="mt-3 text-muted-foreground">
          You are not enrolled in any courses yet.
        </p>
      </div>
    );
  return (
    <section className="relative min-h-screen overflow-hidden bg-background pt-28 pb-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-indigo-100/20 to-background dark:from-slate-950 dark:via-indigo-950/20 dark:to-slate-950" />

      {/* Glow */}
      <div className="absolute top-20 left-1/2 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Heading */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-1.5 backdrop-blur">
            <BookOpen size={16} />
            <span className="text-sm text-muted-foreground">
              Your Learning Journey
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-5xl">
            My{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
              Learnings
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Continue learning from your enrolled courses and improve your skills
            every day.
          </p>
        </div>

        {/* Courses */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <CourseSkeleton key={index} />
              ))
            : myLearningCourses &&
              myLearningCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default MyLearning;
