import React, { useEffect, useState } from "react";

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

import { Loader2, Pencil, User2 } from "lucide-react";

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
  const { data, isLoading, refetch } = useLoadUserQuery();
  // console.log(data);

  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateUserIsLoading,
      error,
      isSuccess,
      isError,
    },
  ] = useUpdateUserMutation();

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(updateUserData?.message || "Profile Updated.");
    }

    if (isError) {
      toast.error(error?.data?.message || "Failed To Update Profile");
    }
  }, [error, updateUserData, isSuccess, isError, refetch]);

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const user = data?.user;

  if (isLoading) return <ProfileSkeleton />;
  const userUpdateHandler = async () => {
    const formData = new FormData();

    if (name.trim() !== "") {
      formData.append("name", name);
    }

    if (profilePhoto) {
      formData.append("profilePhoto", profilePhoto);
    }

    await updateUser(formData);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-background pt-28 pb-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-indigo-100/20 to-background dark:from-slate-950 dark:via-indigo-950/20 dark:to-slate-950" />

      {/* Glow */}
      <div className="absolute top-10 left-1/2 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Heading */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-1.5 backdrop-blur">
            <User2 size={16} />
            <span className="text-sm text-muted-foreground">
              Your Personal Profile
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-5xl">
            My{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
              Profile
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Manage your profile information and continue your learning journey.
          </p>
        </div>

        {/* Profile Card */}
        <div className="rounded-3xl border bg-background/60 p-8 shadow-xl backdrop-blur-xl">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-background shadow-2xl">
                <AvatarImage
                  src={user?.photoUrl || "https://github.com/shadcn.png"}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg">
                <Pencil size={16} />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="space-y-5">
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>

                  <h2 className="text-2xl font-bold">{user?.name}</h2>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Email Address</p>

                  <h2 className="text-lg font-medium">{user?.email}</h2>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Role</p>

                  <div className="mt-1 inline-flex rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-1 text-sm font-medium text-white">
                    {user?.role.toUpperCase()}
                  </div>
                </div>

                {/* Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="mt-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-300 hover:from-indigo-600 hover:to-violet-600">
                      Edit Profile
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="rounded-3xl border bg-background/95 backdrop-blur-xl sm:max-w-md">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        userUpdateHandler();
                      }}
                    >
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>

                        <DialogDescription>
                          Update your profile information here.
                        </DialogDescription>
                      </DialogHeader>

                      <FieldGroup className="space-y-5">
                        <Field>
                          <Label htmlFor="name">Name</Label>

                          <Input
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="rounded-xl"
                          />
                        </Field>

                        <Field>
                          <Label htmlFor="profile-photo">Profile Photo</Label>

                          <Input
                            id="profile-photo"
                            type="file"
                            onChange={onChangeHandler}
                            accept="image/*"
                            className="rounded-xl"
                          />
                        </Field>
                      </FieldGroup>

                      <DialogFooter className="mt-6">
                        <DialogClose asChild>
                          <Button variant="outline" className="rounded-xl">
                            Cancel
                          </Button>
                        </DialogClose>

                        <Button
                          disabled={updateUserIsLoading}
                          type="submit"
                          className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-300 hover:from-indigo-600 hover:to-violet-600"
                        >
                          {updateUserIsLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Please Wait...
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

        {user?.role === "student" && (
          <div className="mt-16">
            <h2 className="text-3xl font-extrabold tracking-tight">
              Courses{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                You're Enrolled In
              </span>
            </h2>

            <p className="mt-3 text-muted-foreground">
              Continue learning from your enrolled courses.
            </p>

            {user?.enrolledCourses.length === 0 ? (
              <div className="mt-8 flex flex-col items-center justify-center rounded-3xl border border-dashed py-20 text-center">
                <h2 className="text-2xl font-bold">No Courses Found</h2>

                <p className="mt-3 text-muted-foreground">
                  You are not enrolled in any courses yet.
                </p>
              </div>
            ) : (
              <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {user?.enrolledCourses.map((course) => (
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
