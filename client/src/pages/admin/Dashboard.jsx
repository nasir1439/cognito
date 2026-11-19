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
        <h1 className="text-muted-foreground text-lg">Loading Dashboard...</h1>
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
    <div className="relative w-full min-w-0 overflow-x-clip px-2 py-4 sm:py-0">
      {/* Background Glow */}
      <div className="pointer-events-none absolute top-20 left-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

      {/* <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" /> */}

      <div className="relative z-10 w-full min-w-0 space-y-6 px-2 sm:space-y-8">
        {/* Header */}
        <div className="min-w-0">
          <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase sm:text-sm sm:tracking-[0.25em]">
            Instructor Analytics
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight break-words sm:text-4xl">
            Dashboard{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
              Overview
            </span>
          </h1>

          <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-base">
            Track your revenue, course performance, and student purchases.
          </p>
        </div>

        {/* Stats */}
        <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
          {/* Total Revenue */}
          <Card className="w-full min-w-0 border-white/10 bg-white/10 shadow-xl backdrop-blur-xl">
            <CardContent className="flex items-center justify-between gap-3 p-4 sm:p-6">
              <div className="min-w-0">
                <p className="text-muted-foreground text-sm">Total Revenue</p>

                <h2 className="mt-2 text-2xl font-bold break-words sm:text-3xl">
                  ₹{totalRevenue.toLocaleString()}
                </h2>
              </div>

              <div className="shrink-0 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 p-3">
                <DollarSign className="text-white" />
              </div>
            </CardContent>
          </Card>

          {/* Total Sales */}
          <Card className="w-full min-w-0 border-white/10 bg-white/10 shadow-xl backdrop-blur-xl">
            <CardContent className="flex items-center justify-between gap-3 p-4 sm:p-6">
              <div className="min-w-0">
                <p className="text-muted-foreground text-sm">Total Sales</p>

                <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                  {totalSales}
                </h2>
              </div>

              <div className="shrink-0 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 p-3">
                <ShoppingCart className="text-white" />
              </div>
            </CardContent>
          </Card>

          {/* Published Courses */}
          <Card className="w-full min-w-0 border-white/10 bg-white/10 shadow-xl backdrop-blur-xl">
            <CardContent className="flex items-center justify-between gap-3 p-4 sm:p-6">
              <div className="min-w-0">
                <p className="text-muted-foreground text-sm">
                  Published Courses
                </p>

                <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                  {totalCourses}
                </h2>
              </div>

              <div className="shrink-0 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 p-3">
                <BookOpen className="text-white" />
              </div>
            </CardContent>
          </Card>

          {/* Average Revenue */}
          <Card className="w-full min-w-0 border-white/10 bg-white/10 shadow-xl backdrop-blur-xl">
            <CardContent className="flex items-center justify-between gap-3 p-4 sm:p-6">
              <div className="min-w-0">
                <p className="text-muted-foreground text-sm">Average Revenue</p>

                <h2 className="mt-2 text-2xl font-bold break-words sm:text-3xl">
                  ₹{totalSales ? Math.round(totalRevenue / totalSales) : 0}
                </h2>
              </div>

              <div className="shrink-0 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 p-3">
                <TrendingUp className="text-white" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Chart */}
        <Card className="w-full min-w-0 overflow-hidden border-white/10 bg-white/10 shadow-xl backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-lg sm:text-2xl">
              Revenue Performance
            </CardTitle>
          </CardHeader>

          <CardContent className="min-w-0 px-2 sm:px-6">
            <div className="h-[280px] w-full min-w-0 sm:h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={courseData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -15,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis
                    dataKey="name"
                    angle={-25}
                    textAnchor="end"
                    interval="preserveStartEnd"
                    height={65}
                    tick={{ fontSize: 10 }}
                  />

                  <YAxis width={55} />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="revenue"
                    strokeWidth={3}
                    stroke="#6366f1"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Purchases */}
        <Card className="w-full min-w-0 overflow-hidden border-white/10 bg-white/10 shadow-xl backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">
              Recent Purchases
            </CardTitle>
          </CardHeader>

          <CardContent className="min-w-0">
            <div className="space-y-4">
              {purchasedCourse.slice(0, 5).map((purchase) => (
                <div
                  key={purchase._id}
                  className="bg-background/40 flex flex-col gap-3 rounded-2xl border border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <h3 className="font-medium break-words">
                      {purchase.courseId?.courseTitle}
                    </h3>

                    <p className="text-muted-foreground mt-1 text-xs break-all sm:text-sm">
                      Purchase ID: {purchase.paymentId}
                    </p>
                  </div>

                  <div className="shrink-0 self-end font-semibold text-indigo-500 sm:self-auto">
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
