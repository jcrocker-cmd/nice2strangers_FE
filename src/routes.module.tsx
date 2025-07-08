import AboutUs from "./components/layout/About";
import Home_Page from "./pages/Home_Page";
import Shop_Page from "./pages/Shop_Page";

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
];
