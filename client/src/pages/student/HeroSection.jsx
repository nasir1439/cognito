import React, { useState } from "react";
import { Search, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();

    if (searchQuery.trim() !== "") {
      navigate(
        `/course/search?query=${encodeURIComponent(searchQuery.trim())}`,
      );
    }

    setSearchQuery("");
  };

  return (
    <section className="border-border/50 bg-background relative isolate overflow-hidden border-b px-4 py-24 sm:px-6 sm:py-20 md:py-24 lg:px-8">
      {/* Gradient Background */}
      <div className="from-background to-background absolute inset-0 -z-10 bg-gradient-to-br via-indigo-100/40 dark:from-slate-950 dark:via-indigo-950/40 dark:to-slate-950" />

      {/* Background Glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[280px] w-[280px] -translate-x-1/2 rounded-full bg-indigo-400/20 blur-3xl sm:h-[400px] sm:w-[400px] dark:bg-indigo-500/10" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        {/* Badge */}
        <div className="border-border/70 bg-background/60 inline-flex max-w-full items-center justify-center gap-2 rounded-full border px-3 py-2 backdrop-blur-md sm:px-4">
          <Sparkles size={15} className="shrink-0 text-indigo-500" />

          <span className="text-muted-foreground text-xs font-medium sm:text-sm">
            Learn Modern Skills Faster
          </span>
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl md:mt-7 md:text-5xl lg:text-6xl">
          Find the Best Courses to{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
            Upgrade Your Skills
          </span>
        </h1>

        {/* Description */}
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-sm leading-relaxed sm:mt-6 sm:text-base md:text-lg">
          Discover, learn, and upskill with high-quality courses designed for
          students and developers.
        </p>

        {/* Search Form */}
        <form
          onSubmit={searchHandler}
          className="border-border/70 bg-background/80 mx-auto mt-7 flex w-full max-w-2xl items-center gap-1.5 rounded-full border p-1.5 shadow-lg shadow-indigo-500/5 backdrop-blur-xl transition-all duration-300 focus-within:border-indigo-500/50 focus-within:shadow-indigo-500/10 sm:mt-10 sm:p-2"
        >
          <Search
            size={19}
            className="text-muted-foreground ml-2 shrink-0 sm:ml-3"
          />

          <Input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for courses..."
            aria-label="Search courses"
            className="h-10 min-w-0 flex-1 border-0 bg-transparent px-2 text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:h-11 sm:px-3 sm:text-base"
          />

          <Button
            type="submit"
            className="h-10 shrink-0 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-4 text-sm text-white transition-all duration-300 hover:from-indigo-600 hover:to-violet-600 sm:h-11 sm:px-7"
          >
            <Search size={16} className="sm:hidden" />
            <span className="hidden sm:inline">Search</span>
          </Button>
        </form>

        {/* CTA Buttons */}
        <div className="mt-7 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
          <Button
            size="lg"
            className="h-11 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-6 text-white shadow-md transition-all duration-300 hover:from-indigo-600 hover:to-violet-600 sm:w-auto sm:rounded-2xl"
            onClick={() => navigate("/course/search?query=")}
          >
            Explore Courses
            <ArrowRight size={17} className="ml-1" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-border/70 bg-background/50 h-11 w-full rounded-xl px-6 backdrop-blur transition-all duration-300 hover:border-indigo-500/50 hover:text-indigo-500 sm:w-auto sm:rounded-2xl"
            onClick={() => navigate("/categories")}
          >
            Browse Categories
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
