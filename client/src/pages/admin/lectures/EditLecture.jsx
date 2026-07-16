import React from "react";

import { ArrowLeft, Sparkles } from "lucide-react";

import { Link, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";

import LectureTab from "./LectureTab";

const EditLecture = () => {
  const params = useParams();

  const courseId = params.courseId;

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-8 md:px-8">
      {/* Background Glow */}
      <div className="absolute left-0 top-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

      {/* Main Container */}
      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/10 p-6 shadow-xl backdrop-blur-2xl md:flex-row md:items-center md:justify-between">
          {/* Left Side */}
          <div className="flex items-center gap-4">
            <Link to={`/admin/course/${courseId}/lecture`}>
              <Button
                size="icon"
                variant="outline"
                className="h-11 w-11 rounded-2xl border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white/10"
              >
                <ArrowLeft size={18} />
              </Button>
            </Link>

            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-400" />

                <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                  Lecture Editor
                </p>
              </div>

              <h1 className="mt-1 text-3xl font-extrabold tracking-tight">
                Update Your Lecture
              </h1>

              <p className="mt-2 text-sm text-muted-foreground">
                Edit lecture content, video resources, and optimize learning
                experience for your students.
              </p>
            </div>
          </div>
        </div>

        {/* Lecture Tab */}
        <div className="rounded-3xl">
          <LectureTab />
        </div>
      </div>
    </div>
  );
};

export default EditLecture;
