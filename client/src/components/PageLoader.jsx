import React from "react";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-background">
      {/* Background Glow */}
      <div className="absolute h-[350px] w-[350px] rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="relative flex flex-col items-center justify-center">
        {/* Rotating Ring */}
        <div className="absolute h-40 w-40 animate-spin rounded-full border-[3px] border-indigo-500/10 border-t-indigo-500 border-r-violet-500" />

        {/* Cognito Text */}
        <h1 className="relative bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-3xl font-extrabold tracking-[0.35em] text-transparent">
          COGNITO
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-sm text-muted-foreground">
          Preparing your learning experience...
        </p>

        {/* Dots */}
        <div className="mt-6 flex items-center gap-2">
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-indigo-500 [animation-delay:-0.3s]" />
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-violet-500 [animation-delay:-0.15s]" />
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-indigo-500" />
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
