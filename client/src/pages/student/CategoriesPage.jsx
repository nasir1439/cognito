import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Code2,
  Database,
  Globe,
  Server,
  Cpu,
  Boxes,
  Atom,
  Layers3,
  DatabaseZap,
  ArrowUpRight,
} from "lucide-react";

const categories = [
  {
    title: "Frontend Development",
    value: "frontend development",
    icon: Globe,
    description: "Build beautiful and interactive user interfaces.",
  },
  {
    title: "Backend Development",
    value: "backend development",
    icon: Server,
    description: "Learn server-side programming and APIs.",
  },
  {
    title: "Fullstack Development",
    value: "fullstack development",
    icon: Code2,
    description: "Master both frontend and backend development.",
  },
  {
    title: "MERN Stack",
    value: "mern stack development",
    icon: Boxes,
    description:
      "Build fullstack applications with MongoDB, Express, React and Node.",
  },
  {
    title: "Data Science",
    value: "data science",
    icon: Database,
    description: "Explore data analysis and machine learning concepts.",
  },
  {
    title: "Python",
    value: "python",
    icon: Cpu,
    description: "Learn Python programming and its applications.",
  },
  {
    title: "Next.js",
    value: "nextjs",
    icon: Atom,
    description: "Create modern React applications with Next.js.",
  },
  {
    title: "JavaScript",
    value: "javascript",
    icon: Layers3,
    description: "Strengthen your JavaScript programming skills.",
  },
  {
    title: "MongoDB",
    value: "mongodb",
    icon: DatabaseZap,
    description: "Learn database management with MongoDB.",
  },
];

const CategoriesPage = () => {
  const navigate = useNavigate();

  const categoryHandler = (category) => {
    navigate(`/course/search?query=${encodeURIComponent(category)}`);
  };

  return (
    <main className="bg-background relative min-h-screen overflow-hidden pt-20 pb-16 sm:pt-24">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="absolute top-[35%] right-0 h-64 w-64 rounded-full bg-violet-500/5 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-indigo-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <section className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-xs font-semibold text-indigo-600 sm:text-sm dark:text-indigo-400">
            <Layers3 className="h-4 w-4" />
            Explore Learning Paths
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Browse{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
              Categories
            </span>
          </h1>

          <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-sm leading-relaxed sm:text-base">
            Discover courses across different technologies and development
            fields. Choose your interest and start learning something new.
          </p>
        </section>

        {/* Categories Grid */}
        <section
          aria-label="Course categories"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
        >
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.value}
                type="button"
                onClick={() => categoryHandler(category.value)}
                aria-label={`Explore ${category.title} courses`}
                className="group border-border/60 bg-card/70 focus-visible:ring-offset-background relative flex min-h-[190px] flex-col overflow-hidden rounded-2xl border p-5 text-left shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:bg-indigo-500/[0.03] hover:shadow-lg hover:shadow-indigo-500/5 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none sm:min-h-[210px] sm:rounded-3xl sm:p-7"
              >
                {/* Hover Glow */}
                <div className="pointer-events-none absolute -top-12 -right-12 h-36 w-36 rounded-full bg-indigo-500/0 blur-3xl transition-colors duration-300 group-hover:bg-indigo-500/10" />

                <div className="relative flex w-full items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-500/10 bg-indigo-500/10 transition-all duration-300 group-hover:scale-105 group-hover:bg-indigo-500/15 sm:h-14 sm:w-14 sm:rounded-2xl">
                    <Icon className="h-6 w-6 text-indigo-600 sm:h-7 sm:w-7 dark:text-indigo-400" />
                  </div>

                  <div className="border-border/60 text-muted-foreground flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 group-hover:border-indigo-500/30 group-hover:bg-indigo-500/10 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                <div className="relative mt-5">
                  <h2 className="text-lg font-bold tracking-tight transition-colors duration-200 group-hover:text-indigo-600 sm:text-xl dark:group-hover:text-indigo-400">
                    {category.title}
                  </h2>

                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </button>
            );
          })}
        </section>

        {/* Bottom Message */}
        <div className="mt-10 text-center sm:mt-14">
          <p className="text-muted-foreground text-sm">
            Keep exploring. Keep learning.{" "}
            <span className="font-medium text-indigo-600 dark:text-indigo-400">
              Grow beyond limits.
            </span>
          </p>
        </div>
      </div>
    </main>
  );
};

export default CategoriesPage;
