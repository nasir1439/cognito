import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";

import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, BookOpenText, Loader2 } from "lucide-react";
import {
  useCreateLectureMutation,
  useGetCourseLecturesQuery,
} from "../../../features/api/courseApi";
import { toast } from "sonner";
import ErrorPage from "../../../components/ErrorPage";
import PageLoader from "../../../components/PageLoader";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const navigate = useNavigate();
  const [lectureTitle, setLectureTitle] = useState("");
  const params = useParams();
  const courseId = params.courseId;

  const {
    data: lecturesData,
    isLoading: lectureLoading,
    isError: lectureError,
    refetch,
  } = useGetCourseLecturesQuery(courseId);
  // console.log(lecturesData);

  const [createLecture, { data, isLoading, isSuccess, error }] =
    useCreateLectureMutation();

  const createLectureHandler = async () => {
    await createLecture({ courseId, lectureTitle });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      refetch();
    }
    if (error) {
      toast.error(error?.data?.message || "Something Went Wrong");
    }
  }, [isSuccess, error, data, refetch]);
  return (
    <div className="relative space-y-7 mt-6">
      <div className="relative mb-8 flex items-start gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/20">
          <BookOpenText className="text-white" size={28} />
        </div>

        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Create New Lectures
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Add Your Course Lectures.
          </p>
        </div>
      </div>
      {/* Title */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Course Title</Label>

        <Input
          type="text"
          name="coursetitle"
          value={lectureTitle}
          onChange={(e) => setLectureTitle(e.target.value)}
          placeholder="Enter your course title..."
          className="h-12 rounded-2xl border-white/10 bg-white/5 backdrop-blur-xl focus-visible:ring-2 focus-visible:ring-indigo-500"
        />
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Buttons */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          variant="outline"
          onClick={() => navigate(`/admin/course/${courseId}`)}
          className="h-11 rounded-2xl border-white/10 bg-white/5 px-6 backdrop-blur-xl hover:bg-white/10"
        >
          Back To course
        </Button>

        <Button
          onClick={createLectureHandler}
          disabled={isLoading}
          className="h-11 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 px-8 font-semibold text-white transition-all duration-300 hover:from-indigo-600 hover:to-violet-600 hover:shadow-lg hover:shadow-indigo-500/30"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>
            </>
          ) : (
            "Create Lecture"
          )}
        </Button>
      </div>

      <div className="mt-10">
        {lectureLoading ? (
          <PageLoader />
        ) : lectureError ? (
          <p className="text-center text-red-500 font-medium text-lg mt-10">
            Failed to load lectures. Please try again.
          </p>
        ) : lecturesData?.lectures?.length === 0 ? (
          <p className="text-center text-gray-400 font-medium text-base mt-6">
            No lectures available yet.
          </p>
        ) : (
          lecturesData.lectures.map((lecture, index) => (
            <Lecture
              key={lecture._id}
              lecture={lecture}
              courseId={courseId}
              index={index}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CreateLecture;
