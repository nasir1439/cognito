import { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { appStore } from "./app/store";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { useLoadUserQuery } from "./features/api/authApi.js";
import PageLoader from "./components/PageLoader.jsx";

const Custom = ({ children }) => {
  const { isLoading } = useLoadUserQuery();
  return <>{isLoading ? <PageLoader /> : <>{children}</>}</>;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={appStore}>
        <Custom>
          <App />
          <Toaster />
        </Custom>
      </Provider>
    </ThemeProvider>
  </StrictMode>,
);
