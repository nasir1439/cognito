// mongoDB username - syednasirhussain1439_db_user
// password - UGzpCLdDtFN8Yqio

//mongodbURI - mongodb+srv://syednasirhussain1439_db_user:UGzpCLdDtFN8Yqio@cluster0.dv2fsro.mongodb.net/
//mongoDBURI - mongodb+srv://syednasirhussain1439_db_user:UGzpCLdDtFN8Yqio@cluster0.dv2fsro.mongodb.net/

import "./App.css";
import { Button } from "@/components/ui/button";
import Login from "./pages/login";
import Navbar from "./components/ui/Navbar";
import HeroSection from "./pages/student/HeroSection";
import MainLayout from "./layout/MainLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Courses from "./pages/student/Courses";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";
import SideBar from "./pages/admin/SideBar";
import Dashboard from "./pages/admin/Dashboard";
import CourseTable from "./pages/admin/course/CourseTable";
import AddCourse from "./pages/admin/course/AddCourse";
import EditCourse from "./pages/admin/course/EditCourse";
import CreateLecture from "./pages/admin/lectures/CreateLecture";
import EditLecture from "./pages/admin/lectures/EditLecture";
import CourseDetails from "./pages/student/CourseDetails";
import CourseProgress from "./pages/student/CourseProgress";
import SearchPage from "./pages/student/SearchPage";
import CategoriesPage from "./pages/student/CategoriesPage";
import { AdminRoute, AuthenticatedUser } from "./components/ProtectedRoutes";
import ProtectedRoute from "./components/ProtectedRoute";
import PurchaseCourseProtectedRoute from "./components/PurchaseCourseProtedtedRoute";
import AboutUs from "./pages/student/AboutUs";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <Courses />
          </>
        ),
      },
      {
        path: "login",
        element: (
          <AuthenticatedUser>
            <Login />
          </AuthenticatedUser>
        ),
      },
      {
        path: "my-learning",
        element: (
          <ProtectedRoute>
            <MyLearning />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "course/search",
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/categories",
        element: <CategoriesPage />,
      },
      {
        path: "course-detail/:courseId",
        element: (
          <ProtectedRoute>
            <CourseDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "course-progress/:courseId",
        element: (
          <ProtectedRoute>
            <PurchaseCourseProtectedRoute>
              <CourseProgress />
            </PurchaseCourseProtectedRoute>
          </ProtectedRoute>
        ),
      },
      //Admin Routes
      {
        path: "admin",
        element: (
          <AdminRoute>
            <SideBar />
          </AdminRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "course",
            element: <CourseTable />,
          },
          {
            path: "course/create",
            element: <AddCourse />,
          },
          {
            path: "course/:courseId",
            element: <EditCourse />,
          },
          {
            path: "course/:courseId/lecture",
            element: <CreateLecture />,
          },
          {
            path: "course/:courseId/lecture/:lectureId",
            element: <EditLecture />,
          },
        ],
      },
      // Main Error Route
      // {
      //   path: "*",
      //   element: <ErrorPage />,
      // },
    ],
  },
]);
function App() {
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App;
