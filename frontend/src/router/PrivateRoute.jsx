import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

export default function PrivateRoute() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
