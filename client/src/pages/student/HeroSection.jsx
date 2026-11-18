import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const searchHandler = (e) => {
    e.preventDefault();
    // alert(searchQuery);
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };
  return (
    // <div className="relative bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 py-16 px-4 text-center">
    //   <div className="max-w-3xl mx-auto">
    //     <h1 className="text-white text-4xl font-bold mb-4">
    //       Find the Best Courses for You
    //     </h1>
    //     <p className="text-gray-200 dark:text-gray-400 mb-8">
    //       Discover, Learn, and Upskill with Our Wide Range Of Courses
    //     </p>
    //   </div>
    // </div>
    <div className="relative overflow-hidden border-b bg-background py-24 px-4">
      {/* Smooth Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-indigo-100/40 to-background dark:from-slate-950 dark:via-indigo-950/40 dark:to-slate-950" />

      {/* Blur Glow Effects */}
      <div className="absolute top-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-500/10" />

      <div className="relative mx-auto max-w-4xl text-center">
        <div className="inline-flex items-center rounded-full border border-border bg-background/60 px-4 py-1.5 backdrop-blur">
          <span className="text-sm text-muted-foreground">
            🚀 Learn Modern Skills Faster
          </span>
        </div>

        <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">
          Find the Best Courses to{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
            Upgrade Your Skills
          </span>
        </h1>

        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover, learn, and upskill with high-quality courses designed for
          students and developers.
        </p>

        {/* Search Form */}
        <form
          onSubmit={searchHandler}
          className="mt-10 flex items-center overflow-hidden rounded-full border bg-background/80 shadow-xl backdrop-blur max-w-2xl mx-auto"
        >
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for courses..."
            className="h-14 flex-1 border-0 bg-transparent px-6 text-base focus-visible:ring-0 focus-visible:ring-offset-0"
          />

          <Button className="m-1 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-8 py-6 text-white transition-all duration-300 hover:from-indigo-600 hover:to-violet-600">
            Search
          </Button>
        </form>

        <div className="mt-10 flex items-center justify-center gap-4">
          <Button
            size="lg"
            className="rounded-2xl"
            onClick={() => navigate("/course/search?query=")}
          >
            Explore Courses
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="rounded-2xl backdrop-blur"
            onClick={() => navigate("/categories")}
          >
            Browse Categories
          </Button>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default HeroSection;
