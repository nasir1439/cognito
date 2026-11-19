import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  Search,
  RefreshCw,
} from "lucide-react";

import Filter from "./Filter";
import SearchResult from "./SearchResult";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useGetSearchCourseQuery } from "@/features/api/courseApi";

const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") || "";

  // Keep filters synchronized with the current search query.
  const [filters, setFilters] = useState({
    query,
    categories: [],
    sortByPrice: "",
  });

  // Automatically use default filters when the search query changes.
  const selectedCategories = filters.query === query ? filters.categories : [];

  const sortByPrice = filters.query === query ? filters.sortByPrice : "";

  const { currentData, isLoading, isFetching, isError, refetch } =
    useGetSearchCourseQuery({
      searchQuery: query,
      categories: selectedCategories,
      sortByPrice,
    });

  const courses = currentData?.courses || [];

  const isInitialLoading = isLoading || (isFetching && !currentData);
  const isEmpty = !isInitialLoading && !isError && courses.length === 0;

  const handleFilterChange = (categories, price) => {
    setFilters({
      query,
      categories,
      sortByPrice: price,
    });
  };

  return (
    <section className="bg-background relative min-h-screen overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20">
      {/* Background */}
      <div className="from-background to-background pointer-events-none absolute inset-0 bg-gradient-to-b via-indigo-100/20 dark:from-slate-950 dark:via-indigo-950/20 dark:to-slate-950" />

      {/* Glow */}
      <div className="pointer-events-none absolute -top-10 left-1/2 h-[280px] w-[280px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl sm:h-[400px] sm:w-[400px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-border/60 bg-card/70 mb-7 overflow-hidden rounded-2xl border p-5 shadow-sm backdrop-blur-xl sm:mb-9 sm:rounded-3xl sm:p-7 md:p-8">
          <div className="flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">
            <Search className="h-4 w-4" />
            Course Discovery
          </div>

          <h1 className="text-foreground mt-3 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            Search Results
          </h1>

          <p className="text-muted-foreground mt-2 text-sm break-words sm:text-base">
            Showing results for{" "}
            <span className="text-primary font-semibold">
              "{query || "All Courses"}"
            </span>
          </p>

          {!isInitialLoading && !isError && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-600 sm:text-sm dark:text-indigo-400">
                <BookOpen className="h-3.5 w-3.5" />
                {courses.length} {courses.length === 1 ? "Course" : "Courses"}{" "}
                Found
              </span>

              {isFetching && (
                <span className="text-muted-foreground inline-flex items-center gap-1.5 text-xs">
                  <RefreshCw className="h-3 w-3 animate-spin" />
                  Updating results...
                </span>
              )}
            </div>
          )}
        </div>

        {/* Search Content */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-7 lg:gap-9">
          {/* Filters */}
          <aside className="w-full shrink-0 md:sticky md:top-24 md:w-64">
            <Filter
              selectedCategories={selectedCategories}
              sortByPrice={sortByPrice}
              handleFilterChange={handleFilterChange}
            />
          </aside>

          {/* Results */}
          <div className="min-w-0 flex-1">
            {isInitialLoading ? (
              <div className="space-y-4 sm:space-y-5">
                {Array.from({ length: 4 }).map((_, index) => (
                  <CourseSkeleton key={index} />
                ))}
              </div>
            ) : isError ? (
              <div className="border-destructive/20 bg-card/60 flex flex-col items-center justify-center rounded-2xl border px-5 py-14 text-center sm:rounded-3xl sm:py-20">
                <div className="bg-destructive/10 mb-5 flex h-16 w-16 items-center justify-center rounded-2xl">
                  <AlertCircle className="text-destructive h-8 w-8" />
                </div>

                <h2 className="text-xl font-bold sm:text-2xl">
                  Something Went Wrong
                </h2>

                <p className="text-muted-foreground mt-2 max-w-md text-sm sm:text-base">
                  We couldn't load the courses right now. Please check your
                  connection and try again.
                </p>

                <Button onClick={() => refetch()} className="mt-6 rounded-xl">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              </div>
            ) : isEmpty ? (
              <CourseNotFound query={query} />
            ) : (
              <div className="space-y-4 sm:space-y-5">
                {courses.map((course) => (
                  <SearchResult key={course._id} course={course} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const CourseNotFound = ({ query }) => {
  return (
    <div className="border-border/60 bg-card/50 flex flex-col items-center justify-center rounded-2xl border px-5 py-14 text-center backdrop-blur-xl sm:rounded-3xl sm:py-20">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10">
        <Search className="h-8 w-8 text-indigo-500" />
      </div>

      <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
        No Courses Found
      </h2>

      <p className="text-muted-foreground mt-3 max-w-md text-sm leading-relaxed sm:text-base">
        {query
          ? `We couldn't find any courses matching "${query}" with your current filters. Try another keyword or remove some filters.`
          : "No courses match your selected filters. Try removing a filter to discover more courses."}
      </p>

      <Button asChild className="mt-6 rounded-xl">
        <Link to="/">
          Browse All Courses
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
};

const CourseSkeleton = () => {
  return (
    <div className="border-border/60 bg-card/60 overflow-hidden rounded-2xl border backdrop-blur-xl sm:rounded-3xl">
      <div className="flex flex-col sm:flex-row">
        <Skeleton className="aspect-video w-full shrink-0 rounded-none sm:aspect-auto sm:h-auto sm:w-56 md:w-64" />

        <div className="flex min-w-0 flex-1 flex-col gap-3 p-4 sm:gap-4 sm:p-5">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-4/5 sm:h-7" />
          <Skeleton className="h-3.5 w-full sm:h-4" />
          <Skeleton className="h-3.5 w-3/4 sm:h-4" />
          <Skeleton className="mt-1 h-5 w-28 sm:h-6 sm:w-32" />

          <div className="mt-auto flex items-center gap-3 pt-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-3.5 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
