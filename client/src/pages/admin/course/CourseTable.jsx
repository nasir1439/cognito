import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  MoreHorizontal,
  PlusCircle,
  Pencil,
  Trash2,
  BookOpen,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useGetCreatorCourseQuery } from "../../../features/api/courseApi";

const CourseTable = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetCreatorCourseQuery();

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <p className="text-muted-foreground text-sm">Loading courses...</p>
      </div>
    );
  }

  const courses = data?.courses || [];

  return (
    <div className="relative w-full min-w-0 overflow-x-clip px-3 py-5 sm:px-4 sm:py-8 md:px-8">
      {" "}
      {/* Background Glow */}
      <div className="pointer-events-none absolute top-10 left-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
      {/* Main Wrapper */}
      <div className="relative w-full min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-2xl sm:rounded-3xl">
        {/* Top Header */}
        <div className="flex flex-col gap-4 border-b border-white/10 p-4 sm:gap-5 sm:p-6 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2">
              <Sparkles className="shrink-0 text-indigo-400" size={18} />

              <span className="text-sm font-medium text-indigo-400">
                Instructor Panel
              </span>
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Your Courses
            </h1>

            <p className="text-muted-foreground mt-2 max-w-xl text-sm">
              Manage your courses, edit content, and track learning experiences.
            </p>
          </div>

          <Button
            onClick={() => navigate("create")}
            className="h-11 w-full shrink-0 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 px-6 text-sm font-semibold text-white transition-all duration-300 hover:from-indigo-600 hover:to-violet-600 hover:shadow-lg hover:shadow-indigo-500/30 md:w-auto"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Course
          </Button>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto">
          <Table className="min-w-[650px]">
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-muted-foreground pl-4 sm:pl-6">
                  Course
                </TableHead>

                <TableHead className="text-muted-foreground">
                  Category
                </TableHead>

                <TableHead className="text-muted-foreground">Price</TableHead>

                <TableHead className="text-muted-foreground">Status</TableHead>

                <TableHead className="text-muted-foreground pr-4 text-right sm:pr-6">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {courses.length > 0 ? (
                courses.map((course) => (
                  <TableRow
                    key={course._id}
                    className="border-white/5 transition-all duration-300 hover:bg-white/5"
                  >
                    {/* Title */}
                    <TableCell className="max-w-[260px] pl-4 sm:pl-6">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500/20 to-violet-500/20 sm:h-11 sm:w-11 sm:rounded-2xl">
                          <BookOpen className="h-5 w-5 text-indigo-400" />
                        </div>

                        <div className="min-w-0">
                          <h2 className="truncate font-semibold">
                            {course?.courseTitle}
                          </h2>

                          <p className="text-muted-foreground text-xs">
                            Premium Learning Course
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Category */}
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="rounded-full px-3 py-1 whitespace-nowrap"
                      >
                        {course?.category}
                      </Badge>
                    </TableCell>

                    {/* Price */}
                    <TableCell className="font-semibold whitespace-nowrap">
                      {course?.coursePrice || "NA"}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Badge
                        className={`rounded-full px-3 py-1 whitespace-nowrap ${
                          course?.isPublished === true
                            ? "bg-green-500/20 text-green-400 hover:bg-green-500/20"
                            : "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20"
                        }`}
                      >
                        {course?.isPublished ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="pr-4 text-right sm:pr-6">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                          >
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                          align="end"
                          className="bg-background/95 w-40 rounded-2xl border-white/10 backdrop-blur-xl"
                        >
                          <DropdownMenuItem
                            onClick={() => navigate(`${course._id}`)}
                            className="cursor-pointer"
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>

                          <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableCell
                    colSpan={5}
                    className="text-muted-foreground h-32 text-center"
                  >
                    No courses found. Start by adding your first course!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Bottom Footer */}
        <div className="text-muted-foreground flex flex-col gap-2 border-t border-white/10 px-4 py-4 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-sm">
          <p>Total Courses: {courses.length}</p>

          <p>Keep creating amazing learning experiences ✨</p>
        </div>
      </div>
    </div>
  );
};

export default CourseTable;
