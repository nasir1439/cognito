import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpenText, Loader2, Plus, Sparkles } from "lucide-react";
import {
  useCreateLectureMutation,
  useGetCourseLecturesQuery,
} from "../../../features/api/courseApi";
import { toast } from "sonner";
import PageLoader from "../../../components/PageLoader";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [lectureTitle, setLectureTitle] = useState("");

  const {
    data: lecturesData,
    isLoading: lectureLoading,
    isError: lectureError,
    refetch,
  } = useGetCourseLecturesQuery(courseId, {
    skip: !courseId,
  });

  const [createLecture, { isLoading }] = useCreateLectureMutation();

  const createLectureHandler = async (e) => {
    e.preventDefault();

    const trimmedTitle = lectureTitle.trim();

    if (!trimmedTitle) {
      toast.error("Please enter a lecture title");
      return;
    }

    try {
      await createLecture({
        courseId,
        lectureTitle: trimmedTitle,
      }).unwrap();

      toast.success("Lecture created successfully");
      setLectureTitle("");

      await refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create lecture");
    }
  };

  const lectures = lecturesData?.lectures || [];

  return (
    <div className="relative isolate w-full min-w-0 flex-1 overflow-x-clip px-3 py-5 sm:px-4 sm:py-8 md:px-8">
      {/* Background Glows */}
      <div className="pointer-events-none absolute top-10 left-0 -z-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-20 -z-10 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

      {/* Page Header */}
      <div className="relative mb-7 flex min-w-0 items-start gap-3 sm:mb-8 sm:gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/20 sm:h-14 sm:w-14 sm:rounded-2xl">
          <BookOpenText className="h-5 w-5 text-white sm:h-7 sm:w-7" />
        </div>

        <div className="min-w-0">
          <div className="mb-1 flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span className="text-xs font-semibold tracking-wide text-indigo-400 sm:text-sm">
              INSTRUCTOR PANEL
            </span>
          </div>

          <h1 className="text-xl leading-tight font-extrabold tracking-tight sm:text-2xl md:text-3xl">
            Create New Lecture
          </h1>

          <p className="text-muted-foreground mt-2 max-w-xl text-xs leading-relaxed sm:text-sm">
            Add new lectures and manage your course learning materials.
          </p>
        </div>
      </div>

      {/* Create Lecture Form */}
      <form
        onSubmit={createLectureHandler}
        className="relative isolate w-full min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl shadow-black/5 backdrop-blur-2xl sm:rounded-3xl"
      >
        {/* Card Gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-violet-500/5" />

        <div className="relative z-10 space-y-5 p-4 sm:space-y-6 sm:p-6 lg:p-8">
          <div className="space-y-2">
            <Label htmlFor="lectureTitle" className="text-sm font-semibold">
              Lecture Title
            </Label>

            <Input
              id="lectureTitle"
              type="text"
              name="lectureTitle"
              value={lectureTitle}
              onChange={(e) => setLectureTitle(e.target.value)}
              placeholder="Enter your lecture title..."
              maxLength={120}
              required
              disabled={isLoading}
              className="bg-background/40 placeholder:text-muted-foreground/60 h-11 min-w-0 rounded-xl border-white/10 text-sm backdrop-blur-xl transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 sm:h-12 sm:rounded-2xl"
            />

            <p className="text-muted-foreground text-right text-xs">
              {lectureTitle.length}/120 characters
            </p>
          </div>

          <div className="via-border/70 h-px w-full bg-gradient-to-r from-transparent to-transparent" />

          {/* Action Buttons */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(`/admin/course/${courseId}`)}
              disabled={isLoading}
              className="bg-background/40 hover:bg-muted/50 h-11 w-full rounded-xl border-white/10 px-5 text-sm backdrop-blur-xl transition-all sm:w-auto sm:rounded-2xl"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Course
            </Button>

            <Button
              type="submit"
              disabled={isLoading || !lectureTitle.trim()}
              className="h-11 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-6 text-sm font-semibold text-white shadow-lg shadow-indigo-500/10 transition-all duration-300 hover:from-indigo-600 hover:to-violet-600 hover:shadow-indigo-500/25 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:rounded-2xl"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Lecture
                </>
              )}
            </Button>
          </div>
        </div>
      </form>

      {/* Lectures Section */}
      <section className="relative mt-8 min-w-0 sm:mt-10">
        <div className="mb-5 flex min-w-0 flex-col gap-2 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-lg font-bold tracking-tight sm:text-xl">
              Course Lectures
            </h2>
            <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
              Manage the lectures available in this course.
            </p>
          </div>

          {!lectureLoading && !lectureError && (
            <span className="w-fit rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400">
              {lectures.length} {lectures.length === 1 ? "Lecture" : "Lectures"}
            </span>
          )}
        </div>

        {lectureLoading ? (
          <PageLoader />
        ) : lectureError ? (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 px-4 py-8 text-center sm:rounded-3xl">
            <p className="text-sm font-medium text-red-400">
              Failed to load lectures. Please try again.
            </p>

            <Button
              type="button"
              variant="outline"
              onClick={() => refetch()}
              className="mt-4 h-9 rounded-xl border-red-500/20 bg-transparent text-xs hover:bg-red-500/10"
            >
              Try Again
            </Button>
          </div>
        ) : lectures.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-4 py-10 text-center backdrop-blur-xl sm:rounded-3xl sm:py-14">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 sm:h-14 sm:w-14">
              <BookOpenText className="h-6 w-6 text-indigo-400 sm:h-7 sm:w-7" />
            </div>

            <h3 className="mt-4 text-base font-semibold sm:text-lg">
              No Lectures Yet
            </h3>

            <p className="text-muted-foreground mx-auto mt-2 max-w-sm text-xs leading-relaxed sm:text-sm">
              Your course doesn't have any lectures yet. Create your first
              lecture using the form above.
            </p>
          </div>
        ) : (
          <div className="min-w-0 space-y-4">
            {lectures.map((lecture, index) => (
              <Lecture
                key={lecture._id}
                lecture={lecture}
                courseId={courseId}
                index={index}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default CreateLecture;
