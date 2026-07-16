import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Users, Clock3, Signal, IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";

function CourseCard({ course }) {
  // console.log(course);
  return (
    <Link to={`/course-detail/${course._id}`}>
      <Card className="group overflow-hidden rounded-3xl border border-border/50 bg-background/70 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10">
        {/* Thumbnail */}
        <div className="relative overflow-hidden">
          <img
            src={course.courseThumbnail}
            alt={course.courseTitle}
            className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* Category */}
          <Badge className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
            {course.category}
          </Badge>

          {/* Price */}
          <div className="absolute bottom-4 right-4 flex items-center rounded-full bg-background/80 px-3 py-1 text-sm font-bold shadow-lg backdrop-blur-md">
            <IndianRupee className="mr-1 h-4 w-4 text-indigo-500" />
            {course.coursePrice}
          </div>
        </div>

        <CardContent className="space-y-5 p-5">
          {/* Creator */}
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-indigo-500/20">
              <AvatarImage src={course.creator?.photoUrl} />

              <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white">
                {course.creator?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div>
              <p className="text-xs text-muted-foreground">Instructor</p>

              <h4 className="text-sm font-semibold">{course.creator?.name}</h4>
            </div>
          </div>

          {/* Title */}
          <div>
            <h1 className="line-clamp-2 text-xl font-bold leading-tight transition-colors duration-300 group-hover:text-indigo-500">
              {course.courseTitle}
            </h1>

            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {course.subTitle}
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between rounded-2xl border bg-muted/40 p-3 text-sm">
            {/* Students */}
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-4 w-4 text-indigo-500" />
              <span>{course.enrolledStudents?.length || 0}</span>
            </div>

            {/* Level */}
            <div className="flex items-center gap-1 text-muted-foreground">
              <Signal className="h-4 w-4 text-violet-500" />

              <span>{course.courseLevel}</span>
            </div>

            {/* Duration */}
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock3 className="h-4 w-4 text-pink-500" />

              <span>12h</span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

            <span className="ml-2 text-sm text-muted-foreground">
              (4.9 Ratings)
            </span>
          </div>
        </CardContent>

        <CardFooter className="p-5 pt-0">
          <Button className="h-11 w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 text-sm font-semibold transition-all duration-300 hover:from-indigo-600 hover:to-violet-600 hover:shadow-lg hover:shadow-indigo-500/30">
            Enroll Now
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default CourseCard;
