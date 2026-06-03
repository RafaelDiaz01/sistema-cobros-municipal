import { Search, Filter } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder, statusValue, onStatusChange }) {
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
      py-4 
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

      <div
        className="flex items-center gap-3 border-t md:border-t-0 md:border-l border-[var(--color-borde)] pt-3 md:pt-0 md:pl-4"
      >
        <Filter size={18} className="text-[var(--color-primario)]" />

        <select
          value={statusValue}
          onChange={(e) => onStatusChange(e.target.value)}
          className="bg-transparent outline-none text-sm text-[var(--color-texto)] cursor-pointer"
        >
          <option value="">Todos</option>
          <option value="true">Activos</option>
          <option value="false">Inactivos</option>
        </select>
      </div>
    </div>
  );
}
