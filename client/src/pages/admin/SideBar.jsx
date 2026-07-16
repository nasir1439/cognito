import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ChartNoAxesColumn, SquareLibrary, Sparkles } from "lucide-react";

const SideBar = () => {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      icon: ChartNoAxesColumn,
      path: "dashboard",
    },
    {
      name: "Course",
      icon: SquareLibrary,
      path: "course",
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-[280px] flex-col sticky top-16 h-[calc(100vh-4rem)] overflow-hidden border-r border-white/10 bg-white/10 dark:bg-black/10 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/5 mt-16">
        {/* Gradient Glow */}
        <div className="absolute top-24 left-10 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="absolute bottom-10 right-0 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />

        {/* Navigation */}
        <div className="relative mt-8 flex flex-col gap-3 px-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`group relative flex items-center gap-4 overflow-hidden rounded-2xl px-4 py-3 transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500/80 to-violet-500/80 text-white shadow-lg shadow-indigo-500/20 backdrop-blur-xl"
                    : "text-muted-foreground hover:bg-white/10 dark:hover:bg-white/5 hover:text-foreground"
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-xl" />
                )}

                <item.icon
                  size={22}
                  className={`relative z-10 transition-all duration-300 group-hover:scale-110 ${
                    isActive ? "text-white" : "text-indigo-400"
                  }`}
                />

                <span className="relative z-10 text-sm font-semibold tracking-wide">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Bottom Card */}
        <div className="relative mt-auto p-5">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-violet-500/10" />

            <div className="relative">
              <div className="mb-3 flex items-center gap-2">
                <Sparkles className="text-indigo-400" size={18} />

                <h2 className="text-lg font-bold">Teaching Hub</h2>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                Manage your courses, track students, and create beautiful
                learning experiences.
              </p>

              <button className="mt-5 w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/30">
                Explore Features
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 mt-16 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default SideBar;
