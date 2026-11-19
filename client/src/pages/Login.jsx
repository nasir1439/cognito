import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Loader2, BookOpen, GraduationCap, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../features/api/authApi";

const Login = () => {
  const [signUpInput, setSignUpInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const [registerUser, { isLoading: registerIsLoading }] =
    useRegisterUserMutation();

  const [loginUser, { isLoading: loginIsLoading }] = useLoginUserMutation();

  const navigate = useNavigate();

  // Handle input changes
  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;

    if (type === "signup") {
      setSignUpInput((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setLoginInput((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle Login and Registration
  const handleRegistration = async (e, type) => {
    e.preventDefault();

    try {
      const inputData = type === "signup" ? signUpInput : loginInput;

      if (type === "signup") {
        const res = await registerUser(inputData).unwrap();

        toast.success(res?.message || "Account created successfully");
      } else {
        const res = await loginUser(inputData).unwrap();

        toast.success(res?.message || "Welcome back!");

        navigate("/");
      }
    } catch (error) {
      toast.error(
        error?.data?.message ||
          error?.message ||
          "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <section className="bg-background relative isolate flex min-h-[calc(100vh-5rem)] w-full items-center justify-center overflow-hidden px-4 py-10 sm:px-6 sm:py-14">
      {/* Background Effects */}
      <div className="via-background dark:via-background pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-indigo-100/30 to-violet-100/20 dark:from-indigo-950/20 dark:to-violet-950/20" />

      <div className="pointer-events-none absolute top-10 -left-32 -z-10 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl sm:h-80 sm:w-80" />

      <div className="pointer-events-none absolute -right-32 -bottom-32 -z-10 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl sm:h-96 sm:w-96" />

      {/* Authentication Container */}
      <div className="mx-auto mt-10 w-full max-w-md">
        {/* Tabs */}
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="border-border/60 bg-muted/60 grid h-12 w-full grid-cols-2 rounded-xl border p-1">
            <TabsTrigger
              value="login"
              className="data-[state=active]:bg-background data-[state=active]:text-primary rounded-lg text-sm font-semibold transition-all data-[state=active]:shadow-sm"
            >
              Login
            </TabsTrigger>

            <TabsTrigger
              value="signup"
              className="data-[state=active]:bg-background data-[state=active]:text-primary rounded-lg text-sm font-semibold transition-all data-[state=active]:shadow-sm"
            >
              Create Account
            </TabsTrigger>
          </TabsList>

          {/* Signup */}
          <TabsContent value="signup" className="mt-4 sm:mt-5">
            <Card className="border-border/60 bg-card overflow-hidden rounded-2xl border shadow-xl shadow-indigo-500/5 sm:rounded-3xl">
              <CardHeader className="space-y-2 p-5 sm:p-7">
                <div className="bg-primary/10 mb-1 flex h-10 w-10 items-center justify-center rounded-xl">
                  <BookOpen className="text-primary h-5 w-5" />
                </div>

                <CardTitle className="text-xl font-bold sm:text-2xl">
                  Create your account
                </CardTitle>

                <CardDescription className="text-sm leading-relaxed">
                  Join Cognito and start learning new skills today.
                </CardDescription>
              </CardHeader>

              <form onSubmit={(e) => handleRegistration(e, "signup")}>
                <CardContent className="grid gap-4 px-5 pb-5 sm:gap-5 sm:px-7 sm:pb-6">
                  {/* Username */}
                  <div className="grid gap-2">
                    <Label htmlFor="signup-name">Full Name</Label>

                    <Input
                      id="signup-name"
                      type="text"
                      name="name"
                      value={signUpInput.name}
                      placeholder="Enter your name"
                      onChange={(e) => changeInputHandler(e, "signup")}
                      autoComplete="name"
                      required
                      disabled={registerIsLoading}
                      className="h-11 rounded-xl"
                    />
                  </div>

                  {/* Email */}
                  <div className="grid gap-2">
                    <Label htmlFor="signup-email">Email Address</Label>

                    <Input
                      id="signup-email"
                      type="email"
                      name="email"
                      value={signUpInput.email}
                      placeholder="you@example.com"
                      onChange={(e) => changeInputHandler(e, "signup")}
                      autoComplete="email"
                      required
                      disabled={registerIsLoading}
                      className="h-11 rounded-xl"
                    />
                  </div>

                  {/* Password */}
                  <div className="grid gap-2">
                    <Label htmlFor="signup-password">Password</Label>

                    <Input
                      id="signup-password"
                      type="password"
                      name="password"
                      value={signUpInput.password}
                      placeholder="Create a password"
                      onChange={(e) => changeInputHandler(e, "signup")}
                      autoComplete="new-password"
                      required
                      disabled={registerIsLoading}
                      className="h-11 rounded-xl"
                    />
                  </div>
                </CardContent>

                <CardFooter className="px-5 pb-5 sm:px-7 sm:pb-7">
                  <Button
                    type="submit"
                    disabled={registerIsLoading || loginIsLoading}
                    className="h-11 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-sm font-semibold text-white transition-all hover:from-indigo-600 hover:to-violet-600 hover:shadow-lg hover:shadow-indigo-500/20"
                  >
                    {registerIsLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          {/* Login */}
          <TabsContent value="login" className="mt-4 sm:mt-5">
            <Card className="border-border/60 bg-card overflow-hidden rounded-2xl border shadow-xl shadow-indigo-500/5 sm:rounded-3xl">
              <CardHeader className="space-y-2 p-5 sm:p-7">
                <div className="bg-primary/10 mb-1 flex h-10 w-10 items-center justify-center rounded-xl">
                  <GraduationCap className="text-primary h-5 w-5" />
                </div>

                <CardTitle className="text-xl font-bold sm:text-2xl">
                  Welcome Back!
                </CardTitle>

                <CardDescription className="text-sm leading-relaxed">
                  Sign in to continue your learning journey.
                </CardDescription>
              </CardHeader>

              <form onSubmit={(e) => handleRegistration(e, "login")}>
                <CardContent className="grid gap-4 px-5 pb-5 sm:gap-5 sm:px-7 sm:pb-6">
                  {/* Email */}
                  <div className="grid gap-2">
                    <Label htmlFor="login-email">Email Address</Label>

                    <Input
                      id="login-email"
                      type="email"
                      name="email"
                      value={loginInput.email}
                      placeholder="you@example.com"
                      onChange={(e) => changeInputHandler(e, "login")}
                      autoComplete="email"
                      required
                      disabled={loginIsLoading}
                      className="h-11 rounded-xl"
                    />
                  </div>

                  {/* Password */}
                  <div className="grid gap-2">
                    <Label htmlFor="login-password">Password</Label>

                    <Input
                      id="login-password"
                      type="password"
                      name="password"
                      value={loginInput.password}
                      placeholder="Enter your password"
                      onChange={(e) => changeInputHandler(e, "login")}
                      autoComplete="current-password"
                      required
                      disabled={loginIsLoading}
                      className="h-11 rounded-xl"
                    />
                  </div>
                </CardContent>

                <CardFooter className="px-5 pb-5 sm:px-7 sm:pb-7">
                  <Button
                    type="submit"
                    disabled={loginIsLoading || registerIsLoading}
                    className="h-11 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-sm font-semibold text-white transition-all hover:from-indigo-600 hover:to-violet-600 hover:shadow-lg hover:shadow-indigo-500/20"
                  >
                    {loginIsLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      "Login to Your Account"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Bottom Note */}
        <p className="text-muted-foreground mt-6 text-center text-xs leading-relaxed sm:mt-7 sm:text-sm">
          By continuing, you agree to use Cognito responsibly and make the most
          of your learning experience.
        </p>
      </div>
    </section>
  );
};

export default Login;
