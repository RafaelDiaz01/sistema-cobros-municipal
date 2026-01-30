export default function Footer({
  entidad = "Honorable Ayuntamiento de Ixtlán de Juárez, Oaxaca.",
  dependencia = "Tesorería Municipal",
  periodo = "2026-2027",
  className = "",
}) {
  return (
    <footer
      className={`
        mt-12 py-8 text-center space-y-2
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
