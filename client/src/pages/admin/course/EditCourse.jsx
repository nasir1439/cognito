import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import CourseTab from "./CourseTab";

const EditCourse = () => {
  return (
    <div className="relative isolate w-full min-w-0 flex-1 overflow-x-clip px-3 py-5 sm:px-4 sm:py-8 md:px-8">
      {/* Background Glows */}
      <div className="pointer-events-none absolute top-10 left-0 -z-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="pointer-events-none absolute right-0 bottom-0 -z-10 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

      {/* Page Header */}
      <div className="relative mb-6 flex min-w-0 flex-col gap-4 sm:mb-8 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-400" />

            <span className="text-xs font-semibold tracking-wide text-indigo-400 sm:text-sm">
              INSTRUCTOR PANEL
            </span>
          </div>

          <h1 className="text-2xl leading-tight font-extrabold tracking-tight sm:text-3xl">
            Edit Your Course
          </h1>

          <p className="text-muted-foreground mt-2 max-w-2xl text-xs leading-relaxed sm:text-sm">
            Manage your course details, content, and learning materials.
          </p>
        </div>

        {/* Lecture Navigation */}
        <Link to="lecture" className="w-full shrink-0 md:w-auto">
          <Button
            variant="outline"
            className="group border-border/50 bg-background/50 hover:bg-muted/50 h-11 w-full rounded-xl px-4 text-sm backdrop-blur-xl transition-all sm:rounded-2xl md:w-auto"
          >
            Go to Lectures Page
            <ArrowRight className="ml-2 h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>

      {/* Child Component */}
      <div className="relative w-full min-w-0">
        <CourseTab />
      </div>
    </div>
  );
};

export default EditCourse;
