import { User } from "lucide-react";

export default function SectionTitleCobrar({ text, corteActivo, onAdd }) {
  return (
    <div className="w-full flex items-center justify-between">
      {/* TÍTULO */}
      <h2 className="text-3xl font-bold text-black">{text}</h2>
      {/* BOTÓN INICIAR TURNO */}
      {!corteActivo ? (
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-[var(--color-primario)] text-white font-medium px-5 py-2.5 rounded-lg hover:opacity-90 transition"
        >
          <User size={18} />
          Iniciar Turno
        </button>
      ) : (
        <button
          disabled
          className="flex items-center gap-2 bg-gray-200 text-black font-medium px-5 py-2.5 rounded-lg cursor-not-allowed"
        >
          <User size={18} />
          Turno Activo
        </button>
      )}
    </div>
  );
}
