import AboutUs from "./components/layout/About";
import Homepage from "./pages/Homepage";
import SocialMediaConsulting from "./pages/SocialMediaConsulting";

import { types } from "./components/const/types";

export const appRoutes = [
  {
    path: types.ABOUT,
    element: <AboutUs />,
  },
  {
    path: types.HOMEPAGE,
    element: <Homepage />,
  },
  {
    path: types.SM_CONSULTING,
    element: <SocialMediaConsulting />,
  },
];
