import React, { useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Loader2,
  BookOpen,
  Layers3,
  IndianRupee,
  ImagePlus,
  Sparkles,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseMutation,
} from "../../../features/api/courseApi";

import { toast } from "sonner";
import PageLoader from "../../../components/PageLoader";
import RichTextEditor from "../../../components/RichTextEditor";

// Parent-level data fetching
const CourseTab = () => {
  const { courseId } = useParams();

  const {
    data: courseByIdData,
    isLoading,
    isError,
    error,
  } = useGetCourseByIdQuery(courseId, {
    skip: !courseId,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <PageLoader />;

  if (isError) {
    return (
      <div className="relative rounded-2xl border border-red-500/20 bg-red-500/5 p-5 text-sm text-red-400 sm:p-8">
        {error?.data?.message || "Unable to load course information."}
      </div>
    );
  }

  const course = courseByIdData?.course;

  if (!course) {
    return (
      <div className="text-muted-foreground rounded-2xl border border-white/10 bg-white/5 p-5 text-center text-sm sm:p-8">
        Course not found.
      </div>
    );
  }

  return <CourseEditor key={course._id} course={course} />;
};

// Form and course editing
const CourseEditor = ({ course }) => {
  const navigate = useNavigate();

  const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();

  const [publishCourse, { isLoading: isPublishing }] =
    usePublishCourseMutation();

  const [input, setInput] = useState(() => ({
    courseTitle: course.courseTitle || "",
    subTitle: course.subTitle || "",
    description: course.description || "",
    category: course.category || "",
    courseLevel: course.courseLevel || "",
    coursePrice: course.coursePrice ?? "",
    courseThumbnail: "",
  }));

  const [previewThumbnail, setPreviewThumbnail] = useState("");

  // Form input handler
  const changeEventHandler = (e) => {
    const { name, value } = e.target;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Category handler
  const selectCategory = (value) => {
    setInput((prev) => ({
      ...prev,
      category: value,
    }));
  };

  // Course level handler
  const selectCourseLevel = (value) => {
    setInput((prev) => ({
      ...prev,
      courseLevel: value,
    }));
  };

  // Thumbnail handler
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setInput((prev) => ({
      ...prev,
      courseThumbnail: file,
    }));

    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      setPreviewThumbnail(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  };

  // Update course
  const updateInputHandler = async () => {
    const formData = new FormData();

    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);

    if (input.courseThumbnail) {
      formData.append("courseThumbnail", input.courseThumbnail);
    }

    try {
      await editCourse({
        formData,
        courseId: course._id,
      }).unwrap();

      toast.success("Course updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update course");
    }
  };

  // Publish / Unpublish course
  const publishStatusHandler = async () => {
    const action = course.isPublished ? "false" : "true";

    try {
      const response = await publishCourse({
        courseId: course._id,
        query: action,
      }).unwrap();

      toast.success(response?.message || "Course status updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update course status");
    }
  };

  // Success and error notifications
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course updated successfully");
    }

    if (error) {
      toast.error(error?.data?.message || "Course update failed");
    }
  }, [isSuccess, error, data]);

  return (
    <div className="relative isolate w-full min-w-0">
      {/* Background Glows */}
      <div className="pointer-events-none absolute top-10 -left-8 -z-10 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="pointer-events-none absolute right-0 -bottom-8 -z-10 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />

      {/* Main Course Card */}
      <Card className="relative isolate w-full min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-xl shadow-black/5 backdrop-blur-2xl sm:rounded-3xl">
        {/* Card Gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-violet-500/5" />

        {/* Header */}
        <CardHeader className="relative z-10 flex flex-col gap-5 border-b border-white/10 p-4 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
          <div className="flex min-w-0 items-start gap-3 sm:gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/20 sm:h-14 sm:w-14 sm:rounded-2xl">
              <BookOpen className="h-5 w-5 text-white sm:h-6 sm:w-6" />
            </div>

            <div className="min-w-0">
              <CardTitle className="text-xl font-extrabold tracking-tight sm:text-2xl">
                Course Information
              </CardTitle>

              <CardDescription className="text-muted-foreground mt-2 max-w-2xl text-xs leading-relaxed sm:text-sm">
                Customize your course details, optimize the learning experience,
                and make your course stand out on Cognito.
              </CardDescription>
            </div>
          </div>

          {/* Actions */}
          <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto lg:shrink-0">
            <Button
              disabled={isPublishing || (course.lectures?.length ?? 0) === 0}
              onClick={publishStatusHandler}
              variant="outline"
              className="h-10 w-full rounded-xl border-white/10 bg-white/5 px-5 text-sm backdrop-blur-xl hover:bg-white/10 sm:w-auto sm:rounded-2xl"
            >
              {isPublishing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}

              {course.isPublished ? "Unpublish" : "Publish"}
            </Button>

            <Button
              type="button"
              className="h-10 w-full rounded-xl border border-transparent bg-red-600 px-5 text-sm font-medium text-white shadow-sm hover:bg-red-700 sm:w-auto sm:rounded-2xl"
              title="Course deletion is not connected yet"
            >
              Remove Course
            </Button>
          </div>
        </CardHeader>

        {/* Form Content */}
        <CardContent className="relative z-10 space-y-6 p-4 sm:space-y-8 sm:p-6 lg:p-8">
          {/* Course Title */}
          <div className="min-w-0 space-y-2.5">
            <Label className="text-sm font-semibold">Course Title</Label>

            <Input
              type="text"
              name="courseTitle"
              value={input.courseTitle}
              onChange={changeEventHandler}
              placeholder="Ex. FullStack Developer"
              className="h-11 rounded-xl border-white/10 bg-white/5 text-sm backdrop-blur-xl focus-visible:ring-2 focus-visible:ring-indigo-500 sm:h-12 sm:rounded-2xl sm:text-base"
            />
          </div>

          {/* Course Subtitle */}
          <div className="min-w-0 space-y-2.5">
            <Label className="text-sm font-semibold">Course Subtitle</Label>

            <Input
              type="text"
              name="subTitle"
              value={input.subTitle}
              onChange={changeEventHandler}
              placeholder="Become a FullStack developer from zero to hero"
              className="h-11 rounded-xl border-white/10 bg-white/5 text-sm backdrop-blur-xl focus-visible:ring-2 focus-visible:ring-indigo-500 sm:h-12 sm:rounded-2xl sm:text-base"
            />
          </div>

          {/* Description */}
          <div className="min-w-0 space-y-2.5">
            <Label className="text-sm font-semibold">Course Description</Label>

            <div className="w-full min-w-0">
              <RichTextEditor input={input} setInput={setInput} />
            </div>
          </div>

          {/* Course Details Grid */}
          <div className="grid min-w-0 grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
            {/* Category */}
            <div className="min-w-0 space-y-2.5">
              <Label className="flex items-center gap-2 text-sm font-semibold">
                <Layers3 className="h-4 w-4 shrink-0 text-indigo-400" />
                Category
              </Label>

              <Select value={input.category} onValueChange={selectCategory}>
                <SelectTrigger className="h-11 w-full rounded-xl border-white/10 bg-white/5 text-sm backdrop-blur-xl focus:ring-2 focus:ring-indigo-500 sm:h-12 sm:rounded-2xl sm:text-base">
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>

                <SelectContent className="bg-background/95 border-white/10 backdrop-blur-2xl">
                  <SelectGroup>
                    <SelectLabel>Select Course Category</SelectLabel>

                    <SelectItem value="nextjs">Next JS</SelectItem>
                    <SelectItem value="datascience">Data Science</SelectItem>
                    <SelectItem value="frontend">
                      FrontEnd Development
                    </SelectItem>
                    <SelectItem value="fullstack">
                      FullStack Development
                    </SelectItem>
                    <SelectItem value="mern">MERN Stack Development</SelectItem>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="mongodb">Mongo DB</SelectItem>
                    <SelectItem value="c">C</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="react">React JS</SelectItem>
                    <SelectItem value="node">Node JS</SelectItem>
                    <SelectItem value="typescript">TypeScript</SelectItem>
                    <SelectItem value="HTML">HTML</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Course Level */}
            <div className="min-w-0 space-y-2.5">
              <Label className="flex items-center gap-2 text-sm font-semibold">
                <Sparkles className="h-4 w-4 shrink-0 text-violet-400" />
                Course Level
              </Label>

              <Select
                value={input.courseLevel}
                onValueChange={selectCourseLevel}
              >
                <SelectTrigger className="h-11 w-full rounded-xl border-white/10 bg-white/5 text-sm backdrop-blur-xl focus:ring-2 focus:ring-indigo-500 sm:h-12 sm:rounded-2xl sm:text-base">
                  <SelectValue placeholder="Select course level" />
                </SelectTrigger>

                <SelectContent className="bg-background/95 border-white/10 backdrop-blur-2xl">
                  <SelectGroup>
                    <SelectLabel>Select Course Level</SelectLabel>

                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Price */}
            <div className="min-w-0 space-y-2.5">
              <Label className="flex items-center gap-2 text-sm font-semibold">
                <IndianRupee className="h-4 w-4 shrink-0 text-green-400" />
                Price (INR)
              </Label>

              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeEventHandler}
                placeholder="199"
                min="0"
                className="h-11 rounded-xl border-white/10 bg-white/5 text-sm backdrop-blur-xl focus-visible:ring-2 focus-visible:ring-indigo-500 sm:h-12 sm:rounded-2xl sm:text-base"
              />
            </div>

            {/* Thumbnail */}
            <div className="min-w-0 space-y-2.5">
              <Label className="flex items-center gap-2 text-sm font-semibold">
                <ImagePlus className="h-4 w-4 shrink-0 text-pink-400" />
                Course Thumbnail
              </Label>

              <Input
                type="file"
                accept="image/*"
                onChange={selectThumbnail}
                className="text-muted-foreground h-11 w-full rounded-xl border-white/10 bg-white/5 text-xs backdrop-blur-xl file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-500/10 file:px-2 file:py-1 file:text-xs file:font-medium file:text-indigo-400 sm:h-12 sm:rounded-2xl sm:text-sm"
              />

              {previewThumbnail && (
                <img
                  src={previewThumbnail}
                  alt="Course thumbnail preview"
                  className="mt-3 aspect-video w-full max-w-sm rounded-xl border border-white/10 object-cover sm:rounded-2xl"
                />
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="via-border h-px w-full bg-gradient-to-r from-transparent to-transparent" />

          {/* Footer Actions */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/course")}
              className="h-11 w-full rounded-xl border-white/10 bg-white/5 px-6 text-sm backdrop-blur-xl hover:bg-white/10 sm:w-auto sm:rounded-2xl"
            >
              Cancel
            </Button>

            <Button
              type="button"
              disabled={isLoading}
              onClick={updateInputHandler}
              className="h-11 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-8 text-sm font-semibold text-white transition-all duration-300 hover:from-indigo-600 hover:to-violet-600 hover:shadow-lg hover:shadow-indigo-500/30 sm:w-auto sm:rounded-2xl"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseTab;
