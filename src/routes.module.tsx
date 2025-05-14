import AboutUs from "./components/layout/About";
import Homepage from "./pages/Homepage";

export const appRoutes = [
  {
    path: "/about-us",
    element: <AboutUs />,
  },
  {
    path: "/",
    element: <Homepage />,
  },
];
