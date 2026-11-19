import React, { useEffect, useState } from "react";
import {
  Menu,
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  UserRound,
  LogOut,
  Home,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import ThemeChange from "../../ThemeChange";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Link, useNavigate } from "react-router-dom";
import { useLogOutUserMutation, authApi } from "../../features/api/authApi";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  const { user } = useSelector((store) => store.auth);
  const [logOutUser] = useLogOutUserMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logOutUserHandler = async () => {
    try {
      await logOutUser().unwrap();
      dispatch(authApi.util.resetApiState());
      toast.success("User Logged Out");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error(error?.data?.message || "Logout Failed");
    }
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-border/40 bg-background/80 supports-[backdrop-filter]:bg-background/60 border-b shadow-sm backdrop-blur-3xl"
          : "bg-transparent shadow-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-5 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-2.5 sm:gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg sm:h-10 sm:w-10 sm:rounded-2xl">
            <GraduationCap size={21} />
          </div>

          <div>
            <h1 className="text-lg font-extrabold tracking-tight sm:text-xl">
              Cognito
            </h1>

            <p className="text-muted-foreground hidden text-xs md:block">
              Learn Beyond Limits
            </p>
          </div>
        </Link>

        {/* Desktop Navbar */}
        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          <nav className="flex items-center gap-5 text-sm font-medium lg:gap-6">
            <a
              href="/#courses"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Courses
            </a>

            <Link
              to="https://dev.to/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Explore
            </Link>

            <Link
              to="/about"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeChange />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="ring-border cursor-pointer ring-2 transition-all hover:ring-indigo-500">
                    <AvatarImage
                      src={user?.photoUrl || "https://github.com/shadcn.png"}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56 rounded-2xl" align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    {user?.role === "student" && (
                      <DropdownMenuItem asChild>
                        <Link to="/my-learning">
                          <BookOpen className="mr-2 h-4 w-4" />
                          My Learnings
                        </Link>
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuItem asChild>
                      <Link to="/profile">
                        <UserRound className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Link>
                    </DropdownMenuItem>

                    {user?.role === "instructor" && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin/dashboard">
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={logOutUserHandler}
                      className="text-red-500 focus:text-red-500"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  className="rounded-xl"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>

                <Button
                  className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-300 hover:from-indigo-600 hover:to-violet-600"
                  onClick={() => navigate("/login")}
                >
                  Signup
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="flex shrink-0 items-center gap-2 md:hidden">
          <ThemeChange />
          <MobileNavbar user={user} onLogout={logOutUserHandler} />
        </div>
      </div>
    </header>
  );
}

export default Navbar;

/* ---------------- Mobile Navbar ---------------- */

const MobileNavbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          aria-label="Open navigation menu"
          className="border-border/70 h-9 w-9 rounded-xl sm:h-10 sm:w-10"
        >
          <Menu size={20} />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="border-border/60 bg-background/95 flex w-[85%] max-w-[340px] flex-col border-l p-5 backdrop-blur-xl sm:p-6"
      >
        <SheetHeader className="mt-3 space-y-3 text-left">
          <SheetTitle className="flex items-center gap-3 text-xl font-extrabold">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-md">
              <GraduationCap size={21} />
            </div>
            Cognito
          </SheetTitle>

          <SheetDescription className="text-muted-foreground text-sm">
            Elevate your learning experience.
          </SheetDescription>
        </SheetHeader>

        <Separator className="my-6" />

        <nav className="flex flex-1 flex-col gap-2 text-sm font-medium">
          <SheetClose asChild>
            <Link
              to="/"
              className="text-muted-foreground hover:bg-muted hover:text-foreground flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 transition-colors"
            >
              <Home size={18} />
              Home
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <a
              href="/#courses"
              className="text-muted-foreground hover:bg-muted hover:text-foreground flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 transition-colors"
            >
              <BookOpen size={18} />
              Courses
            </a>
          </SheetClose>

          <SheetClose asChild>
            <Link
              to="https://dev.to/"
              className="text-muted-foreground hover:bg-muted hover:text-foreground flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 transition-colors"
            >
              Explore
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link
              to="/about"
              className="text-muted-foreground hover:bg-muted hover:text-foreground flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 transition-colors"
            >
              About
            </Link>
          </SheetClose>

          {user && (
            <>
              <Separator className="my-3" />

              {user?.role === "student" && (
                <SheetClose asChild>
                  <Link
                    to="/my-learning"
                    className="text-muted-foreground hover:bg-muted hover:text-foreground flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 transition-colors"
                  >
                    <BookOpen size={18} />
                    My Learnings
                  </Link>
                </SheetClose>
              )}

              <SheetClose asChild>
                <Link
                  to="/profile"
                  className="text-muted-foreground hover:bg-muted hover:text-foreground flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 transition-colors"
                >
                  <UserRound size={18} />
                  Edit Profile
                </Link>
              </SheetClose>

              {user?.role === "instructor" && (
                <SheetClose asChild>
                  <Link
                    to="/admin/dashboard"
                    className="text-muted-foreground hover:bg-muted hover:text-foreground flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 transition-colors"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>
                </SheetClose>
              )}
            </>
          )}
        </nav>

        <SheetFooter className="border-border/60 mt-auto flex-col gap-3 border-t pt-5 sm:flex-col">
          {user ? (
            <Button
              variant="outline"
              onClick={onLogout}
              className="min-h-11 w-full justify-center rounded-xl text-red-500 hover:bg-red-500/10 hover:text-red-500"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => navigate("/login")}
                className="min-h-11 w-full rounded-xl"
              >
                Login
              </Button>

              <Button
                onClick={() => navigate("/login")}
                className="min-h-11 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600"
              >
                Signup
              </Button>
            </>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
