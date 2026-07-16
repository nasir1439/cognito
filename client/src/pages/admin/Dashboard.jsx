import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetPurchasedCoursesQuery } from "@/features/api/purchaseApi";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { DollarSign, ShoppingCart, TrendingUp, BookOpen } from "lucide-react";

const Dashboard = () => {
  const { data, isLoading, isError } = useGetPurchasedCoursesQuery();

  if (isLoading)
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <h1 className="text-lg text-muted-foreground">Loading Dashboard...</h1>
      </div>
    );

  if (isError)
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <h1 className="text-red-500">Failed to load dashboard data</h1>
      </div>
    );

  const purchasedCourse = data?.purchasedCourse || [];

  const courseData = purchasedCourse.map((purchase) => ({
    name: purchase.courseId?.courseTitle,
    revenue: purchase.amount,
  }));

  const totalRevenue = purchasedCourse.reduce(
    (acc, item) => acc + (item.amount || 0),
    0,
  );

  const totalSales = purchasedCourse.length;

  const totalCourses = new Set(
    purchasedCourse.map((item) => item.courseId?._id),
  ).size;

  return (
    <div className="relative min-h-screen overflow-hidden p-6">
      {/* Background Glow */}
      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative z-10 space-y-8">
        {/* Header */}
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
            Instructor Analytics
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            Dashboard{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
              Overview
            </span>
          </h1>

          <p className="mt-2 text-muted-foreground">
            Track your revenue, course performance, and student purchases.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <Card className="border-white/10 bg-white/10 backdrop-blur-xl shadow-xl">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <h2 className="mt-2 text-3xl font-bold">
                  ₹{totalRevenue.toLocaleString()}
                </h2>
              </div>

              <div className="rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 p-3">
                <DollarSign className="text-white" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/10 backdrop-blur-xl shadow-xl">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-muted-foreground">Total Sales</p>
                <h2 className="mt-2 text-3xl font-bold">{totalSales}</h2>
              </div>

              <div className="rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 p-3">
                <ShoppingCart className="text-white" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/10 backdrop-blur-xl shadow-xl">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-muted-foreground">
                  Published Courses
                </p>
                <h2 className="mt-2 text-3xl font-bold">{totalCourses}</h2>
              </div>

              <div className="rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 p-3">
                <BookOpen className="text-white" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/10 backdrop-blur-xl shadow-xl">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-muted-foreground">Average Revenue</p>
                <h2 className="mt-2 text-3xl font-bold">
                  ₹{totalSales ? Math.round(totalRevenue / totalSales) : 0}
                </h2>
              </div>

              <div className="rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 p-3">
                <TrendingUp className="text-white" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Chart */}
        <Card className="border-white/10 bg-white/10 backdrop-blur-xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Revenue Performance</CardTitle>
          </CardHeader>

          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={courseData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="name"
                  angle={-20}
                  textAnchor="end"
                  interval={0}
                />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="revenue"
                  strokeWidth={4}
                  stroke="#6366f1"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Purchases */}
        <Card className="border-white/10 bg-white/10 backdrop-blur-xl shadow-xl">
          <CardHeader>
            <CardTitle>Recent Purchases</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {purchasedCourse.slice(0, 5).map((purchase) => (
                <div
                  key={purchase._id}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-background/40 p-4"
                >
                  <div>
                    <h3 className="font-medium">
                      {purchase.courseId?.courseTitle}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      Purchase ID: {purchase.paymentId}
                    </p>
                  </div>

                  <div className="font-semibold text-indigo-500">
                    ₹{purchase.amount}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
