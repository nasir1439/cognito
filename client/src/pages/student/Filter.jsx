import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { SlidersHorizontal, ArrowUpDown, RotateCcw, Tags } from "lucide-react";

const categories = [
  { id: "nextjs", label: "Next JS" },
  { id: "data science", label: "Data Science" },
  { id: "frontend development", label: "Frontend Development" },
  { id: "fullstack development", label: "Fullstack Development" },
  { id: "mern stack development", label: "MERN Stack Development" },
  { id: "backend development", label: "Backend Development" },
  { id: "javascript", label: "Javascript" },
  { id: "python", label: "Python" },
  { id: "docker", label: "Docker" },
  { id: "mongodb", label: "MongoDB" },
  { id: "html", label: "HTML" },
  { id: "react", label: "React Js" },
  { id: "java", label: "java" },
];

const Filter = ({ handleFilterChange, selectedCategories, sortByPrice }) => {
  const handleCategoryChange = (categoryId) => {
    const updatedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

    handleFilterChange(updatedCategories, sortByPrice);
  };

  const handlePriceChange = (value) => {
    handleFilterChange(selectedCategories, value);
  };

  const handleClearFilters = () => {
    handleFilterChange([], "");
  };

  const hasActiveFilters = selectedCategories.length > 0 || sortByPrice !== "";

  return (
    <div className="w-full md:w-64 lg:w-[280px]">
      <div className="border-border/60 bg-card/70 rounded-2xl border p-4 shadow-sm backdrop-blur-xl sm:rounded-3xl sm:p-5 md:sticky md:top-24">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <SlidersHorizontal className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-base font-bold sm:text-lg">Filter Courses</h2>
              <p className="text-muted-foreground mt-0.5 text-xs">
                Refine your search
              </p>
            </div>
          </div>

          {hasActiveFilters && (
            <span className="shrink-0 rounded-full bg-indigo-500/10 px-2.5 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              {selectedCategories.length + (sortByPrice ? 1 : 0)} Active
            </span>
          )}
        </div>

        <Separator className="my-5" />

        {/* Price Sorting */}
        <div>
          <div className="mb-2.5 flex items-center gap-2">
            <ArrowUpDown className="text-muted-foreground h-4 w-4" />
            <Label className="text-sm font-semibold">Sort by Price</Label>
          </div>

          <Select value={sortByPrice} onValueChange={handlePriceChange}>
            <SelectTrigger className="border-border/70 bg-background/70 h-10 w-full rounded-xl text-sm">
              <SelectValue placeholder="Select price order" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Price</SelectLabel>
                <SelectItem value="low">Low to High</SelectItem>
                <SelectItem value="high">High to Low</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters */}
        <Button
          type="button"
          variant="outline"
          onClick={handleClearFilters}
          disabled={!hasActiveFilters}
          className="border-border/70 mt-3 h-9 w-full rounded-xl text-xs font-medium transition-colors hover:border-indigo-500/40 hover:bg-indigo-500/5 hover:text-indigo-600 sm:text-sm dark:hover:text-indigo-400"
        >
          <RotateCcw className="mr-2 h-3.5 w-3.5" />
          Clear All Filters
        </Button>

        <Separator className="my-5" />

        {/* Categories */}
        <div>
          <div className="mb-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Tags className="text-muted-foreground h-4 w-4" />
              <h3 className="text-sm font-semibold">Categories</h3>
            </div>

            <span className="text-muted-foreground text-xs">
              {selectedCategories.length} selected
            </span>
          </div>

          <div className="max-h-72 space-y-1 overflow-y-auto pr-1 sm:max-h-80">
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(category.id);

              return (
                <div
                  key={category.id}
                  className={`flex items-center gap-3 rounded-xl px-2.5 py-2 transition-colors ${
                    isSelected ? "bg-indigo-500/10" : "hover:bg-muted/60"
                  }`}
                >
                  <Checkbox
                    id={category.id}
                    checked={isSelected}
                    onCheckedChange={() => handleCategoryChange(category.id)}
                    className="shrink-0"
                  />

                  <Label
                    htmlFor={category.id}
                    className={`flex-1 cursor-pointer text-sm leading-relaxed ${
                      isSelected
                        ? "font-medium text-indigo-600 dark:text-indigo-400"
                        : "text-muted-foreground font-normal"
                    }`}
                  >
                    {category.label}
                  </Label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
