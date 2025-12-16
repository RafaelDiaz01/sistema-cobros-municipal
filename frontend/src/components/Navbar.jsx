import { UserCircle, Landmark, Settings } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full bg-[var(--color-fondo)] px-8 py-6">
      {/* CONTENIDO */}
      <div className="flex items-center justify-between pb-2">
        {/* ICONO Y NOMBRE DEL SISTEMA */}
        <div className="flex items-center gap-3">
          <Landmark size={22} className="text-[var(--color-primario)]" />
          <h1 className="text-lg font-semibold">Sistema de Cobros Municipal</h1>
        </div>

        {/* OPCIONES DE NAVEGACIÓN */}
        <nav className="flex items-center gap-8 text-sm">
          <button className="hover:text-[var(--color-primario)] transition">
            Cobrar
          </button>

          <button className="text-[var(--color-acento)] font-semibold">
            Contribuyentes
          </button>

          <button className="hover:text-[var(--color-primario)] transition">
            Corte de Caja
          </button>

          <button className="hover:text-[var(--color-primario)] transition">
            Más
          </button>
        </nav>

        {/* ICONO DE AJUSTES Y DE PERFIL */}
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--color-borde)] text-[var(--color-primario)]">
            <Settings size={22} />
          </button>

          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--color-borde)] text-[var(--color-primario)]">
            <UserCircle size={22} />
          </button>
        </div>
      </div>

      {/* LÍNEA DECORATIVA */}
      <hr className="border-[var(--color-borde)]" />
    </header>
  );
}
