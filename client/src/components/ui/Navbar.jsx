import React, { useEffect, useState } from "react";
import { Box, Menu, GraduationCap, LayoutDashboard } from "lucide-react";

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

import { Link, Links, useNavigate } from "react-router-dom";
import { useLogOutUserMutation } from "../../features/api/authApi";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { authApi } from "../../features/api/authApi";
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { user } = useSelector((store) => store.auth);
  // console.log(user);
  const [logOutUser, { data, isSuccess }] = useLogOutUserMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logOutUserHandler = async () => {
    try {
      await logOutUser().unwrap();

      navigate("/login");
      dispatch(authApi.util.resetApiState());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "User Logged Out");
      navigate("/login");
    }
  }, [isSuccess, data, navigate]);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500
      ${
        isScrolled
          ? "border-b border-border/40 bg-background/60 backdrop-blur-3xl supports-[backdrop-filter]:bg-background/50 shadow-sm"
          : "bg-transparent shadow-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link to={"/"}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg">
              <GraduationCap size={22} />
            </div>

            <div>
              <h1 className="text-xl font-extrabold tracking-tight">Cognito</h1>

              <p className="hidden text-xs text-muted-foreground md:block">
                Learn Beyond Limits
              </p>
            </div>
          </div>
        </Link>
        {/* Desktop Navbar */}
        <div className="hidden items-center gap-8 md:flex">
          <nav className="flex items-center gap-6 text-sm font-medium">
            <a
              href="#courses"
              className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
            >
              Courses
            </a>

            <span className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground">
              <Link to="https://dev.to/">Explore</Link>
            </span>

            <span className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground">
              <Link
                to="/about"
                className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
              >
                About
              </Link>
            </span>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeChange />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer ring-2 ring-border transition-all hover:ring-indigo-500">
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
                      <Link to="/my-learning" asChild>
                        <DropdownMenuItem>My Learnings</DropdownMenuItem>
                      </Link>
                    )}

                    <Link to="/profile" asChild>
                      <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                    </Link>

                    <DropdownMenuItem onClick={logOutUserHandler}>
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  {user?.role === "instructor" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <Link to="/admin/dashboard">Dashboard</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3">
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
        <div className="flex items-center gap-3 md:hidden">
          <ThemeChange />
          <MobileNavbar />
        </div>
      </div>
    </header>
  );
}

export default Navbar;

/* ---------------- Mobile Navbar ---------------- */
const MobileNavbar = () => {
  const { user } = useSelector((store) => store.auth);

  const [logOutUser] = useLogOutUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOutUserHandler = async () => {
    try {
      await logOutUser().unwrap();
      dispatch(authApi.util.resetApiState());
      toast.success("User Logged Out");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Logout Failed");
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="rounded-2xl">
          <Menu size={20} />
        </Button>
      </SheetTrigger>

      <SheetContent className="border-l bg-background/95 backdrop-blur-xl">
        <SheetHeader className="mt-4">
          <SheetTitle className="flex items-center gap-2 text-2xl font-extrabold">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white">
              <GraduationCap size={20} />
            </div>
            Cognito
          </SheetTitle>

          <SheetDescription>Elevate your learning experience.</SheetDescription>
        </SheetHeader>

        <Separator className="my-6" />

        <nav className="flex flex-col space-y-5 text-base font-medium">
          <SheetClose asChild>
            <Link to="/" className="transition-colors hover:text-indigo-500">
              Home
            </Link>
          </SheetClose>

          {user ? (
            <>
              {user?.role === "student" && (
                <SheetClose asChild>
                  <Link
                    to="/my-learning"
                    className="transition-colors hover:text-indigo-500"
                  >
                    My Learnings
                  </Link>
                </SheetClose>
              )}

              <SheetClose asChild>
                <Link
                  to="/profile"
                  className="transition-colors hover:text-indigo-500"
                >
                  Edit Profile
                </Link>
              </SheetClose>

              <button
                onClick={logOutUserHandler}
                className="text-left transition-colors hover:text-red-500"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => navigate("/login")}>
                Login
              </Button>

              <Button
                onClick={() => navigate("/login")}
                className="bg-gradient-to-r from-indigo-500 to-violet-500"
              >
                Signup
              </Button>
            </>
          )}
        </nav>

        {user?.role === "instructor" && (
          <SheetFooter className="absolute bottom-6 left-0 w-full px-6">
            <SheetClose asChild>
              <Button
                asChild
                className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600"
              >
                <Link to="/admin/dashboard">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
