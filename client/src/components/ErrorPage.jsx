import React from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl" />
      </div>

      {/* Card */}
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center shadow-2xl backdrop-blur-xl">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/30">
          <AlertTriangle className="h-12 w-12 text-white" />
        </div>

        {/* Error Code */}
        <h1 className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-7xl font-extrabold text-transparent">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-4 text-3xl font-bold tracking-tight">
          Oops! Page Not Found
        </h2>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          The page you are looking for doesn’t exist or has been moved. Please
          check the URL or return back to the dashboard.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="h-11 rounded-2xl border-white/10 bg-white/5 px-6 backdrop-blur-xl hover:bg-white/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>

          <Button
            onClick={() => navigate("/")}
            className="h-11 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 px-8 font-semibold text-white transition-all duration-300 hover:from-indigo-600 hover:to-violet-600 hover:shadow-lg hover:shadow-indigo-500/30"
          >
            <Home className="mr-2 h-4 w-4" />
            Back To Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
