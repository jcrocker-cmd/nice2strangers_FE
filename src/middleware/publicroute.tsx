import React from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: React.ReactNode;
  redirectTo?: string; // default redirect if logged in
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children, redirectTo = "/dashboard" }) => {
  const token = localStorage.getItem("token"); // check if JWT exists

  if (token) {
    // logged in, redirect away from login/signup
    return <Navigate to={redirectTo} replace />;
  }

  // not logged in, render the public page
  return <>{children}</>;
};

export default PublicRoute;
