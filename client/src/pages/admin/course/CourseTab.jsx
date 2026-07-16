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

import RichTextEditor from "../../../components/RichTextEditor";

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
  Sparkles,
  BookOpen,
  Layers3,
  IndianRupee,
  ImagePlus,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseMutation,
} from "../../../features/api/courseApi";
import { toast } from "sonner";
import PageLoader from "../../../components/PageLoader";

const CourseTab = () => {
  const navigate = useNavigate();
  const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();

  const params = useParams();

  // console.log(params.courseId);

  const courseId = params.courseId;

  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });

  const {
    data: courseByIdData,
    isLoading: courseByIdLoading,
    refetch,
  } = useGetCourseByIdQuery(courseId, { refetchOnMountOrArgChange: true });

  const [publishCourse] = usePublishCourseMutation();

  useEffect(() => {
    if (courseByIdData?.course) {
      const course = courseByIdData?.course;
      setInput({
        courseTitle: course.courseTitle,
        subTitle: course.subTitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: course.coursePrice,
        courseThumbnail: "",
      });
    }
  }, [courseByIdData]);

  const [previewThumbnail, setPreviewThumbnail] = useState("");

  const changeEventHandler = (e) => {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };

  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };
  // get file
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateInputHanlder = async () => {
    // console.log(input);
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);
    await editCourse({ formData, courseId });
  };

  const publishStatusHandler = async (action) => {
    try {
      const response = await publishCourse({
        courseId,
        query: action,
      }).unwrap();

      toast.success(response.message);
    } catch (error) {
      console.log(error);
      toast.error("Failed To Publish and Unpublish Course");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course Updated Successfully");
    }

    if (error) {
      toast.error(error?.data?.message || "Course Not Updated");
    }
  }, [isSuccess, error, data]);

  if (courseByIdLoading) return <PageLoader />;

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-8 md:px-8">
      {/* Background Glow */}
      <div className="absolute left-0 top-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

      {/* Main Container */}
      <div className="relative mx-auto max-w-6xl">
        <Card className="overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-2xl">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-violet-500/5" />

          {/* Header */}
          <CardHeader className="relative flex flex-col gap-6 border-b border-white/10 p-8 lg:flex-row lg:items-center lg:justify-between">
            {/* Left */}
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/30">
                <BookOpen className="text-white" size={30} />
              </div>

              <div>
                <CardTitle className="text-3xl font-extrabold tracking-tight">
                  Course Information
                </CardTitle>

                <CardDescription className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  Customize your course details, optimize learning experience,
                  and make your course stand out beautifully on Cognito.
                </CardDescription>
              </div>
            </div>

            {/* Right Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Button
                disabled={courseByIdData?.course.lectures.length === 0}
                onClick={() =>
                  publishStatusHandler(
                    courseByIdData?.course.isPublished ? "false" : "true",
                  )
                }
                variant="outline"
                className="rounded-2xl border-white/10 bg-white/5 px-6 backdrop-blur-xl hover:bg-white/10"
              >
                {courseByIdData?.course.isPublished ? "Unpublish" : "Publish"}
              </Button>

              <Button className="rounded-2xl bg-red-500/90 px-6 text-white hover:bg-red-600">
                Remove Course
              </Button>
            </div>
          </CardHeader>

          {/* Content */}
          <CardContent className="relative space-y-8 p-8">
            {/* Title */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Course Title</Label>

              <Input
                type="text"
                name="courseTitle"
                placeholder="Ex. FullStack Developer"
                value={input.courseTitle}
                onChange={changeEventHandler}
                className="h-12 rounded-2xl border-white/10 bg-white/5 backdrop-blur-xl focus-visible:ring-2 focus-visible:ring-indigo-500"
              />
            </div>

            {/* Subtitle */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Course Subtitle</Label>

              <Input
                type="text"
                name="subTitle"
                value={input.subTitle}
                onChange={changeEventHandler}
                placeholder="Ex. Become a FullStack developer from zero to hero"
                className="h-12 rounded-2xl border-white/10 bg-white/5 backdrop-blur-xl focus-visible:ring-2 focus-visible:ring-indigo-500"
              />
            </div>

            {/* Description */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">
                Course Description
              </Label>

              <RichTextEditor input={input} setInput={setInput} />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Category */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <Layers3 className="h-4 w-4 text-indigo-400" />
                  Category
                </Label>

                <Select value={input.category} onValueChange={selectCategory}>
                  <SelectTrigger className="h-12 rounded-2xl border-white/10 bg-white/5 backdrop-blur-xl focus:ring-2 focus:ring-indigo-500">
                    <SelectValue placeholder="Choose a category" />
                  </SelectTrigger>

                  <SelectContent className="border-white/10 bg-background/95 backdrop-blur-2xl">
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

                      <SelectItem value="mern">
                        MERN Stack Development
                      </SelectItem>

                      <SelectItem value="javascript">JavaScript</SelectItem>

                      <SelectItem value="python">Python</SelectItem>

                      <SelectItem value="mongodb">Mongo DB</SelectItem>

                      <SelectItem value="c">C</SelectItem>

                      <SelectItem value="cpp">C++</SelectItem>

                      <SelectItem value="java">Java</SelectItem>

                      <SelectItem value="react">React JS</SelectItem>

                      <SelectItem value="node">Node JS</SelectItem>

                      <SelectItem value="typescript">TypeScript</SelectItem>

                      <SelectItem value="html">HTML</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Course Level */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <Sparkles className="h-4 w-4 text-violet-400" />
                  Course Level
                </Label>

                <Select
                  value={input.courseLevel}
                  onValueChange={selectCourseLevel}
                >
                  <SelectTrigger className="h-12 rounded-2xl border-white/10 bg-white/5 backdrop-blur-xl focus:ring-2 focus:ring-indigo-500">
                    <SelectValue placeholder="Select course level" />
                  </SelectTrigger>

                  <SelectContent className="border-white/10 bg-background/95 backdrop-blur-2xl">
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
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <IndianRupee className="h-4 w-4 text-green-400" />
                  Price (INR)
                </Label>

                <Input
                  type="number"
                  name="coursePrice"
                  value={input.coursePrice}
                  onChange={changeEventHandler}
                  placeholder="199"
                  className="h-12 rounded-2xl border-white/10 bg-white/5 backdrop-blur-xl focus-visible:ring-2 focus-visible:ring-indigo-500"
                />
              </div>

              {/* Thumbnail */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <ImagePlus className="h-4 w-4 text-pink-400" />
                  Course Thumbnail
                </Label>

                <Input
                  onChange={selectThumbnail}
                  type="file"
                  accept="image/*"
                  className="rounded-2xl border-white/10 bg-white/5 text-gray-500"
                />
                {previewThumbnail && (
                  <img
                    src={previewThumbnail}
                    className="e-40 my-2"
                    alt="Course Thumbnail"
                  />
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

            {/* Footer Buttons */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                className="h-11 rounded-2xl border-white/10 bg-white/5 px-6 backdrop-blur-xl hover:bg-white/10"
                onClick={() => navigate("/admin/course")}
              >
                Cancel
              </Button>

              <Button
                disabled={isLoading}
                onClick={updateInputHanlder}
                className="h-11 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 px-8 font-semibold text-white transition-all duration-300 hover:from-indigo-600 hover:to-violet-600 hover:shadow-lg hover:shadow-indigo-500/30"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please Wait...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CourseTab;
