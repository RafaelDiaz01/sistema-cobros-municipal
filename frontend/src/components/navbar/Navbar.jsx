import { NavLink } from "react-router-dom";
import { UserCircle, Landmark, Settings } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown.jsx";

export default function Navbar() {
  return (
    <header className="w-full px-8 py-6">
      {/* CONTENIDO */}
      <div className="flex items-center justify-between pb-2">
        {/* ICONO Y NOMBRE DEL SISTEMA */}
        <div className="flex items-center gap-4">
          <Landmark size={24} className="text-[var(--color-primario)]" />
          <h1 className="text-lg font-semibold">Sistema de Cobros Municipal</h1>
        </div>

        {/* OPCIONES DE NAVEGACIÓN */}
        <nav className="flex items-center gap-16 text-sm font-medium">
          <NavLink to="/cobrar" className={linkClass}>
            Cobrar
          </NavLink>

          <NavLink to="/corte-caja" className={linkClass}>
            Corte de Caja
          </NavLink>

          <NavLink to="/contribuyentes" className={linkClass}>
            Contribuyentes
          </NavLink>

          <NavLink to="/mas" className={linkClass}>
            Más
          </NavLink>
        </nav>

        {/* ICONO DE PERFIL */}
        <div className="flex items-center gap-4">
          <ProfileDropdown />
        </div>
      </div>

      {/* LÍNEA DECORATIVA */}
      <hr className="border-[var(--color-borde)]" />
    </header>
  );
}

// Clase para los enlaces de navegación
const linkClass = ({ isActive }) =>
  `px-4 py-1 rounded-xl transition-all duration-200
   ${isActive
    ? "bg-[var(--color-primario)] text-white shadow-sm"
    : "text-[var(--color-texto)] hover:bg-[var(--color-acento)] hover:text-white"}`;
