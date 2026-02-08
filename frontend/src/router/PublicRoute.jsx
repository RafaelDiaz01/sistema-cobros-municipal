import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

export default function PublicRoute() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/cobrar" replace />;
  }

  return <Outlet />;
}
