import React, { useState } from "react";
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
import {
  Video,
  Trash2,
  UploadCloud,
  Sparkles,
  Loader2,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import {
  useEditLectureMutation,
  useGetLectureByIdQuery,
  useRemoveLectureMutation,
} from "@/features/api/courseApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import PageLoader from "../../../components/PageLoader";

const MEDIA_API = `${import.meta.env.VITE_API_BASE_URL}/media`;

const LectureTab = () => {
  const { courseId, lectureId } = useParams();

  const {
    data: lectureData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetLectureByIdQuery(lectureId, {
    skip: !lectureId,
  });

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 px-4 py-10 text-center sm:rounded-3xl">
        <p className="text-sm font-medium text-red-400">
          {error?.data?.message || "Failed to load lecture details."}
        </p>

        <Button
          type="button"
          onClick={() => refetch()}
          className="mt-4 h-10 rounded-xl border border-white/10 bg-white/10 px-5 text-sm font-medium text-white hover:bg-white/15"
        >
          Try Again
        </Button>
      </div>
    );
  }

  const lecture = lectureData?.lecture;

  if (!lecture) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-10 text-center sm:rounded-3xl">
        <p className="text-muted-foreground text-sm">Lecture not found.</p>
      </div>
    );
  }

  return (
    <LectureEditor
      key={lecture._id}
      lecture={lecture}
      courseId={courseId}
      lectureId={lectureId}
    />
  );
};

const LectureEditor = ({ lecture, courseId, lectureId }) => {
  const navigate = useNavigate();

  // Initial form state comes directly from the fetched lecture.
  const [lectureTitle, setLectureTitle] = useState(lecture.lectureTitle || "");

  const [uploadVideoInfo, setUploadVideoInfo] = useState(() => ({
    videoUrl: lecture.videoUrl || "",
    publicId: lecture.publicId || "",
  }));

  const [isFree, setIsFree] = useState(lecture.isPreviewFree ?? false);

  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [editLecture, { isLoading }] = useEditLectureMutation();

  const [removeLecture, { isLoading: removeLoading }] =
    useRemoveLectureMutation();

  const isBusy = isLoading || removeLoading || mediaProgress;

  // Remove Lecture
  const removeLectureHandler = async () => {
    try {
      const response = await removeLecture(lectureId).unwrap();

      toast.success(response?.message || "Lecture removed successfully");

      navigate(`/admin/course/${courseId}/lecture`);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to remove lecture");
    }
  };

  // Update Lecture
  const editLectureHandler = async () => {
    const trimmedTitle = lectureTitle.trim();

    if (!trimmedTitle) {
      toast.error("Please enter a lecture title");
      return;
    }

    if (!uploadVideoInfo?.videoUrl) {
      toast.error("Please upload a lecture video");
      return;
    }

    try {
      const response = await editLecture({
        lectureTitle: trimmedTitle,
        videoInfo: uploadVideoInfo,
        isPreviewFree: isFree,
        courseId,
        lectureId,
      }).unwrap();

      toast.success(response?.message || "Lecture updated successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update lecture");
    }
  };

  // Video Upload
  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("video/")) {
      toast.error("Please select a valid video file");
      e.target.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setMediaProgress(true);
    setUploadProgress(0);

    try {
      const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
        timeout: 600000,
        onUploadProgress: ({ loaded, total }) => {
          if (total) {
            setUploadProgress(Math.round((loaded * 100) / total));
          }
        },
      });

      if (!res.data?.success || !res.data?.data?.url) {
        throw new Error(res.data?.message || "Video upload failed");
      }

      setUploadVideoInfo({
        videoUrl: res.data.data.url,
        publicId: res.data.data.public_id,
      });

      toast.success(res.data.message || "Video uploaded successfully");
    } catch (error) {
      console.error("Video upload error:", error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Video upload failed",
      );
    } finally {
      setMediaProgress(false);
      setUploadProgress(0);
      e.target.value = "";
    }
  };

  return (
    <div className="relative isolate w-full min-w-0 overflow-x-clip">
      {/* Background Glows */}
      <div className="pointer-events-none absolute top-10 left-0 -z-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 -z-10 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

      {/* Main Card */}
      <Card className="relative isolate w-full min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl shadow-black/5 backdrop-blur-2xl sm:rounded-3xl">
        {/* Gradient Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-violet-500/5" />

        {/* Header */}
        <CardHeader className="relative z-10 flex flex-col gap-4 border-b border-white/10 p-4 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
          <div className="flex min-w-0 items-start gap-3 sm:gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/20 sm:h-14 sm:w-14 sm:rounded-2xl">
              <Video className="h-5 w-5 text-white sm:h-7 sm:w-7" />
            </div>

            <div className="min-w-0">
              <div className="mb-2 flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-indigo-400 sm:h-4 sm:w-4" />

                <span className="text-xs font-semibold tracking-wide text-indigo-400 sm:text-sm">
                  LECTURE SETTINGS
                </span>
              </div>

              <CardTitle className="text-xl leading-tight font-extrabold tracking-tight sm:text-2xl">
                Edit Lecture
              </CardTitle>

              <CardDescription className="text-muted-foreground mt-2 max-w-2xl text-xs leading-relaxed sm:text-sm">
                Update your lecture content, upload lesson videos, and control
                preview access for students.
              </CardDescription>
            </div>
          </div>

          {/* Delete Button */}
          <Button
            type="button"
            onClick={removeLectureHandler}
            disabled={isBusy}
            className="h-10 w-full shrink-0 rounded-xl border border-transparent bg-red-600 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700 sm:w-auto sm:rounded-2xl"
          >
            {removeLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="mr-2 h-4 w-4" />
            )}

            {removeLoading ? "Removing..." : "Remove Lecture"}
          </Button>
        </CardHeader>

        {/* Content */}
        <CardContent className="relative z-10 min-w-0 space-y-6 p-4 sm:space-y-8 sm:p-6 lg:p-8">
          {/* Lecture Title */}
          <div className="min-w-0 space-y-2">
            <Label htmlFor="lectureTitle" className="text-sm font-semibold">
              Lecture Title
            </Label>

            <Input
              id="lectureTitle"
              type="text"
              value={lectureTitle}
              onChange={(e) => setLectureTitle(e.target.value)}
              placeholder="Ex. Introduction to JavaScript"
              maxLength={120}
              disabled={isBusy}
              className="bg-background/40 placeholder:text-muted-foreground/60 h-11 min-w-0 rounded-xl border-white/10 text-sm backdrop-blur-xl focus-visible:ring-2 focus-visible:ring-indigo-500 sm:h-12 sm:rounded-2xl"
            />

            <p className="text-muted-foreground text-right text-xs">
              {lectureTitle.length}/120 characters
            </p>
          </div>

          {/* Video Upload */}
          <div className="min-w-0 space-y-3">
            <Label
              htmlFor="lectureVideo"
              className="flex items-center gap-2 text-sm font-semibold"
            >
              <UploadCloud className="h-4 w-4 text-violet-400" />
              Upload Lecture Video
              <span className="text-red-400">*</span>
            </Label>

            <div className="bg-background/30 rounded-xl border border-white/10 p-3 backdrop-blur-xl sm:rounded-2xl sm:p-5">
              <Input
                id="lectureVideo"
                type="file"
                accept="video/*"
                onChange={fileChangeHandler}
                disabled={isBusy}
                className="text-muted-foreground h-auto min-w-0 cursor-pointer border-0 bg-transparent p-0 text-xs file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-500/15 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-indigo-400 hover:file:bg-indigo-500/25 sm:text-sm"
              />

              <p className="text-muted-foreground mt-3 text-xs leading-relaxed">
                Supported formats: MP4, MOV, MKV.
              </p>
            </div>
          </div>

          {/* Video Preview */}
          <div className="min-w-0 rounded-xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-xl sm:rounded-2xl sm:p-4">
            {uploadVideoInfo?.videoUrl ? (
              <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center">
                {/* Video Preview */}
                <video
                  src={uploadVideoInfo.videoUrl}
                  controls
                  preload="metadata"
                  className="aspect-video w-full shrink-0 rounded-xl border border-white/10 bg-black object-contain sm:aspect-video sm:w-40"
                />

                {/* Video Information */}
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-semibold">
                    Lecture Video Uploaded
                  </h4>

                  <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                    Your lecture video is ready for preview.
                  </p>

                  <a
                    href={uploadVideoInfo.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 transition-colors hover:text-indigo-300"
                  >
                    Open Video
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 sm:h-12 sm:w-12">
                  <Video className="h-5 w-5 text-indigo-400" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium">No video uploaded</p>

                  <p className="text-muted-foreground mt-1 text-xs">
                    Upload a lecture video to continue.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Upload Progress */}
          {mediaProgress && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-medium">
                  Uploading video...
                </span>

                <span className="font-semibold text-indigo-400">
                  {uploadProgress}%
                </span>
              </div>

              <Progress value={uploadProgress} />
            </div>
          )}

          {/* Free Preview */}
          <div className="flex min-w-0 flex-col gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:rounded-2xl sm:px-5 sm:py-4">
            <div className="min-w-0">
              <h3 className="text-sm font-semibold">Free Preview Access</h3>

              <p className="text-muted-foreground mt-1 text-xs leading-relaxed sm:text-sm">
                Students can watch this lecture before purchasing the course.
              </p>
            </div>

            <Switch
              id="free-video"
              checked={!!isFree}
              onCheckedChange={setIsFree}
              disabled={isBusy}
            />
          </div>

          {/* Divider */}
          <div className="via-border/70 h-px w-full bg-gradient-to-r from-transparent to-transparent" />

          {/* Footer Buttons */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              to={`/admin/course/${courseId}/lecture`}
              className="w-full sm:w-auto"
            >
              <Button
                type="button"
                disabled={isBusy}
                className="h-11 w-full rounded-xl border border-white/10 bg-white/10 px-5 text-sm font-medium text-gray-600 shadow-sm backdrop-blur-xl transition-colors hover:bg-white/15 sm:w-auto sm:rounded-2xl"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </Link>

            <Button
              type="button"
              disabled={
                isBusy || !uploadVideoInfo?.videoUrl || !lectureTitle.trim()
              }
              onClick={editLectureHandler}
              className="h-11 w-full rounded-xl border border-indigo-400/30 bg-gradient-to-r from-indigo-600 to-violet-600 px-6 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition-all duration-300 hover:from-indigo-700 hover:to-violet-700 hover:shadow-lg hover:shadow-indigo-500/30 sm:w-auto sm:rounded-2xl"
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
