import { Pencil, Trash2 } from "lucide-react";

export default function Table({ data = [] }) {
  return (
    <div className="w-full bg-white border border-[var(--color-borde)] rounded-2xl overflow-hidden shadow-sm">
      {/* ENCABEZADO */}
      <div className="grid grid-cols-6 bg-[var(--color-terciario)] text-sm font-semibold text-gray-700 px-6 py-3">
        <span>Clave Única / ID</span>
        <span>Nombre Completo</span>
        <span>Dirección</span>
        <span>Teléfono</span>
        <span>Estado</span>
        <span className="text-center">Acciones</span>
      </div>

      {/* FILAS */}
      {data.map((item, i) => (
        <div
          key={i}
          className="grid grid-cols-6 px-6 py-4 text-sm border-t border-[var(--color-borde)] items-center"
        >
          {/* ID */}
          <span className="text-[var(--color-primario)] font-medium cursor-pointer hover:underline">
            {item.id}
          </span>

          {/* NOMBRE */}
          <span className="font-medium">{item.nombre}</span>

          {/* DIRECCIÓN */}
          <span className="text-[var(--color-primario)] cursor-pointer hover:underline">
            {item.direccion}
          </span>

          {/* TELÉFONO */}
          <span className="text-[var(--color-primario)]">{item.telefono}</span>

          {/* ESTADO */}
          <span>
            {item.estado === "Activo" && (
              <span className="px-3 py-1 rounded-lg bg-[#E8F8EE] text-[var(--color-primario)] text-xs font-medium">
                Activo
              </span>
            )}

            {item.estado === "Con Adeudo" && (
              <span className="px-3 py-1 rounded-lg bg-[#FFF6D8] text-[#7A5E00] text-xs font-medium">
                Con Adeudo
              </span>
            )}

            {item.estado === "Inactivo" && (
              <span className="px-3 py-1 rounded-lg bg-[#E6E7EB] text-[#4B5563] text-xs font-medium">
                Inactivo
              </span>
            )}
          </span>

          {/* ACCIONES */}
          <div className="flex justify-center gap-4">
            <button className="text-[var(--color-primario)] hover:opacity-70">
              <Pencil size={18} />
            </button>
            <button className="text-red-500 hover:opacity-70">
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
