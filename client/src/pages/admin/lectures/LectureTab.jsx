import React, { useEffect } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { Switch } from "@/components/ui/switch";

import { Video, Trash2, UploadCloud, Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";

import axios from "axios";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import {
  useEditLectureMutation,
  useGetLectureByIdQuery,
  useRemoveLectureMutation,
} from "@/features/api/courseApi";
import { useParams } from "react-router-dom";

const MEDIA_API = "http://localhost:8080/api/v1/media";
const LectureTab = () => {
  //   const isLoading = false;
  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);

  const params = useParams();
  const { courseId, lectureId } = params;
  const [editLecture, { data, isLoading, isSuccess, error }] =
    useEditLectureMutation();

  const { data: lectureData } = useGetLectureByIdQuery(lectureId);
  // console.log(lectureData);
  const lecture = lectureData?.lecture;

  useEffect(() => {
    if (lecture) {
      setLectureTitle(lecture.lectureTitle);

      setIsFree(lecture?.isPreviewFree ?? false);

      setUploadVideoInfo({
        videoUrl: lecture.videoUrl,
        publicId: lecture.publicId,
      });
    }
  }, [lecture]);

  const [
    removeLecture,
    {
      data: removeData,
      isLoading: removeLoading,
      isSuccess: removeSuccess,
      error: removeError,
    },
  ] = useRemoveLectureMutation();

  const removeLectureHandler = async () => {
    await removeLecture(lectureId);
  };
  const editLectureHandler = async () => {
    editLecture({
      lectureTitle,
      videoInfo: uploadVideoInfo,
      isPreviewFree: isFree,
      courseId,
      lectureId,
    });
  };

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          timeout: 600000,

          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });
        if (res.data.success) {
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
          setBtnDisable(false);
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Video Upload Failed");
      } finally {
        setMediaProgress(false);
        setUploadProgress(0);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
    }
    if (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  }, [isSuccess, error, data]);

  useEffect(() => {
    if (removeSuccess) {
      toast.success(removeData?.message || "Lecture Removed Successfully");
    }
    if (removeError) {
      toast.error(removeError?.data?.message || "Something Went Wrong");
    }
  }, [removeData, removeSuccess, removeError]);
  return (
    <div className="relative px-4 py-6">
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-0 top-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

      {/* Main Card */}
      <Card className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/10 shadow-2xl backdrop-blur-2xl">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-violet-500/5" />

        {/* Header */}
        <CardHeader className="relative flex flex-col gap-6 border-b border-white/10 px-8 py-7 lg:flex-row lg:items-center lg:justify-between">
          {/* Left */}
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/20">
              <Video className="text-white" size={26} />
            </div>

            {/* Text */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-400" />

                <span className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
                  Lecture Settings
                </span>
              </div>

              <CardTitle className="text-3xl font-bold tracking-tight">
                Edit Lecture
              </CardTitle>

              <CardDescription className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Update your lecture content, upload lesson videos, and control
                preview access for students.
              </CardDescription>
            </div>
          </div>

          {/* Delete Button */}
          <Button
            onClick={removeLectureHandler}
            disabled={removeLoading}
            className="rounded-2xl bg-red-500/90 px-6 text-white hover:bg-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {removeLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait...
              </>
            ) : (
              "Remove Lecture"
            )}
          </Button>
        </CardHeader>

        {/* Content */}
        <CardContent className="relative space-y-8 rounded-b-[30px] bg-transparent px-8 py-8">
          {/* Lecture Title */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Lecture Title</Label>

            <Input
              type="text"
              value={lectureTitle}
              onChange={(e) => setLectureTitle(e.target.value)}
              placeholder="Ex. Introduction to JavaScript"
              className="h-12 rounded-2xl border-white/10 bg-white/5 backdrop-blur-xl focus-visible:ring-2 focus-visible:ring-indigo-500"
            />
          </div>

          {/* Video Upload */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-sm font-semibold">
              <UploadCloud className="h-4 w-4 text-violet-400" />
              Upload Lecture Video
              <span className="text-red-400">*</span>
            </Label>

            <div className="rounded-2xl border border-white/10 bg-background/40 p-5 backdrop-blur-xl">
              <Input
                type="file"
                accept="video/*"
                onChange={fileChangeHandler}
                className="border-0 bg-transparent text-sm text-muted-foreground"
              />

              <p className="mt-3 text-xs text-muted-foreground">
                Supported formats: MP4, MOV, MKV
              </p>
            </div>
          </div>
          {/* Uploaded Video Preview */}
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
            {uploadVideoInfo?.videoUrl ? (
              <div className="flex items-center gap-4">
                {/* Video Thumbnail */}
                <video
                  src={uploadVideoInfo.videoUrl}
                  className="h-20 w-32 rounded-xl border border-white/10 object-cover"
                />

                {/* Video Info */}
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-white">
                    Lecture Video Uploaded
                  </h4>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Your lecture video is ready for preview.
                  </p>
                </div>

                {/* Preview Button */}
                <a
                  href={uploadVideoInfo.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-indigo-500 px-4 py-2 text-xs font-medium text-white transition hover:bg-indigo-600"
                >
                  Preview
                </a>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5">
                  <Video className="h-5 w-5 text-muted-foreground" />
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    No video uploaded
                  </p>

                  <p className="text-xs text-muted-foreground/70">
                    Upload a lecture video to continue.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Free Preview */}
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
            <div>
              <h3 className="text-sm font-semibold">Free Preview Access</h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Students can watch this lecture before purchasing the course.
              </p>
            </div>

            <Switch
              id="free-video"
              checked={!!isFree}
              onCheckedChange={setIsFree}
            />
          </div>

          {mediaProgress && (
            <div className="my-4">
              <Progress value={uploadProgress} />
              <p>{uploadProgress} %Uploaded</p>
            </div>
          )}
          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Footer Buttons */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              className="h-11 rounded-2xl border-white/10 bg-white/5 px-6 backdrop-blur-xl hover:bg-white/10"
            >
              Cancel
            </Button>

            <Button
              disabled={isLoading}
              onClick={editLectureHandler}
              className="h-11 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 px-8 font-semibold text-white transition-all duration-300 hover:from-indigo-600 hover:to-violet-600 hover:shadow-lg hover:shadow-indigo-500/30"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Lecture"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LectureTab;
