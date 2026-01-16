import { useEffect, useRef, useState } from "react";
import {
  UserCircle,
  User,
  Settings,
  Lock,
  History,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth.js";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  // Cerrar al hacer click fuera
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const goTo = (path) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <div className="relative" ref={ref}>
      {/* BOTÓN PERFIL */}
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--color-borde)] text-[var(--color-primario)]"
      >
        {/* <img
          src="/avatar.png"
          alt="Perfil"
          className="w-9 h-9 rounded-full object-cover"
        /> */}

        <UserCircle size={22} />
      </button>

      {/* MENÚ */}
      {open && (
        <div className="absolute right-0 mt-3 w-72 rounded-xl bg-white shadow-xl border border-gray-100 z-50 overflow-hidden">
          {/* HEADER */}
          <div className="px-4 py-3 bg-[var(--color-primario)]/10">
            <p className="text-xs text-gray-500">SESIÓN ACTIVA</p>
            <p className="text-sm font-semibold text-gray-900">Juan Pérez</p>
            <p className="text-xs text-gray-600">Administrador de Cobros</p>
          </div>

          {/* OPCIONES */}
          <div className="p-2 space-y-1">
            <MenuItem
              icon={<User size={18} />}
              title="Mi Perfil"
              subtitle="Datos personales y cargo"
              onClick={() => goTo("/perfil")}
            />

            <MenuItem
              icon={<Settings size={18} />}
              title="Configuración de Cuenta"
              subtitle="Preferencias del sistema"
              onClick={() => goTo("/configuracion")}
            />

            <MenuItem
              icon={<Lock size={18} />}
              title="Cambiar Contraseña"
              subtitle="Seguridad de acceso"
              onClick={() => goTo("/cambiar-password")}
            />

            <MenuItem
              icon={<History size={18} />}
              title="Historial de Actividad"
              subtitle="Bitácora de movimientos"
              onClick={() => goTo("/actividad")}
            />
          </div>

          {/* FOOTER */}
          <div className="p-2 border-t">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg
              bg-red-50 text-red-600 text-sm font-semibold hover:bg-red-100 transition"
            >
              <LogOut size={18} />
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ITEM */
function MenuItem({ icon, title, subtitle, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex gap-3 px-3 py-2 rounded-lg text-left
      hover:bg-gray-100 transition"
    >
      <div
        className="w-9 h-9 rounded-lg bg-[var(--color-acento)]/10
      text-[var(--color-acento)] flex items-center justify-center"
      >
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-800">{title}</p>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </button>
  );
}
