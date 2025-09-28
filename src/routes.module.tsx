import { lazy } from "react";
import AdminProtectedRoute from "./middleware/protected-admin-route";
import ClientProtectedRoute from "./middleware/protected-client-route";
import PublicRoute from "./middleware/publicroute";
import SocialMediaCreation from "./client/pages/services/SocialMediaCreation";

const Home_Page = lazy(() => import("./client/pages/Home_Page"));
const AboutUs = lazy(() => import("./client/components/layout/About"));
const Shop_Page = lazy(() => import("./client/pages/Shop_Page"));
const DashboardLayout = lazy(() => import("./dashboard/dashboard"));
const Login = lazy(() => import("./client/pages/Login_Page"));
const AdminLogin = lazy(() => import("./client/pages/Admin_Login_Page"));
const Signup = lazy(() => import("./client/pages/Signup_Page"));
const ResetPassword = lazy(() => import("./client/pages/ResetPassword_Page"));
const ForgotPassword = lazy(() => import("./client/pages/ForgotPassword_Page"));
const Sample = lazy(() => import("./client/pages/Sample"));
const VideoEditingService = lazy(
  () => import("./client/pages/services/VideoEditingService")
);
const SocialMediaConsulting = lazy(
  () => import("./client/pages/services/SocialMediaConsulting")
);
const SoftwareCreation = lazy(
  () => import("./client/pages/services/SoftwareCreation")
);
const DroneServices = lazy(
  () => import("./client/pages/services/DroneServices")
);

export const appRoutes = [
  { path: "/", element: <Home_Page /> },
  { path: "/about-us", element: <AboutUs /> },
  { path: "/shop-page", element: <Shop_Page /> },
  { path: "/video-editing", element: <VideoEditingService /> },
  { path: "/social-media-consulting", element: <SocialMediaConsulting /> },
  { path: "/social-media-creation", element: <SocialMediaCreation /> },
  { path: "/software-creation", element: <SoftwareCreation /> },
  { path: "/drone-services", element: <DroneServices /> },

  // protected route
  {
    path: "/dashboard",
    element: (
      <AdminProtectedRoute role="Admin">
        <DashboardLayout />
      </AdminProtectedRoute>
    ),
  },

  {
    path: "/client",
    element: (
      <ClientProtectedRoute role="User">
        <Sample />
      </ClientProtectedRoute>
    ),
  },

  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },

  {
    path: "/adminlogin",
    element: (
      <PublicRoute>
        <AdminLogin />
      </PublicRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <Signup />
      </PublicRoute>
    ),
  },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
];
