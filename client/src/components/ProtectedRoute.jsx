import React from "react";
import { Navigate } from "react-router-dom";
import { useLoadUserQuery } from "../features/api/authApi";

const ProtectedRoute = ({ children }) => {
  const { data, isLoading } = useLoadUserQuery();

  const user = data?.user;

  if (isLoading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
