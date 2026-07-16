import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

import Filter from "./Filter";
import SearchResult from "./SearchResult";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useGetSearchCourseQuery } from "@/features/api/courseApi";

const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") || "";

  const [selectedCategories, setSelectedCategories] = useState([]);

  const [sortByPrice, setSortByPrice] = useState("");

  const { data, isLoading } = useGetSearchCourseQuery({
    searchQuery: query,
    categories: selectedCategories,
    sortByPrice,
  });

  const isEmpty = !isLoading && data?.courses?.length === 0;

  const handleFilterChange = (categories, price) => {
    setSelectedCategories(categories);
    setSortByPrice(price);
  };

  return (
    <div className="min-h-screen mt-11 bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 rounded-3xl border bg-card p-6">
          <h1 className="text-3xl font-bold">Search Results</h1>

          <p className="mt-2 text-muted-foreground">
            Showing results for{" "}
            <span className="font-semibold text-primary">"{query}"</span>
          </p>

          {!isLoading && (
            <p className="mt-2 text-sm text-muted-foreground">
              {data?.courses?.length || 0} courses found
            </p>
          )}
        </div>

        <div className="flex flex-col gap-8 md:flex-row">
          <Filter handleFilterChange={handleFilterChange} />

          <div className="flex-1">
            {isLoading ? (
              <div className="space-y-5">
                {Array.from({
                  length: 4,
                }).map((_, index) => (
                  <CourseSkeleton key={index} />
                ))}
              </div>
            ) : isEmpty ? (
              <CourseNotFound />
            ) : (
              <div className="space-y-5">
                {data?.courses?.map((course) => (
                  <SearchResult key={course._id} course={course} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

const CourseNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border py-20 text-center">
      <AlertCircle className="h-20 w-20 text-muted-foreground mb-5" />

      <h2 className="text-3xl font-bold">No Courses Found</h2>

      <p className="mt-3 max-w-md text-muted-foreground">
        We couldn't find any course matching your search. Try another keyword or
        remove some filters.
      </p>

      <Link to="/" className="mt-6">
        <Button>Browse All Courses</Button>
      </Link>
    </div>
  );
};

const CourseSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-2xl border">
      <div className="flex flex-col md:flex-row">
        <Skeleton className="h-52 w-full md:w-72" />

        <div className="flex-1 p-5 space-y-3">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-6 w-32" />
        </div>
      </div>
    </div>
  );
};
