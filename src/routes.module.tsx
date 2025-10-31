import { lazy } from "react";
import AdminProtectedRoute from "./middleware/protected-admin-route";
import ForgotPassword from "./dashboard/forgot_password";
import ResetPassword from "./dashboard/reset_password";
import AdminLogin from "./dashboard/login";
import PublicRoute from "./middleware/publicroute";

const DashboardLayout = lazy(() => import("./dashboard/dashboard"));

export const appRoutes = () => [
  // protected route
  {
    path: "/",
    element: (
      <AdminProtectedRoute role="Admin">
        <DashboardLayout />
      </AdminProtectedRoute>
    ),
  },

  {
    path: "/login",
    element: (
      <PublicRoute>
        <AdminLogin />
      </PublicRoute>
    ),
  },

  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
];
