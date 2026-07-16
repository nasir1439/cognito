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
  if (isLoading) return <h1>Loading...</h1>;
  // console.log(data);
  return (
    <div className="relative px-4 py-8 md:px-8">
      {/* Background Glow */}
      <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

      {/* Main Wrapper */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-2xl">
        {/* Top Header */}
        <div className="flex flex-col gap-5 border-b border-white/10 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Sparkles className="text-indigo-400" size={18} />

              <span className="text-sm font-medium text-indigo-400">
                Instructor Panel
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight">
              Your Courses
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Manage your courses, edit content, and track learning experiences.
            </p>
          </div>

          <Button
            onClick={() => navigate("create")}
            className="h-11 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 px-6 text-sm font-semibold text-white transition-all duration-300 hover:from-indigo-600 hover:to-violet-600 hover:shadow-lg hover:shadow-indigo-500/30"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Course
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="pl-6 text-muted-foreground">
                  Course
                </TableHead>

                <TableHead className="text-muted-foreground">
                  Category
                </TableHead>

                <TableHead className="text-muted-foreground">Price</TableHead>

                <TableHead className="text-muted-foreground">Status</TableHead>

                <TableHead className="text-right pr-6 text-muted-foreground">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.courses.map((course) => (
                <TableRow
                  key={course._id}
                  className="border-white/5 transition-all duration-300 hover:bg-white/5"
                >
                  {/* Title */}
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500/20 to-violet-500/20">
                        <BookOpen className="h-5 w-5 text-indigo-400" />
                      </div>

                      <div>
                        <h1 className="font-semibold">{course?.courseTitle}</h1>

                        <p className="text-xs text-muted-foreground">
                          Premium Learning Course
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Category */}
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="rounded-full px-3 py-1"
                    >
                      {course?.category}
                    </Badge>
                  </TableCell>

                  {/* Price */}
                  <TableCell className="font-semibold">
                    {course?.coursePrice || "NA"}
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge
                      className={`rounded-full px-3 py-1 ${
                        course?.isPublished === true
                          ? "bg-green-500/20 text-green-400 hover:bg-green-500/20"
                          : "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20"
                      }`}
                    >
                      {course?.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="pr-6 text-right">
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
                        className="w-40 rounded-2xl border-white/10 bg-background/95 backdrop-blur-xl"
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
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Bottom Footer */}
        <div className="flex items-center justify-between border-t border-white/10 px-6 py-4 text-sm text-muted-foreground">
          <p>Total Courses: {data.courses.length}</p>

          <p>Keep creating amazing learning experiences ✨</p>
        </div>
      </div>
    </div>
  );
};

export default CourseTable;
