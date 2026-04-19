import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Login from "../pages/login/Login";
import Cobrar from "../pages/cobrar/Cobrar";
import Contribuyentes from "../pages/contribuyentes/Contribuyentes";
import Mas from "../pages/mas/Mas";
import Establecimientos from "../pages/establecimientos/Establecimientos";
import Corte from "../pages/corte-de-caja/Corte";
import GestionRecibos from "../pages/gestion-recibos/GestionRecibos";
import GestionEstimulos from "../pages/gestion-estimulos/GestionEstimulos";
import GestionEjercicios from "../pages/gestion-ejercicios/GestionEjercicios";
import GestionCuentas from "../pages/gestion-cuentas/GestionCuentas";
import GestionSubcuentas from "../pages/gestion-subcuentas/GestionSubcuentas";
import Secciones from "../pages/gestion-secciones/GestionSecciones";
import Conceptos from "../pages/gestion-conceptos/GestionConceptos";
import Subconceptos from "../pages/gestion-subconceptos/GestionSubconceptos";
import GestionAlquiler from "../pages/gestion-alquiler/GestionAlquiler";
import GestionConexion from "../pages/gestion-conexion/GestionConexion";
import BaseCatastral from "../pages/base-catastral/BaseCatastral";
import NotFound from "../pages/not-found/NotFound";
import MiPerfil from "../pages/perfil/MiPerfil";

const AppRouter = () => {
  return (
    <Routes>
      {/* Rutas Publicas */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Rutas Privadas */}
      <Route element={<PrivateRoute />}>
        <Route path="/cobrar" element={<Cobrar />} />
        <Route path="/corte-caja" element={<Corte />} />
        <Route path="/contribuyentes" element={<Contribuyentes />} />
        <Route path="/mas" element={<Mas />} />
        <Route path="/establecimientos" element={<Establecimientos />} />
        <Route path="/gestion-recibos" element={<GestionRecibos />} />
        <Route path="/gestion-estimulos" element={<GestionEstimulos />} />
        <Route path="/gestion-ejercicios" element={<GestionEjercicios />} />
        <Route path="/gestion-cuentas" element={<GestionCuentas />} />
        <Route path="/gestion-subcuentas" element={<GestionSubcuentas />} />
        <Route path="/gestion-secciones" element={<Secciones />} />
        <Route path="/gestion-conceptos" element={<Conceptos />} />
        <Route path="/gestion-subconceptos" element={<Subconceptos />} />
        <Route path="/gestion-alquiler" element={<GestionAlquiler />} />
        <Route path="/gestion-conexion" element={<GestionConexion />} />
        <Route path="/base-catastral" element={<BaseCatastral />} />
        <Route path="/mi-perfil" element={<MiPerfil />} />
      </Route>

      {/* Rutas No Encontradas */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
