import BuyCourseButton from "@/components/BuyCourseButton";
import ReactPlayer from "react-player";
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
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { BadgeInfo, Lock, PlayCircle, Users, BookOpen } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const CourseDetails = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const { data, isLoading, isError } =
    useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading)
    return (
      <div className="mt-28 flex justify-center">
        <h1 className="text-lg font-medium text-muted-foreground">
          Loading course...
        </h1>
      </div>
    );

  if (isError)
    return (
      <div className="mt-28 flex justify-center">
        <h1 className="text-lg font-medium text-red-500">
          Failed to load course details
        </h1>
      </div>
    );

  const { course, purchased } = data;

  // console.log(course);
  const previewLecture = course?.lectures?.find(
    (lecture) => lecture?.isPreviewFree && lecture?.videoUrl,
  );
  const handleContinueCourse = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };

  return (
    <div className="min-h-screen mt-16 bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-indigo-100/30 to-background dark:from-slate-950 dark:via-indigo-950/30 dark:to-slate-950" />

        {/* Glow */}
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-8">
          <div className="max-w-3xl">
            <Badge className="rounded-full bg-indigo-500/10 px-4 py-1 text-indigo-500 hover:bg-indigo-500/10">
              {course?.category}
            </Badge>

            <h1 className="mt-5 text-3xl font-bold tracking-tight md:text-5xl">
              {course?.courseTitle}
            </h1>

            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              {course?.subTitle}
            </p>

            {/* Course Info */}
            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span>{course?.enrolledStudents?.length} Students</span>
              </div>

              <div className="flex items-center gap-2">
                <BookOpen size={16} />
                <span>{course?.lectures?.length} Lectures</span>
              </div>

              <div className="flex items-center gap-2">
                <BadgeInfo size={16} />
                <span>Updated {course?.createdAt?.split("T")[0]}</span>
              </div>
            </div>

            <p className="mt-5 text-sm text-muted-foreground">
              Created By{" "}
              <span className="font-semibold text-foreground">
                {course?.creator?.name}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 md:px-8 lg:grid-cols-3">
        {/* Left Side */}
        <div className="space-y-8 lg:col-span-2">
          {/* Description */}
          <Card className="rounded-3xl border border-border/50 bg-background/70 shadow-sm backdrop-blur">
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>

            <CardContent>
              <div
                className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground"
                dangerouslySetInnerHTML={{
                  __html: course?.description,
                }}
              />
            </CardContent>
          </Card>

          {/* Course Content */}
          <Card className="rounded-3xl border border-border/50 bg-background/70 shadow-sm backdrop-blur">
            <CardHeader>
              <CardTitle>Course Content</CardTitle>

              <CardDescription>
                {course?.lectures?.length} Lectures
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {course?.lectures?.map((lecture, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-2xl border border-border/50 bg-background/60 px-4 py-3 transition-all hover:bg-muted/40"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-indigo-500/10 p-2">
                      {lecture?.isPreviewFree ? (
                        <PlayCircle size={18} className="text-indigo-500" />
                      ) : (
                        <Lock size={18} className="text-muted-foreground" />
                      )}
                    </div>

                    <p className="text-sm font-medium md:text-base">
                      {lecture?.lectureTitle}
                    </p>
                  </div>

                  {lecture?.isPreviewFree && (
                    <Badge className="rounded-full bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/10">
                      Free Preview
                    </Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Side */}
        <div>
          <Card className="sticky top-24 overflow-hidden rounded-3xl border border-border/50 bg-background/80 shadow-xl backdrop-blur">
            {/* Video */}
            <div className="aspect-video overflow-hidden">
              <ReactPlayer
                width="100%"
                height="100%"
                src={previewLecture?.videoUrl}
                controls={true}
              />
            </div>

            <CardContent className="space-y-5 p-5">
              <div>
                <h2 className="line-clamp-1 text-lg font-semibold">
                  {previewLecture?.lectureTitle || "Course Preview"}
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Watch a preview lecture before purchasing.
                </p>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Course Price
                </span>

                <h1 className="text-2xl font-bold">₹{course?.coursePrice}</h1>
              </div>
            </CardContent>

            <CardFooter>
              {purchased ? (
                <Button
                  onClick={handleContinueCourse}
                  className="w-full rounded-2xl bg-green-500 hover:bg-green-600"
                >
                  Continue Course
                </Button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
