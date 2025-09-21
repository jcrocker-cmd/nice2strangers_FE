import { lazy } from "react";
// import AboutUs from "./client/components/layout/About";
// import Home_Page from "./client/pages/Home_Page";
// import Shop_Page from "./client/pages/Shop_Page";
// import DashboardLayout from "./dashboard/dashboard";

const Home_Page = lazy(() => import("./client/pages/Home_Page"));
const AboutUs = lazy(() => import("./client/components/layout/About"));
const Shop_Page = lazy(() => import("./client/pages/Shop_Page"));
const DashboardLayout = lazy(() => import("./dashboard/dashboard"));
const Login = lazy(() => import("./client/pages/Login_Page"));
const Signup = lazy(() => import("./client/pages/Signup_Page"));
const ResetPassword = lazy(() => import("./client/pages/ResetPassword_Page"));
const ForgotPassword = lazy(() => import("./client/pages/ForgotPassword_Page"));

export const appRoutes = [
  {
    path: "/about-us",
    element: <AboutUs />,
  },
  {
    path: "/",
    element: <Home_Page />,
  },
  {
    path: "/shop-page",
    element: <Shop_Page />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
];
