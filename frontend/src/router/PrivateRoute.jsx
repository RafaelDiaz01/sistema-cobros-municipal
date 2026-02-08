import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

export default function PrivateRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
