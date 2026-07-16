import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";

import {
  CheckCircle,
  CheckCircle2,
  PlayCircle,
  BookOpen,
  Trophy,
} from "lucide-react";

import { toast } from "sonner";

const CourseProgress = () => {
  const { courseId } = useParams();

  const { data, isLoading, isError, refetch } =
    useGetCourseProgressQuery(courseId);
  const [updateLectureProgress] = useUpdateLectureProgressMutation();

  const [
    completeCourse,
    { data: markCompleteData, isSuccess: completedSuccess },
  ] = useCompleteCourseMutation();

  const [
    inCompleteCourse,
    { data: markInCompleteData, isSuccess: inCompletedSuccess },
  ] = useInCompleteCourseMutation();

  const [currentLecture, setCurrentLecture] = useState(null);

  useEffect(() => {
    if (completedSuccess) {
      toast.success(markCompleteData?.message);
      refetch();
    }

    if (inCompletedSuccess) {
      toast.success(markInCompleteData?.message);
      refetch();
    }
  }, [
    completedSuccess,
    inCompletedSuccess,
    markCompleteData,
    markInCompleteData,
    refetch,
  ]);

  if (isLoading) {
    return (
      <div className="mt-28 flex justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-28 flex justify-center">
        <h1 className="text-lg font-medium text-red-500">
          Failed to load course progress
        </h1>
      </div>
    );
  }

  const { courseDetails, progress, completed } = data.data;

  if (!courseDetails?.lectures?.length) {
    return (
      <div className="mx-auto mt-24 max-w-5xl px-4">
        <Card className="rounded-3xl">
          <CardContent className="py-16 text-center">
            <BookOpen className="mx-auto mb-4 h-14 w-14 text-muted-foreground" />
            <h2 className="text-2xl font-bold">No Lectures Available</h2>
            <p className="mt-2 text-muted-foreground">
              This course doesn't contain any lectures yet.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const activeLecture = currentLecture || courseDetails.lectures[0];

  const completedLectures = progress.filter((lecture) => lecture.viewed).length;
  const progressPercentage =
    courseDetails.lectures.length > 0
      ? Math.round((completedLectures / courseDetails.lectures.length) * 100)
      : 0;

  const isLectureCompleted = (lectureId) => {
    return progress.some(
      (prog) =>
        prog?.lectureId?.toString() === lectureId?.toString() && prog.viewed,
    );
  };

  const handleLectureProgress = async (lectureId) => {
    try {
      await updateLectureProgress({
        courseId,
        lectureId,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    handleLectureProgress(lecture._id);
  };

  const handleCompleteCourse = async () => {
    try {
      await completeCourse(courseId).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleInCompleteCourse = async () => {
    try {
      await inCompleteCourse(courseId).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-16 pb-10">
      <div className="relative overflow-hidden border-b mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-indigo-100/30 to-background dark:from-slate-950 dark:via-indigo-950/30 dark:to-slate-950" />
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Badge className="bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/10">
                {courseDetails.category}
              </Badge>
              <h1 className="mt-4 text-3xl font-bold md:text-4xl">
                {courseDetails.courseTitle}
              </h1>
              <p className="mt-3 text-muted-foreground">
                Continue your learning journey and complete the course.
              </p>

              <div className="mt-4 flex items-center gap-3 max-w-md">
                <Progress value={progressPercentage} className="h-2" />
                <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                  {progressPercentage}% Completed
                </span>
              </div>
            </div>

            <Button
              onClick={
                completed ? handleInCompleteCourse : handleCompleteCourse
              }
              size="lg"
              className={
                completed
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600"
              }
            >
              {completed ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Completed
                </>
              ) : (
                <>
                  <Trophy className="mr-2 h-4 w-4" />
                  Mark as Completed
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-3">
        {/* Single Video Player Section */}
        <div className="space-y-6 lg:col-span-2">
          <Card className="overflow-hidden rounded-3xl border-border/50 bg-background/70 backdrop-blur shadow-sm">
            <div className="aspect-video w-full bg-black rounded-t-3xl overflow-hidden">
              <ReactPlayer
                key={activeLecture?._id}
                src={activeLecture?.videoUrl}
                controls
                width="100%"
                height="100%"
                style={{
                  objectFit: "contain",
                }}
              />
            </div>

            <CardContent className="p-6">
              <Badge className="mb-4 bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/10">
                Lecture
              </Badge>
              <h2 className="text-2xl font-bold">
                {activeLecture?.lectureTitle}
              </h2>
              <p className="mt-2 text-muted-foreground">
                Watch this lecture carefully and continue your progress.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Lectures List */}
        <div>
          <Card className="sticky top-24 rounded-3xl border-border/50 bg-background/80 backdrop-blur-xl shadow-sm">
            <CardHeader>
              <CardTitle>Course Lectures</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="max-h-[600px] overflow-y-auto p-4">
              <div className="space-y-3">
                {courseDetails.lectures.map((lecture, index) => {
                  const isActive = lecture._id === activeLecture._id;

                  return (
                    <Card
                      key={lecture._id}
                      onClick={() => handleSelectLecture(lecture)}
                      className={`cursor-pointer rounded-2xl transition-all duration-300 hover:shadow-md ${
                        isActive
                          ? "border-indigo-500 bg-indigo-500/10 shadow-sm"
                          : "border-transparent"
                      }`}
                    >
                      <CardContent className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                          {isLectureCompleted(lecture._id) ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                          ) : (
                            <PlayCircle
                              className={`h-5 w-5 shrink-0 ${isActive ? "text-indigo-600" : "text-indigo-500"}`}
                            />
                          )}

                          <div>
                            <p className="text-xs text-muted-foreground">
                              Lecture {index + 1}
                            </p>
                            <h4 className="line-clamp-1 text-sm font-medium">
                              {lecture.lectureTitle}
                            </h4>
                          </div>
                        </div>

                        {isLectureCompleted(lecture._id) && (
                          <Badge className="bg-green-500 text-white hover:bg-green-500 pointer-events-none">
                            Done
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
