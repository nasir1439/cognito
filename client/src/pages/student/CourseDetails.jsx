import React from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";

import BuyCourseButton from "@/components/BuyCourseButton";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";

import {
  AlertCircle,
  ArrowRight,
  BadgeInfo,
  BookOpen,
  CheckCircle2,
  Clock,
  GraduationCap,
  Lock,
  PlayCircle,
  RefreshCw,
  ShieldCheck,
  Users,
  Video,
} from "lucide-react";

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, refetch } =
    useGetCourseDetailWithStatusQuery(courseId, {
      skip: !courseId,
    });

  if (isLoading) {
    return <CourseDetailsSkeleton />;
  }

  if (isError || !data?.course) {
    return (
      <section className="bg-background flex min-h-screen items-center justify-center px-4 pt-24 pb-12">
        <div className="border-border/60 bg-card/60 flex w-full max-w-md flex-col items-center rounded-2xl border px-6 py-12 text-center shadow-sm backdrop-blur-xl sm:rounded-3xl">
          <div className="bg-destructive/10 mb-5 flex h-16 w-16 items-center justify-center rounded-2xl">
            <AlertCircle className="text-destructive h-8 w-8" />
          </div>

          <h2 className="text-xl font-bold sm:text-2xl">
            Unable to Load Course
          </h2>

          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            Something went wrong while loading the course details. Please try
            again.
          </p>

          <Button onClick={() => refetch()} className="mt-6 rounded-xl">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </div>
      </section>
    );
  }

  const { course, purchased } = data;

  const lectures = course?.lectures || [];
  const enrolledStudents = course?.enrolledStudents || [];

  const previewLecture = lectures.find(
    (lecture) => lecture?.isPreviewFree && lecture?.videoUrl,
  );

  const handleContinueCourse = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };

  const formattedDate = course?.createdAt
    ? new Date(course.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <section className="bg-background relative min-h-screen overflow-hidden pt-20 pb-16 sm:pt-24 sm:pb-20">
      {/* Background */}
      <div className="from-background to-background pointer-events-none absolute inset-0 bg-gradient-to-b via-indigo-100/20 dark:from-slate-950 dark:via-indigo-950/20 dark:to-slate-950" />

      {/* Background Glow */}
      <div className="pointer-events-none absolute -top-20 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl sm:h-[450px] sm:w-[450px]" />

      {/* Hero Section */}
      <div className="border-border/50 relative border-b">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <div className="max-w-4xl">
            {/* Category */}
            {course?.category && (
              <Badge className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-600 hover:bg-indigo-500/10 dark:text-indigo-400">
                {course.category}
              </Badge>
            )}

            {/* Title */}
            <h1 className="text-foreground mt-4 max-w-4xl text-2xl leading-tight font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
              {course?.courseTitle || "Untitled Course"}
            </h1>

            {/* Subtitle */}
            {course?.subTitle && (
              <p className="text-muted-foreground mt-4 max-w-3xl text-sm leading-relaxed sm:text-base md:text-lg">
                {course.subTitle}
              </p>
            )}

            {/* Course Stats */}
            <div className="text-muted-foreground mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs sm:gap-x-7 sm:text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 shrink-0 text-indigo-500" />
                <span>
                  {enrolledStudents.length}{" "}
                  {enrolledStudents.length === 1 ? "Student" : "Students"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 shrink-0 text-indigo-500" />
                <span>
                  {lectures.length}{" "}
                  {lectures.length === 1 ? "Lecture" : "Lectures"}
                </span>
              </div>

              {formattedDate && (
                <div className="flex items-center gap-2">
                  <BadgeInfo className="h-4 w-4 shrink-0 text-indigo-500" />
                  <span>Updated {formattedDate}</span>
                </div>
              )}
            </div>

            {/* Instructor */}
            <div className="mt-6 flex items-center gap-2 text-sm">
              <GraduationCap className="h-4 w-4 shrink-0 text-indigo-500" />
              <span className="text-muted-foreground">Created by</span>
              <span className="text-foreground font-semibold">
                {course?.creator?.name || "Instructor"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-6 px-4 py-7 sm:px-6 sm:py-10 lg:grid-cols-3 lg:gap-8 lg:px-8">
        {/* Course Preview & Purchase Card */}
        <aside className="order-first min-w-0 lg:sticky lg:top-24 lg:order-last lg:col-span-1">
          <Card className="border-border/60 bg-card/80 overflow-hidden rounded-2xl border shadow-lg shadow-indigo-500/5 backdrop-blur-xl sm:rounded-3xl">
            {/* Preview Video */}
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              {previewLecture?.videoUrl ? (
                <ReactPlayer
                  width="100%"
                  height="100%"
                  src={previewLecture.videoUrl}
                  controls
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 px-5 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                    <Video className="h-7 w-7 text-white/70" />
                  </div>

                  <p className="text-sm font-medium text-white/80">
                    No preview available
                  </p>
                </div>
              )}
            </div>

            <CardContent className="space-y-5 p-4 sm:p-5">
              {/* Preview Information */}
              <div>
                <div className="flex items-center gap-2">
                  <PlayCircle className="h-4 w-4 shrink-0 text-indigo-500" />

                  <h2 className="line-clamp-2 text-base font-semibold sm:text-lg">
                    {previewLecture?.lectureTitle || "Course Preview"}
                  </h2>
                </div>

                <p className="text-muted-foreground mt-2 text-xs leading-relaxed sm:text-sm">
                  Watch a preview lecture and explore what this course offers.
                </p>
              </div>

              <Separator />

              {/* Price */}
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-muted-foreground text-xs sm:text-sm">
                    Course Price
                  </p>

                  <h3 className="text-foreground mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                    ₹{course?.coursePrice ?? "N/A"}
                  </h3>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <BookOpen className="h-5 w-5" />
                </div>
              </div>

              {/* Course Benefits */}
              <div className="space-y-3">
                <div className="text-muted-foreground flex items-center gap-2 text-xs sm:text-sm">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-indigo-500" />
                  Access to course lectures
                </div>

                <div className="text-muted-foreground flex items-center gap-2 text-xs sm:text-sm">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-indigo-500" />
                  Learn at your own pace
                </div>

                <div className="text-muted-foreground flex items-center gap-2 text-xs sm:text-sm">
                  <Lock className="h-4 w-4 shrink-0 text-indigo-500" />
                  Secure course access
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 sm:p-5 sm:pt-0">
              {purchased ? (
                <Button
                  onClick={handleContinueCourse}
                  className="h-11 w-full rounded-xl bg-green-600 font-semibold text-white shadow-sm transition-colors hover:bg-green-700"
                >
                  Continue Course
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <div className="w-full [&>button]:w-full">
                  <BuyCourseButton courseId={courseId} />
                </div>
              )}
            </CardFooter>
          </Card>
        </aside>

        {/* Left Content */}
        <div className="min-w-0 space-y-6 lg:col-span-2 lg:space-y-8">
          {/* Description */}
          <Card className="border-border/60 bg-card/70 overflow-hidden rounded-2xl border shadow-sm backdrop-blur-xl sm:rounded-3xl">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <BookOpen className="h-4 w-4" />
                </div>

                <div>
                  <CardTitle className="text-lg sm:text-xl">
                    About This Course
                  </CardTitle>

                  <CardDescription className="mt-1 text-xs sm:text-sm">
                    Everything you need to know before enrolling
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <Separator />

            <CardContent className="p-4 sm:p-6">
              {course?.description ? (
                <div
                  className="prose prose-sm text-muted-foreground dark:prose-invert prose-img:max-w-full prose-pre:max-w-full prose-pre:overflow-x-auto prose-table:block prose-table:max-w-full prose-table:overflow-x-auto max-w-none leading-relaxed break-words"
                  dangerouslySetInnerHTML={{
                    __html: course.description,
                  }}
                />
              ) : (
                <p className="text-muted-foreground text-sm">
                  No course description available.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Course Content */}
          <Card className="border-border/60 bg-card/70 overflow-hidden rounded-2xl border shadow-sm backdrop-blur-xl sm:rounded-3xl">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle className="text-lg sm:text-xl">
                    Course Curriculum
                  </CardTitle>

                  <CardDescription className="mt-1 text-xs sm:text-sm">
                    Explore the lectures included in this course
                  </CardDescription>
                </div>

                <Badge
                  variant="secondary"
                  className="w-fit rounded-full px-3 py-1 text-xs"
                >
                  {lectures.length}{" "}
                  {lectures.length === 1 ? "Lecture" : "Lectures"}
                </Badge>
              </div>
            </CardHeader>

            <Separator />

            <CardContent className="space-y-2 p-3 sm:space-y-3 sm:p-5">
              {lectures.length > 0 ? (
                lectures.map((lecture, index) => (
                  <div
                    key={lecture?._id || index}
                    className="border-border/50 bg-background/50 hover:bg-muted/40 flex min-w-0 items-center justify-between gap-3 rounded-xl border p-3 transition-colors sm:rounded-2xl sm:p-4"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                          lecture?.isPreviewFree
                            ? "bg-indigo-500/10 text-indigo-500"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {lecture?.isPreviewFree ? (
                          <PlayCircle className="h-4 w-4" />
                        ) : (
                          <Lock className="h-4 w-4" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="text-foreground text-sm leading-relaxed font-medium break-words sm:text-base">
                          {lecture?.lectureTitle || `Lecture ${index + 1}`}
                        </p>

                        <p className="text-muted-foreground mt-0.5 text-[11px] sm:text-xs">
                          Lecture {index + 1}
                        </p>
                      </div>
                    </div>

                    {lecture?.isPreviewFree && (
                      <Badge className="shrink-0 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-1 text-[10px] font-medium text-indigo-600 hover:bg-indigo-500/10 sm:text-xs dark:text-indigo-400">
                        Free Preview
                      </Badge>
                    )}
                  </div>
                ))
              ) : (
                <div className="border-border/70 flex flex-col items-center justify-center rounded-2xl border border-dashed px-5 py-10 text-center">
                  <BookOpen className="text-muted-foreground/50 mb-3 h-8 w-8" />

                  <p className="text-sm font-medium">
                    No lectures available yet
                  </p>

                  <p className="text-muted-foreground mt-1 text-xs">
                    Course content will appear here once published.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

/* Loading Skeleton */
const CourseDetailsSkeleton = () => {
  return (
    <section className="bg-background relative min-h-screen overflow-hidden pt-20 pb-16 sm:pt-24 sm:pb-20">
      {/* Background */}
      <div className="from-background to-background pointer-events-none absolute inset-0 bg-gradient-to-b via-indigo-100/20 dark:from-slate-950 dark:via-indigo-950/20 dark:to-slate-950" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Skeleton */}
        <div className="border-border/50 space-y-4 border-b py-10 sm:py-14">
          <Skeleton className="h-7 w-28 rounded-full" />
          <Skeleton className="h-9 w-full max-w-2xl sm:h-12" />
          <Skeleton className="h-4 w-full max-w-xl sm:h-5" />
          <Skeleton className="h-4 w-64 max-w-full" />

          <div className="flex flex-wrap gap-4 pt-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>

        {/* Main Skeleton */}
        <div className="grid grid-cols-1 items-start gap-6 py-8 lg:grid-cols-3 lg:gap-8">
          {/* Preview Card */}
          <div className="border-border/60 order-first overflow-hidden rounded-2xl border lg:order-last">
            <Skeleton className="aspect-video w-full rounded-none" />

            <div className="space-y-5 p-4 sm:p-5">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-px w-full" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-11 w-full rounded-xl" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6 lg:col-span-2">
            <div className="border-border/60 space-y-4 rounded-2xl border p-5 sm:p-6">
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-full" />
            </div>

            <div className="border-border/60 space-y-4 rounded-2xl border p-5 sm:p-6">
              <Skeleton className="h-7 w-52" />

              {[1, 2, 3, 4].map((item) => (
                <Skeleton key={item} className="h-16 w-full rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;
