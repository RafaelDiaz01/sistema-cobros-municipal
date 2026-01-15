import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Contribuyentes from "../pages/Contribuyentes";
import Mas from "../pages/Mas";
import Establecimientos from "../pages/Establecimientos";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/contribuyentes" element={<Contribuyentes />} />
      <Route path="/mas" element={<Mas />} />
      <Route path="/establecimientos" element={<Establecimientos />} />
      <Route path="*" element={<h1>Página no encontrada</h1>} />
    </Routes>
  );
};

export default AppRouter;
