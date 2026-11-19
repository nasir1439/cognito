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

  const [createCourse, { data, isLoading, isSuccess }] =
    useCreateCourseMutation();

  const navigate = useNavigate();

  const getSelectedCategory = (value) => {
    setCategory(value);
  };

  const createCourseHandler = async () => {
    await createCourse({ courseTitle, category });
  };

  // Display toast when course is created
  useEffect(() => {
    if (isSuccess) {
      toast.message(data?.message || "Course Created");
      navigate("/admin/course");
    }
  }, [isSuccess, data, navigate]);

  return (
    <div className="relative min-w-0 flex-1 overflow-x-clip px-3 py-5 sm:px-4 sm:py-8 md:px-10">
      {/* Background Glow */}
      <div className="pointer-events-none absolute top-10 left-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

      {/* Main Card */}
      <div className="relative mx-auto w-full max-w-3xl min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-2xl sm:rounded-3xl sm:p-6 md:p-8">
        {/* Top Gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-violet-500/5" />

        {/* Header */}
        <div className="relative mb-7 flex min-w-0 items-start gap-3 sm:mb-8 sm:gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/20 sm:h-14 sm:w-14 sm:rounded-2xl">
            <BookOpenText className="text-white" size={24} />
          </div>

          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Create New Course
            </h1>

            <p className="text-muted-foreground mt-2 max-w-xl text-xs leading-relaxed sm:text-sm">
              Add some basic details to launch your next amazing learning
              experience on Cognito.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="relative space-y-6 sm:space-y-7">
          {/* Title */}
          <div className="space-y-2.5 sm:space-y-3">
            <Label className="text-sm font-semibold">Course Title</Label>

            <Input
              type="text"
              name="coursetitle"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              placeholder="Enter your course title..."
              className="h-11 rounded-xl border-white/10 bg-white/5 text-sm backdrop-blur-xl focus-visible:ring-2 focus-visible:ring-indigo-500 sm:h-12 sm:rounded-2xl sm:text-base"
            />
          </div>

          {/* Category */}
          <div className="space-y-2.5 sm:space-y-3">
            <Label className="text-sm font-semibold">Course Category</Label>

            <Select onValueChange={getSelectedCategory}>
              <SelectTrigger className="h-11 w-full rounded-xl border-white/10 bg-white/5 text-sm backdrop-blur-xl focus:ring-2 focus:ring-indigo-500 sm:h-12 sm:rounded-2xl sm:text-base">
                <SelectValue placeholder="Choose a category" />
              </SelectTrigger>

              <SelectContent className="bg-background/95 border-white/10 backdrop-blur-2xl">
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
          <div className="via-border h-px w-full bg-gradient-to-r from-transparent to-transparent" />

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/course")}
              className="h-11 w-full rounded-xl border-white/10 bg-white/5 px-6 text-sm backdrop-blur-xl hover:bg-white/10 sm:w-auto sm:rounded-2xl"
            >
              Cancel
            </Button>

            <Button
              disabled={isLoading}
              onClick={createCourseHandler}
              className="h-11 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-8 text-sm font-semibold text-white transition-all duration-300 hover:from-indigo-600 hover:to-violet-600 hover:shadow-lg hover:shadow-indigo-500/30 sm:w-auto sm:rounded-2xl"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Create Course
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
