import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";

import {
  AlertCircle,
  BookOpen,
  CheckCircle,
  CheckCircle2,
  Loader2,
  PlayCircle,
  RefreshCw,
  Trophy,
  Video,
} from "lucide-react";

import { toast } from "sonner";

const CourseProgress = () => {
  const { courseId } = useParams();

  const { data, isLoading, isError, refetch } = useGetCourseProgressQuery(
    courseId,
    {
      skip: !courseId,
    },
  );

  const [updateLectureProgress] = useUpdateLectureProgressMutation();

  const [completeCourse, { isLoading: isCompleting }] =
    useCompleteCourseMutation();

  const [inCompleteCourse, { isLoading: isMarkingIncomplete }] =
    useInCompleteCourseMutation();

  const [currentLecture, setCurrentLecture] = useState(null);

  // Safely extract course data.
  const courseDetails = data?.data?.courseDetails;
  const progress = Array.isArray(data?.data?.progress)
    ? data.data.progress
    : [];
  const completed = data?.data?.completed ?? false;

  const lectures = Array.isArray(courseDetails?.lectures)
    ? courseDetails.lectures
    : [];

  const activeLecture = currentLecture || lectures[0];

  const completedLectures = progress.filter(
    (lecture) => lecture?.viewed,
  ).length;

  const progressPercentage = lectures.length
    ? Math.round((completedLectures / lectures.length) * 100)
    : 0;

  const isLectureCompleted = (lectureId) => {
    return progress.some(
      (item) =>
        item?.lectureId?.toString() === lectureId?.toString() && item?.viewed,
    );
  };

  // Update lecture progress.
  const handleLectureProgress = async (lectureId) => {
    try {
      await updateLectureProgress({
        courseId,
        lectureId,
      }).unwrap();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update lecture progress.");
    }
  };

  const handleSelectLecture = async (lecture) => {
    if (!lecture?._id) return;

    setCurrentLecture(lecture);

    // Avoid unnecessary API calls for an already completed lecture.
    if (!isLectureCompleted(lecture._id)) {
      await handleLectureProgress(lecture._id);
    }
  };

  // Mark course as completed.
  const handleCompleteCourse = async () => {
    try {
      const response = await completeCourse(courseId).unwrap();

      toast.success(response?.message || "Course marked as completed.");
      await refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to complete the course.");
    }
  };

  // Remove course completion status.
  const handleInCompleteCourse = async () => {
    try {
      const response = await inCompleteCourse(courseId).unwrap();

      toast.success(response?.message || "Course completion status removed.");
      await refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update course status.");
    }
  };

  // Loading state.
  if (isLoading) {
    return <CourseProgressSkeleton />;
  }

  // Error state.
  if (isError || !courseDetails) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <Card className="border-border/60 bg-card/80 w-full max-w-md rounded-3xl shadow-sm">
          <CardContent className="flex flex-col items-center px-6 py-12 text-center">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10">
              <AlertCircle className="h-7 w-7 text-red-500" />
            </div>

            <h2 className="text-xl font-bold">Unable to Load Course</h2>

            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Something went wrong while loading your course progress. Please
              try again.
            </p>

            <Button
              onClick={() => refetch()}
              className="mt-6 gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Empty course state.
  if (!lectures.length) {
    return (
      <div className="mx-auto min-h-[70vh] max-w-5xl px-4 pt-28">
        <Card className="border-border/60 bg-card/80 overflow-hidden rounded-3xl shadow-sm">
          <CardContent className="flex flex-col items-center px-6 py-16 text-center sm:py-20">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10">
              <BookOpen className="h-8 w-8 text-indigo-500" />
            </div>

            <h2 className="text-xl font-bold sm:text-2xl">
              No Lectures Available
            </h2>

            <p className="text-muted-foreground mt-2 max-w-md text-sm leading-relaxed">
              This course doesn't contain any lectures yet. Please check back
              later for new content.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isCourseActionLoading = isCompleting || isMarkingIncomplete;

  return (
    <div className="bg-background min-h-screen overflow-x-hidden pt-16 pb-12 sm:pt-16">
      {/* Course Header */}
      <section className="border-border/50 relative mb-8 overflow-hidden border-b">
        <div className="from-background to-background absolute inset-0 bg-gradient-to-br via-indigo-100/30 dark:from-slate-950 dark:via-indigo-950/30 dark:to-slate-950" />

        <div className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:py-10 lg:py-12">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0 flex-1">
              <Badge className="border border-indigo-500/20 bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/10 dark:text-indigo-400">
                {courseDetails.category || "Course"}
              </Badge>

              <h1 className="mt-4 text-2xl font-bold tracking-tight break-words sm:text-3xl lg:text-4xl">
                {courseDetails.courseTitle || "Course Progress"}
              </h1>

              <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-relaxed sm:text-base">
                Continue your learning journey and keep moving towards
                completing your course.
              </p>

              {/* Progress */}
              <div className="mt-6 max-w-lg">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="text-sm font-medium">Learning Progress</span>

                  <span className="text-sm font-semibold whitespace-nowrap text-indigo-600 tabular-nums dark:text-indigo-400">
                    {progressPercentage}%
                  </span>
                </div>

                <Progress
                  value={progressPercentage}
                  className="h-2.5 bg-indigo-500/10"
                />

                <p className="text-muted-foreground mt-2 text-xs">
                  {completedLectures} of {lectures.length} lectures completed
                </p>
              </div>
            </div>

            {/* Completion Button */}
            <div className="w-full shrink-0 lg:w-auto">
              <Button
                onClick={
                  completed ? handleInCompleteCourse : handleCompleteCourse
                }
                disabled={isCourseActionLoading}
                size="lg"
                className={`w-full gap-2 rounded-xl px-6 shadow-sm transition-all sm:w-auto ${
                  completed
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700"
                }`}
              >
                {isCourseActionLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : completed ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <Trophy className="h-4 w-4" />
                )}

                {isCourseActionLoading
                  ? "Updating..."
                  : completed
                    ? "Completed"
                    : "Mark as Completed"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-6 px-4 sm:gap-8 lg:grid-cols-3">
        {/* Video Player */}
        <section className="min-w-0 space-y-5 lg:col-span-2">
          <Card className="border-border/60 bg-card/80 overflow-hidden rounded-2xl shadow-sm sm:rounded-3xl">
            {/* Player */}
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              {activeLecture?.videoUrl ? (
                <ReactPlayer
                  key={activeLecture?._id}
                  src={activeLecture.videoUrl}
                  controls
                  width="100%"
                  height="100%"
                  style={{
                    position: "absolute",
                    inset: 0,
                  }}
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 px-4 text-center text-white/70">
                  <Video className="h-10 w-10" />
                  <p className="text-sm">Video is currently unavailable.</p>
                </div>
              )}
            </div>

            {/* Active Lecture Details */}
            <CardContent className="p-4 sm:p-6">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge className="border border-indigo-500/20 bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/10 dark:text-indigo-400">
                  <PlayCircle className="mr-1 h-3.5 w-3.5" />
                  Currently Watching
                </Badge>

                {activeLecture?._id &&
                  isLectureCompleted(activeLecture._id) && (
                    <Badge className="border border-green-500/20 bg-green-500/10 text-green-600 hover:bg-green-500/10 dark:text-green-400">
                      <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                      Completed
                    </Badge>
                  )}
              </div>

              <h2 className="text-lg font-bold tracking-tight break-words sm:text-2xl">
                {activeLecture?.lectureTitle || "Untitled Lecture"}
              </h2>

              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                Watch this lecture carefully and continue your learning journey.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Lecture Sidebar */}
        <aside className="min-w-0 lg:sticky lg:top-24">
          <Card className="border-border/60 bg-card/80 overflow-hidden rounded-2xl shadow-sm sm:rounded-3xl">
            <CardHeader className="space-y-3 p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-base font-bold sm:text-lg">
                    Course Lectures
                  </CardTitle>

                  <p className="text-muted-foreground mt-1 text-xs">
                    Select a lecture to start watching
                  </p>
                </div>

                <Badge
                  variant="secondary"
                  className="shrink-0 rounded-lg px-2.5 py-1"
                >
                  {lectures.length} Lectures
                </Badge>
              </div>

              <div className="text-muted-foreground flex items-center justify-between text-xs">
                <span>Course completion</span>
                <span className="text-foreground font-semibold tabular-nums">
                  {progressPercentage}%
                </span>
              </div>

              <Progress
                value={progressPercentage}
                className="h-1.5 bg-indigo-500/10"
              />
            </CardHeader>

            <Separator />

            <CardContent className="max-h-[460px] overflow-y-auto p-3 sm:max-h-[600px] sm:p-4">
              <div className="space-y-2">
                {lectures.map((lecture, index) => {
                  const isActive = lecture?._id === activeLecture?._id;
                  const isCompleted = isLectureCompleted(lecture?._id);

                  return (
                    <button
                      key={lecture?._id || index}
                      type="button"
                      onClick={() => handleSelectLecture(lecture)}
                      aria-current={isActive ? "true" : undefined}
                      aria-label={`Play lecture ${index + 1}: ${lecture?.lectureTitle || "Untitled Lecture"}`}
                      className={`group focus-visible:ring-offset-background w-full rounded-xl text-left transition-all duration-200 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none ${
                        isActive
                          ? "bg-indigo-500/10 ring-1 ring-indigo-500/30"
                          : "hover:bg-muted/70"
                      }`}
                    >
                      <div className="flex items-center gap-3 p-3">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                            isCompleted
                              ? "bg-green-500/10 text-green-600 dark:text-green-400"
                              : isActive
                                ? "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400"
                                : "bg-muted text-muted-foreground group-hover:text-indigo-500"
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            <PlayCircle className="h-5 w-5" />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-muted-foreground text-[11px] font-medium">
                            Lecture {index + 1}
                          </p>

                          <h4 className="mt-0.5 line-clamp-2 text-sm leading-snug font-medium break-words">
                            {lecture?.lectureTitle || "Untitled Lecture"}
                          </h4>
                        </div>

                        {isCompleted && (
                          <Badge className="shrink-0 border-0 bg-green-500/10 px-2 text-[10px] text-green-600 hover:bg-green-500/10 dark:text-green-400">
                            Done
                          </Badge>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <p className="text-muted-foreground mt-3 px-1 text-center text-xs sm:text-left">
            Your learning progress is saved as you select lectures.
          </p>
        </aside>
      </main>
    </div>
  );
};

// Loading Skeleton
const CourseProgressSkeleton = () => {
  return (
    <div className="bg-background min-h-screen overflow-hidden pt-16 pb-12 sm:pt-16">
      {/* Header Skeleton */}
      <div className="border-border/50 from-background to-background border-b bg-gradient-to-br via-indigo-100/20 dark:from-slate-950 dark:via-indigo-950/20 dark:to-slate-950">
        <div className="mx-auto max-w-7xl space-y-5 px-4 py-10">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-9 w-full max-w-lg sm:h-11" />
          <Skeleton className="h-4 w-full max-w-md" />

          <div className="max-w-lg space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-2.5 w-full rounded-full" />
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 pt-8 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Skeleton className="aspect-video w-full rounded-2xl sm:rounded-3xl" />

          <div className="space-y-3">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-8 w-full max-w-md" />
            <Skeleton className="h-4 w-full max-w-lg" />
          </div>
        </div>

        <div className="border-border/60 space-y-4 rounded-2xl border p-4 sm:rounded-3xl">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-3 w-full" />

          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center gap-3 py-2">
              <Skeleton className="h-9 w-9 shrink-0 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
