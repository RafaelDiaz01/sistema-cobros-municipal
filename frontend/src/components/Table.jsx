import { Pencil, ToggleRight, ToggleLeft } from "lucide-react";

export default function Table({
  contribuyentes = [],
  loading = false,
  updateStatus,
}) {
  if (loading) {
    return <p>Cargando...</p>;
  }

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
      {contribuyentes.map((c) => (
        <div
          key={c.id_contribuyente}
          className="grid grid-cols-6 px-6 py-4 text-sm border-t border-[var(--color-borde)] items-center"
        >
          {/* ID */}
          <span className="text-[var(--color-texto)] font-medium cursor-pointer hover:underline">
            {c.id_contribuyente}
          </span>

          {/* NOMBRE */}
          <span className="font-medium">
            {c.nombre} {c.apellido_paterno} {c.apellido_materno}
          </span>

          {/* DIRECCIÓN */}
          <span className="text-[var(--color-texto)] cursor-pointer hover:underline">
            {c.calle} #{c.numero_calle}, {c.barrio}
          </span>

          {/* TELÉFONO */}
          <span className="text-[var(--color-texto)]">{c.telefono}</span>

          {/* ESTADO */}
          <span>
            {c.activo ? (
              <span className="px-3 py-1 rounded-lg bg-[#E8F8EE] text-[var(--color-texto)] text-xs font-medium">
                Activo
              </span>
            ) : (
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
            <button
              className="text-red-500 hover:opacity-70"
              onClick={() => updateStatus(c.id_contribuyente, c.activo)}
            >
              {c.activo ? (
                <ToggleRight size={18} className="text-red-500" />
              ) : (
                <ToggleLeft size={18} className="text-green-600" />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
