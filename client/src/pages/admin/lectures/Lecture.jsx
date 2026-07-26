import React from "react";

import { Edit, PlayCircle, Clock3, ChevronRight } from "lucide-react";

import { useNavigate } from "react-router-dom";

const Lecture = ({ lecture, index, courseId }) => {
  const navigate = useNavigate();

  const goToUpdateLecture = () => {
    navigate(`/admin/course/${courseId}/lecture/${lecture._id}`);
  };
  // console.log(lecture);
  return (
    <div className="group mt-4 relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-5 shadow-lg backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-indigo-500/10">
      {/* Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-violet-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex items-center justify-between gap-4">
        {/* Left Content */}
        <div className="flex items-center gap-4">
          {/* Lecture Number */}
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 text-lg font-bold text-white shadow-lg shadow-indigo-500/20">
            {index + 1}
          </div>

          {/* Lecture Info */}
          <div>
            <div className="flex items-center gap-2">
              <PlayCircle className="h-4 w-4 text-indigo-400" />

              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Lecture
              </p>
            </div>

            <h1 className="mt-1 text-lg font-bold tracking-tight transition-colors duration-300 group-hover:text-indigo-400">
              {lecture.lectureTitle}
            </h1>

            {/* Dummy Meta */}
            <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
              {/* <div className="flex items-center gap-1">
                <Clock3 className="h-4 w-4 text-violet-400" />
                <span>12 min</span>
              </div> */}

              <span className="h-1 w-1 rounded-full bg-muted-foreground" />

              <span>Video Lecture</span>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Edit Button */}
          <button
            onClick={goToUpdateLecture}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-muted-foreground backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-indigo-500/30 hover:bg-indigo-500 hover:text-white hover:shadow-lg hover:shadow-indigo-500/30"
          >
            <Edit size={18} />
          </button>

          {/* Arrow */}
          <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
};

export default Lecture;
