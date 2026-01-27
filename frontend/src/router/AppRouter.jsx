import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Login from "../pages/login/Login";
import Cobrar from "../pages/cobrar/Cobrar";
import Contribuyentes from "../pages/contribuyentes/Contribuyentes";
import Mas from "../pages/mas/Mas";
import Establecimientos from "../pages/establecimientos/Establecimientos";

const AppRouter = () => {
  return (
    <Routes>
      {/* Rutas No Encontradas */}
      <Route path="*" element={<h1>Página no encontrada</h1>} />

      {/* Rutas Publicas */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Rutas Privadas */}
      <Route element={<PrivateRoute />}>
        <Route path="/cobrar" element={<Cobrar />} />
        <Route path="/contribuyentes" element={<Contribuyentes />} />
        <Route path="/mas" element={<Mas />} />
        <Route path="/establecimientos" element={<Establecimientos />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
