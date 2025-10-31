import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role: string;
}

const AdminProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  role,
}) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    // not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/client-dashboard" replace />;
  }

  // logged in, render the protected component
  return <>{children}</>;
};

export default AdminProtectedRoute;

// import * as jwtDecode from "jwt-decode";
// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

// interface MyJwtPayload {
//   exp: number;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
//   const location = useLocation();
//   const token = localStorage.getItem("token");

//   // Allow access to login/signup routes without token
//   if (!token) {
//     if (location.pathname === "/login" || location.pathname === "/signup") {
//       return <>{children}</>;
//     }
//     return <Navigate to="/login" replace />;
//   }

//   try {
//     const decoded = (jwtDecode as any)(token) as MyJwtPayload;
//     const now = Date.now() / 1000;

//     if (decoded.exp < now) {
//       localStorage.removeItem("token");
//       return <Navigate to="/login" replace />;
//     }
//   } catch {
//     localStorage.removeItem("token");
//     return <Navigate to="/login" replace />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;

// import React from "react";
// import { Navigate } from "react-router-dom";

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
//   const token = localStorage.getItem("token");

//   // If no token, redirect to login
//   if (!token) return <Navigate to="/login" replace />;

//   try {
//     // Decode JWT to check expiration
//     const decoded = JSON.parse(atob(token.split(".")[1])) as { exp: number };
//     const now = Date.now() / 1000;

//     if (decoded.exp < now) {
//       localStorage.removeItem("token");
//       return <Navigate to="/login" replace />;
//     }
//   } catch {
//     // If token is invalid, redirect
//     return <Navigate to="/login" replace />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;
