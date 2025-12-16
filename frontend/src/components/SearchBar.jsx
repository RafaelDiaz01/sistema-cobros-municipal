import { Search } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    /* CONTENEDOR PRINCIPAL */
    <div
      className="
      w-full 
      bg-[var(--color-secundario)]
      border border-[var(--color-borde)]
      overflow-hidden shadow-sm 
      text-[var(--color-primario)]
      flex 
      items-center 
      gap-3 
      px-4 
      py-3 
      rounded-xl
    "
    >
      {/* ICONO DE BÚSQUEDA */}
      <Search size={20} className="text-[var(--color-primario)]" />

      {/* INPUT DE BÚSQUEDA */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full 
          bg-transparent 
          outline-none 
          text-sm 
          text-[var(--color-texto)]
          placeholder:text-[var(--color-texto)]
          placeholder:opacity-60
        "
      />
    </div>
  );
}
