import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { isAuthenticated } from "../utils/auth";
import { showToast } from "../utils/alerts/toast";

export default function PublicRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      showToast("info", "Ya tienes una sesión activa");
      navigate("/contribuyentes", { replace: true });
    }
  }, [navigate]);

  if (isAuthenticated()) {
    return null; // evita render mientras redirige
  }

  return <Outlet />;
}
