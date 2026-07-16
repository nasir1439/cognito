import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CourseTab from "./CourseTab";
import { ArrowRight } from "lucide-react";
const EditCourse = () => {
  return (
    <div>
      <div className="flex items-center justify-between px-7">
        <h1 className="text-2xl font-bold tracking-tight ml-10">
          Add Detailed Information About Courses
        </h1>
        {/* Right */}
        <Link to="lecture">
          <Button
            variant="outline"
            className="group rounded-xl border-border/50 bg-background/50 backdrop-blur-xl hover:bg-muted/50"
          >
            Go to Lectures Page
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
      <CourseTab />
    </div>
  );
};

export default EditCourse;
