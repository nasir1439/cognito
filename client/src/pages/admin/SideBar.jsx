import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ChartNoAxesColumn, SquareLibrary, Sparkles } from "lucide-react";

const SideBar = () => {
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
      {/* Desktop Sidebar */}
      <aside className="sticky top-16 mt-16 hidden h-[calc(100vh-4rem)] w-[280px] flex-col overflow-hidden border-r border-white/10 bg-white/10 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/5 lg:flex dark:bg-black/10">
        {/* Gradient Glow */}
        <div className="absolute top-24 left-10 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="absolute right-0 bottom-10 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />

        {/* Desktop Navigation */}
        <div className="relative mt-8 flex flex-col gap-3 px-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={`/admin/${item.path}`}
              end={item.path === "dashboard"}
              className={({ isActive }) =>
                `group relative flex items-center gap-4 overflow-hidden rounded-2xl px-4 py-3 transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500/80 to-violet-500/80 text-white shadow-lg shadow-indigo-500/20 backdrop-blur-xl"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/10 dark:hover:bg-white/5"
                }`
              }
            >
              {({ isActive }) => (
                <>
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
                </>
              )}
            </NavLink>
          ))}
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

              <p className="text-muted-foreground text-sm leading-relaxed">
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
      <main className="mt-20 w-full min-w-0 flex-1 p-0 pb-24 sm:p-3 md:p-6 lg:pb-6">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="bg-background/95 fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-white/10 p-3 backdrop-blur-xl lg:hidden">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={`/admin/${item.path}`}
            end={item.path === "dashboard"}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 rounded-xl px-6 py-2 transition-all duration-300 ${
                isActive
                  ? "text-indigo-500"
                  : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            <item.icon size={22} />

            <span className="text-xs font-semibold">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default SideBar;
