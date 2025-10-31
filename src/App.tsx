// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Routes Module
import { appRoutes } from "./routes.module.tsx";

function App() {
  // 👇 Call appRoutes() to get the array
  const routes = appRoutes();

  return (
    <>
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Router>
    </>
  );
}

export default App;
