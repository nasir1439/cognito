import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  ArrowRight,
  BookOpen,
  Camera,
  GraduationCap,
  Loader2,
  Mail,
  Pencil,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import CourseCard from "./CourseCard";
import ProfileSkeleton from "./ProfileSkeleton";

import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "../../features/api/authApi";

import { toast } from "sonner";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { data, isLoading, refetch } = useLoadUserQuery();

  const [updateUser, { isLoading: updateUserIsLoading }] =
    useUpdateUserMutation();

  const user = data?.user;
  const enrolledCourses = user?.enrolledCourses || [];

  const instructorName = user?.name || "User";
  const userInitial = instructorName.charAt(0).toUpperCase();

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setProfilePhoto(file);
    }
  };

  const handleDialogChange = (open) => {
    setIsEditOpen(open);

    if (open) {
      setName(user?.name || "");
      setProfilePhoto(null);
    }
  };

  const userUpdateHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (name.trim() !== "" && name.trim() !== user?.name) {
      formData.append("name", name.trim());
    }

    if (profilePhoto) {
      formData.append("profilePhoto", profilePhoto);
    }

    if (!name.trim() && !profilePhoto) {
      toast.info("Please make some changes before saving.");
      return;
    }

    if (name.trim() === user?.name && !profilePhoto) {
      toast.info("No changes detected.");
      return;
    }

    try {
      const response = await updateUser(formData).unwrap();

      await refetch();

      toast.success(response?.message || "Profile updated successfully.");

      setProfilePhoto(null);
      setIsEditOpen(false);
    } catch (error) {
      toast.error(
        error?.data?.message || error?.message || "Failed to update profile.",
      );
    }
  };

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <section className="bg-background relative min-h-screen overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20">
      {/* Background */}
      <div className="from-background to-background pointer-events-none absolute inset-0 bg-gradient-to-b via-indigo-100/20 dark:from-slate-950 dark:via-indigo-950/20 dark:to-slate-950" />

      {/* Glow */}
      <div className="pointer-events-none absolute top-10 left-1/2 h-[280px] w-[280px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl sm:h-[400px] sm:w-[400px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-8 sm:mb-12">
          <div className="border-border bg-background/70 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 backdrop-blur sm:px-4">
            <UserRound className="h-3.5 w-3.5 sm:h-4 sm:w-4" />

            <span className="text-muted-foreground text-xs sm:text-sm">
              Your Personal Profile
            </span>
          </div>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight sm:mt-6 sm:text-4xl md:text-5xl">
            My{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
              Profile
            </span>
          </h1>

          <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-relaxed sm:mt-4 sm:text-base md:text-lg">
            Manage your profile information and continue your learning journey.
          </p>
        </div>

        {/* Profile Card */}
        <div className="border-border/60 bg-background/70 overflow-hidden rounded-2xl border shadow-lg shadow-indigo-500/5 backdrop-blur-xl sm:rounded-3xl sm:shadow-xl">
          {/* Card Header */}
          <div className="h-2 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />

          <div className="p-5 sm:p-7 md:p-9">
            <div className="flex flex-col items-center gap-6 sm:gap-8 md:flex-row md:items-start">
              {/* Avatar */}
              <div className="relative shrink-0">
                <Avatar className="border-background h-24 w-24 border-4 shadow-xl ring-2 ring-indigo-500/20 sm:h-32 sm:w-32">
                  <AvatarImage src={user?.photoUrl} alt={instructorName} />

                  <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-500 text-3xl font-bold text-white sm:text-4xl">
                    {userInitial}
                  </AvatarFallback>
                </Avatar>

                <div className="border-background absolute -right-1 -bottom-1 flex h-8 w-8 items-center justify-center rounded-full border-2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-md sm:h-10 sm:w-10">
                  <Camera className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
              </div>

              {/* User Information */}
              <div className="min-w-0 flex-1 text-center md:text-left">
                <div className="mb-5">
                  <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                    Account Information
                  </p>

                  <h2 className="mt-1.5 text-xl font-bold tracking-tight break-words sm:text-2xl">
                    {user?.name || "User"}
                  </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  {/* Name */}
                  <div className="border-border/60 bg-muted/20 min-w-0 rounded-xl border p-3.5 sm:p-4">
                    <div className="text-muted-foreground mb-2 flex items-center justify-center gap-2 md:justify-start">
                      <UserRound className="h-4 w-4" />
                      <p className="text-xs font-medium sm:text-sm">
                        Full Name
                      </p>
                    </div>

                    <p className="text-sm font-semibold break-words sm:text-base">
                      {user?.name || "Not provided"}
                    </p>
                  </div>

                  {/* Email */}
                  <div className="border-border/60 bg-muted/20 min-w-0 rounded-xl border p-3.5 sm:p-4">
                    <div className="text-muted-foreground mb-2 flex items-center justify-center gap-2 md:justify-start">
                      <Mail className="h-4 w-4" />
                      <p className="text-xs font-medium sm:text-sm">
                        Email Address
                      </p>
                    </div>

                    <p className="text-sm font-semibold break-all sm:text-base">
                      {user?.email || "Not provided"}
                    </p>
                  </div>

                  {/* Role */}
                  <div className="border-border/60 bg-muted/20 rounded-xl border p-3.5 sm:p-4">
                    <div className="text-muted-foreground mb-2 flex items-center justify-center gap-2 md:justify-start">
                      <ShieldCheck className="h-4 w-4" />
                      <p className="text-xs font-medium sm:text-sm">
                        Account Role
                      </p>
                    </div>

                    <div className="flex justify-center md:justify-start">
                      <span className="inline-flex rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-3 py-1 text-xs font-semibold text-white capitalize sm:text-sm">
                        {user?.role || "User"}
                      </span>
                    </div>
                  </div>

                  {/* Enrolled Courses */}
                  {user?.role === "student" && (
                    <div className="border-border/60 bg-muted/20 rounded-xl border p-3.5 sm:p-4">
                      <div className="text-muted-foreground mb-2 flex items-center justify-center gap-2 md:justify-start">
                        <BookOpen className="h-4 w-4" />
                        <p className="text-xs font-medium sm:text-sm">
                          Enrolled Courses
                        </p>
                      </div>

                      <p className="text-sm font-semibold sm:text-base">
                        {enrolledCourses.length}{" "}
                        {enrolledCourses.length === 1 ? "Course" : "Courses"}
                      </p>
                    </div>
                  )}
                </div>

                {/* Edit Profile Dialog */}
                <div className="mt-6 flex justify-center md:justify-start">
                  <Dialog open={isEditOpen} onOpenChange={handleDialogChange}>
                    <DialogTrigger asChild>
                      <Button className="h-10 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-5 text-sm font-semibold shadow-md shadow-indigo-500/10 transition-all duration-300 hover:from-indigo-600 hover:to-violet-600 sm:w-auto">
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="border-border/60 bg-background/95 max-h-[90vh] overflow-y-auto rounded-2xl backdrop-blur-xl sm:max-w-md sm:rounded-3xl">
                      <form onSubmit={userUpdateHandler}>
                        <DialogHeader>
                          <DialogTitle className="text-xl font-bold">
                            Edit Profile
                          </DialogTitle>

                          <DialogDescription>
                            Update your personal information and profile photo.
                          </DialogDescription>
                        </DialogHeader>

                        <FieldGroup className="mt-6 space-y-5">
                          <Field>
                            <Label htmlFor="profile-name">Full Name</Label>

                            <Input
                              id="profile-name"
                              name="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Enter your name"
                              className="h-11 rounded-xl"
                              autoComplete="name"
                              disabled={updateUserIsLoading}
                            />
                          </Field>

                          <Field>
                            <Label htmlFor="profile-photo">Profile Photo</Label>

                            <Input
                              id="profile-photo"
                              type="file"
                              name="profilePhoto"
                              onChange={onChangeHandler}
                              accept="image/*"
                              className="file:bg-muted min-h-11 cursor-pointer rounded-xl file:mr-3 file:rounded-lg file:border-0 file:px-3 file:py-1 file:text-xs file:font-medium"
                              disabled={updateUserIsLoading}
                            />

                            {profilePhoto && (
                              <p className="text-muted-foreground mt-1 text-xs break-all">
                                Selected: {profilePhoto.name}
                              </p>
                            )}
                          </Field>
                        </FieldGroup>

                        <DialogFooter className="mt-7 flex-col-reverse gap-2 sm:flex-row">
                          <DialogClose asChild>
                            <Button
                              type="button"
                              variant="outline"
                              className="h-10 rounded-xl"
                              disabled={updateUserIsLoading}
                            >
                              Cancel
                            </Button>
                          </DialogClose>

                          <Button
                            type="submit"
                            disabled={updateUserIsLoading}
                            className="h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 font-semibold transition-all duration-300 hover:from-indigo-600 hover:to-violet-600"
                          >
                            {updateUserIsLoading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                              </>
                            ) : (
                              "Save Changes"
                            )}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Student Enrolled Courses */}
        {user?.role === "student" && (
          <div className="mt-12 sm:mt-16">
            <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-indigo-500 uppercase">
                  <GraduationCap className="h-4 w-4" />
                  Your Learning Journey
                </div>

                <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                  Courses{" "}
                  <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                    You're Enrolled In
                  </span>
                </h2>

                <p className="text-muted-foreground mt-2 text-xs leading-relaxed sm:text-sm">
                  Continue learning from your enrolled courses.
                </p>
              </div>

              {enrolledCourses.length > 0 && (
                <span className="w-fit rounded-full border border-indigo-500/20 bg-indigo-500/5 px-3 py-1.5 text-xs font-semibold text-indigo-500">
                  {enrolledCourses.length}{" "}
                  {enrolledCourses.length === 1 ? "Course" : "Courses"}
                </span>
              )}
            </div>

            {enrolledCourses.length === 0 ? (
              <div className="border-border/70 bg-background/40 flex flex-col items-center justify-center rounded-2xl border border-dashed px-5 py-12 text-center sm:rounded-3xl sm:py-16">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 text-indigo-500">
                  <GraduationCap className="h-7 w-7" />
                </div>

                <h3 className="text-lg font-bold sm:text-xl">
                  No Courses Found
                </h3>

                <p className="text-muted-foreground mt-2 max-w-sm text-xs leading-relaxed sm:text-sm">
                  You haven't enrolled in any courses yet. Explore our courses
                  and start learning something new.
                </p>

                <Button
                  asChild
                  className="mt-6 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-5 text-sm font-semibold hover:from-indigo-600 hover:to-violet-600"
                >
                  <Link to="/course/search?query=">
                    Explore Courses
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-7">
                {enrolledCourses.map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;
