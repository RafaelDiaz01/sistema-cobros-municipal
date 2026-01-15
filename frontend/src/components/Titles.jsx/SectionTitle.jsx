import { Plus } from "lucide-react";

export default function SectionTitle({ text, onAdd }) {
  return (
    <div className="w-full flex items-center justify-between">
      {/* TÍTULO */}
      <h2 className="text-3xl font-bold text-black">
        {text}
      </h2>

      {/* BOTÓN */}
      <button
        onClick={onAdd}
        className="flex items-center gap-2 bg-[var(--color-acento)] text-white font-medium px-5 py-2.5 rounded-lg hover:opacity-90 transition"
      >
        <Plus size={18} />
        Agregar Contribuyente
      </button>
    </div>
  );
}
