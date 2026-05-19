const currentYear = new Date().getFullYear();

export default function Footer({
  entidad = "Honorable Ayuntamiento de Ixtlán de Juárez",
  dependencia = "Tesorería Municipal",
  periodo = `${currentYear}-${currentYear + 1}`,
  className = "",
}) {
  return (
    <footer
      className={`
        py-4 text-center space-y-1
        ${className}
      `}
    >
      <p className="text-xs font-medium opacity-60">{entidad}</p>

      <p className="text-[10px] opacity-40 uppercase tracking-[4px]">
        {dependencia} • {periodo}
      </p>
    </footer>
  );
}
