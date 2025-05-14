// src/App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Routes Module
import { appRoutes } from "./routes.module.tsx";

// ScrollUp Component
import ScrollUp from "./components/common/ScrollUp";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {appRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Router>
      <ScrollUp />
    </>
  );
}

export default App;
