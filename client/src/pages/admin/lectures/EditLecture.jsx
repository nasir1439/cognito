import React from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LectureTab from "./LectureTab";

const EditLecture = () => {
  const { courseId } = useParams();

  return (
    <div className="relative isolate w-full min-w-0 flex-1 overflow-x-clip px-3 py-5 sm:px-4 sm:py-8 md:px-8">
      {/* Background Glows */}
      <div className="pointer-events-none absolute top-10 left-0 -z-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 -z-10 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

      {/* Page Header */}
      <div className="relative mb-6 flex min-w-0 flex-col gap-4 sm:mb-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
          <Link to={`/admin/course/${courseId}/lecture`} className="shrink-0">
            <Button
              type="button"
              size="icon"
              className="h-10 w-10 rounded-xl border border-white/10 bg-white/10 text-white shadow-sm backdrop-blur-xl transition-colors hover:bg-white/15 sm:h-11 sm:w-11 sm:rounded-2xl"
            >
              <ArrowLeft className="h-4 w-4 text-gray-500 sm:h-5 sm:w-5" />
            </Button>
          </Link>

          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-indigo-400 sm:h-4 sm:w-4" />

              <span className="text-xs font-semibold tracking-wide text-indigo-400 sm:text-sm">
                LECTURE EDITOR
              </span>
            </div>

            <h1 className="text-2xl leading-tight font-extrabold tracking-tight sm:text-3xl">
              Update Your Lecture
            </h1>

            <p className="text-muted-foreground mt-2 max-w-2xl text-xs leading-relaxed sm:text-sm">
              Edit lecture content, video resources, and improve the learning
              experience for your students.
            </p>
          </div>
        </div>
      </div>

      {/* Lecture Editor */}
      <div className="relative w-full min-w-0">
        <LectureTab />
      </div>
    </div>
  );
};

export default EditLecture;
