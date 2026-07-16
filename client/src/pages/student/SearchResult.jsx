import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SearchResult = ({ course }) => {
  return (
    <div className="group overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex flex-col md:flex-row">
        <img
          src={course.courseThumbnail}
          alt={course.courseTitle}
          className="h-52 w-full md:h-auto md:w-72 object-cover"
        />

        <div className="flex flex-1 flex-col justify-between p-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge>{course.courseLevel}</Badge>
              <Badge variant="secondary">{course.category}</Badge>
            </div>

            <h2 className="text-xl font-bold transition-colors group-hover:text-primary">
              {course.courseTitle}
            </h2>

            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
              {course.subTitle}
            </p>

            <p className="mt-4 text-sm">
              Instructor:{" "}
              <span className="font-semibold">{course.creator?.name}</span>
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h3 className="text-2xl font-bold text-primary">
              ₹{course.coursePrice}
            </h3>

            <Link to={`/course-detail/${course._id}`}>
              <Button className="rounded-xl">View Course</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
