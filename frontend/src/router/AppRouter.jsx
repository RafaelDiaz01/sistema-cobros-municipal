import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
/* import Cobrar from "../pages/Cobrar";
import Contribuyentes from "../pages/Contribuyentes";
import Usuarios from "../pages/Usuarios";
import CorteCaja from "../pages/CorteCaja";
import PerfilUsuario from "../pages/PerfilUsuario"; */

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

