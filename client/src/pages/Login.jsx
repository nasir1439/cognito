import { AppWindowIcon, CodeIcon, Loader2 } from "lucide-react";

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
import { useState } from "react";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../features/api/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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

  const [
    registerUser,
    {
      // data: registerData,
      // error: registerError,
      isLoading: registerIsLoading,
      // isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();

  const [
    loginUser,
    {
      // data: loginData,
      // error: loginError,
      isLoading: loginIsLoading,
      // isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  const navigate = useNavigate();

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignUpInput({ ...signUpInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  // const handleRegistration = async (type) => {
  //   const inputData = type === "signup" ? signUpInput : loginInput;
  //   // console.log(inputData);
  //   const action = type === "signup" ? registerUser : loginUser;
  //   await action(inputData);
  // };

  const handleRegistration = async (type) => {
    try {
      const inputData = type === "signup" ? signUpInput : loginInput;

      if (type === "signup") {
        const res = await registerUser(inputData).unwrap();
        toast.success(res.message || "Account created successfully");
      } else {
        const res = await loginUser(inputData).unwrap();
        toast.success(res.message || "Welcome back");
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  // useEffect(() => {
  //   if (registerIsSuccess && registerData) {
  //     toast.success(registerData.message || "Signup successful");
  //   }
  //   if (registerError) {
  //     toast.error(registerError.data.message || "Signup failed");
  //   }
  //   if (loginIsSuccess && loginData) {
  //     toast.success(loginData.message || "Login successful");
  //   }
  //   if (loginError) {
  //     toast.error(loginError.data.message || "Login failed");
  //   }
  // }, [
  //   loginIsLoading,
  //   registerIsLoading,
  //   loginData,
  //   registerData,
  //   loginError,
  //   registerError,
  // ]);

  return (
    <div className="flex items-center w-full justify-center mt-20">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Tabs defaultValue="login">
          <TabsList>
            <TabsTrigger value="signup">Signup</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Signup</CardTitle>
                <CardDescription>
                  Create a new account and click signup when you're done
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="Username">Username</Label>
                  <Input
                    type="text"
                    id="Username"
                    name="name"
                    value={signUpInput.name}
                    placeholder="Eg.syed"
                    onChange={(e) => changeInputHandler(e, "signup")}
                    required={true}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={signUpInput.email}
                    placeholder="Eg.syed@gmail.com"
                    onChange={(e) => changeInputHandler(e, "signup")}
                    required={true}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    value={signUpInput.password}
                    placeholder="Eg.xyz"
                    onChange={(e) => changeInputHandler(e, "signup")}
                    required={true}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  disabled={registerIsLoading}
                  onClick={() => handleRegistration("signup")}
                >
                  {registerIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> please
                      wait...
                    </>
                  ) : (
                    "Signup"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Login your password here. after signup you 'll be logged in.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={loginInput.email}
                    placeholder="Eg.syed@gmail.com"
                    onChange={(e) => changeInputHandler(e, "login")}
                    required={true}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">password</Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    value={loginInput.password}
                    placeholder="Eg.xyz"
                    onChange={(e) => changeInputHandler(e, "login")}
                    required={true}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  disabled={loginIsLoading}
                  onClick={() => handleRegistration("login")}
                >
                  {loginIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> please
                      wait...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
