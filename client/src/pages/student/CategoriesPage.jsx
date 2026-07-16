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
} from "lucide-react";

const categories = [
  {
    title: "Frontend Development",
    value: "frontend development",
    icon: Globe,
  },
  {
    title: "Backend Development",
    value: "backend development",
    icon: Server,
  },
  {
    title: "Fullstack Development",
    value: "fullstack development",
    icon: Code2,
  },
  {
    title: "MERN Stack",
    value: "mern stack development",
    icon: Boxes,
  },
  {
    title: "Data Science",
    value: "data science",
    icon: Database,
  },
  {
    title: "Python",
    value: "python",
    icon: Cpu,
  },
  {
    title: "nextjs",
    value: "nextjs",
    icon: Atom,
  },
  {
    title: "javascript",
    value: "javascript",
    icon: Layers3,
  },
  {
    title: "mongodb",
    value: "mongodb",
    icon: DatabaseZap,
  },
];

const CategoriesPage = () => {
  const navigate = useNavigate();

  const categoryHandler = (category) => {
    // navigate(`/course/search?categories=${encodeURIComponent(category)}`);
    navigate(`/course/search?query=${category}`);
  };

  return (
    <div className="min-h-screen mt-15 bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">Browse Categories</h1>

          <p className="mt-3 text-muted-foreground text-lg">
            Choose a category and start learning
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <div
                key={category.value}
                onClick={() => categoryHandler(category.value)}
                className="group cursor-pointer rounded-3xl border bg-card p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Icon className="h-7 w-7 text-primary" />
                </div>

                <h2 className="text-xl font-bold">{category.title}</h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  Explore courses in {category.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
