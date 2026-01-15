export default function StatsCards({ stats = [] }) {
  return (
    /* CONTENEDOR PRINCIPAL */
    <div className="w-full grid grid-cols-4 gap-4">
      {/* TARJETAS DE ESTADÍSTICAS */}
      {/* SE MAPEA PARA AGREGAR CONTENIDO DINÁMICO */}
      {stats.map((card, i) => (
        // TARJETA DE ESTADÍSTICAS
        <div
          key={i}
          className="flex items-center gap-4 bg-[var(--color-secundario)] border border-[var(--color-borde)] rounded-2xl px-6 py-4 shadow-sm"
        >
          {/* ICONO */}
          <div className="w-12 h-12 flex items-center justify-center bg-[#E8F8EE] text-[var(--color-acento)] rounded-xl">
            {card.icon}
          </div>

          {/* TEXTO */}
          <div className="flex flex-col">
            <span className="text-sm text-gray-700 font-medium truncate">
              {card.title}
            </span>

            {/* VALOR */}
            <span className="text-2xl font-bold text-black">{card.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
