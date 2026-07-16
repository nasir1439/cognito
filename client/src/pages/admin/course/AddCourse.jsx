import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, BookOpenText, Loader2 } from "lucide-react";
import { useCreateCourseMutation } from "../../../features/api/courseApi";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");

  const [category, setCategory] = useState("");

  const [createCourse, { data, isLoading, error, isSuccess }] =
    useCreateCourseMutation();

  const navigate = useNavigate();

  const getSelectedCategory = (value) => {
    // alert(value);
    setCategory(value);
  };

  const createCourseHandler = async () => {
    // console.log(courseTitle, category);
    await createCourse({ courseTitle, category });
  };

  // for displaying the toast when course is created
  useEffect(() => {
    if (isSuccess) {
      toast.message(data.message || "Course Created");
      navigate("/admin/course");
    }
  }, [isSuccess, error]);

  return (
    <div className="relative flex-1 overflow-hidden px-4 py-8 md:px-10">
      {/* Background Glow */}
      <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

      {/* Main Card */}
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-2xl">
        {/* Top Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-violet-500/5" />

        {/* Header */}
        <div className="relative mb-8 flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/20">
            <BookOpenText className="text-white" size={28} />
          </div>

          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Create New Course
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Add some basic details to launch your next amazing learning
              experience on Cognito.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="relative space-y-7">
          {/* Title */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Course Title</Label>

            <Input
              type="text"
              name="coursetitle"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              placeholder="Enter your course title..."
              className="h-12 rounded-2xl border-white/10 bg-white/5 backdrop-blur-xl focus-visible:ring-2 focus-visible:ring-indigo-500"
            />
          </div>

          {/* Category */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Course Category</Label>

            <Select onValueChange={getSelectedCategory}>
              <SelectTrigger className="h-12 w-full rounded-2xl border-white/10 bg-white/5 backdrop-blur-xl focus:ring-2 focus:ring-indigo-500">
                <SelectValue placeholder="Choose a category" />
              </SelectTrigger>

              <SelectContent className="border-white/10 bg-background/95 backdrop-blur-2xl">
                <SelectGroup>
                  <SelectLabel>Select Course Category</SelectLabel>

                  <SelectItem value="nextjs">Next JS</SelectItem>

                  <SelectItem value="datascience">Data Science</SelectItem>

                  <SelectItem value="frontend">FrontEnd Development</SelectItem>

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

          {/* Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/course")}
              className="h-11 rounded-2xl border-white/10 bg-white/5 px-6 backdrop-blur-xl hover:bg-white/10"
            >
              Cancel
            </Button>

            <Button
              disabled={isLoading}
              onClick={createCourseHandler}
              className="h-11 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 px-8 font-semibold text-white transition-all duration-300 hover:from-indigo-600 hover:to-violet-600 hover:shadow-lg hover:shadow-indigo-500/30"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>
                </>
              ) : (
                "Create Course"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
