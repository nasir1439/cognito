import React, { useState } from "react";
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
];

const Filter = ({ handleFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) => {
      const updatedCategories = prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId];

      handleFilterChange(updatedCategories, sortByPrice);

      return updatedCategories;
    });
  };

  const handlePriceChange = (value) => {
    setSortByPrice(value);
    handleFilterChange(selectedCategories, value);
  };

  return (
    <div className="w-full md:w-[280px]">
      <div className="sticky top-24 rounded-2xl border bg-card p-5 shadow-sm">
        <h2 className="text-xl font-bold">Filter Courses</h2>

        <p className="text-sm text-muted-foreground mt-1">
          Narrow down your search results
        </p>

        <Separator className="my-5" />

        <div>
          <Label className="font-semibold">Sort by Price</Label>

          <Select onValueChange={handlePriceChange}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select option" />
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

        <Separator className="my-5" />

        <div>
          <h3 className="font-semibold mb-3">Categories</h3>

          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center gap-3">
                <Checkbox
                  id={category.id}
                  onCheckedChange={() => handleCategoryChange(category.id)}
                />

                <Label htmlFor={category.id} className="cursor-pointer">
                  {category.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
