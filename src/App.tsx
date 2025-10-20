// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

// Routes Module
import { appRoutes } from "./routes.module.tsx";

// ScrollUp Component
import ScrollUp from "./client/components/common/ScrollUp.tsx";

function App() {
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);

  // 👇 Call appRoutes() to get the array
  const routes = appRoutes({ setIsGlobalLoading });

  return (
    <>
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Router>
      <ScrollUp />
    </>
  );
}

export default App;
