import { lazy } from "react";
// import AboutUs from "./client/components/layout/About";
// import Home_Page from "./client/pages/Home_Page";
// import Shop_Page from "./client/pages/Shop_Page";
// import DashboardLayout from "./dashboard/dashboard";


const Home_Page = lazy(() => import("./client/pages/Home_Page"));
const AboutUs = lazy(() => import("./client/components/layout/About"));
const Shop_Page = lazy(() => import("./client/pages/Shop_Page"));
const DashboardLayout = lazy(() => import("./dashboard/dashboard"));

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
];
