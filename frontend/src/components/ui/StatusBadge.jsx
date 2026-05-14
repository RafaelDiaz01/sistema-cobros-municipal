// Componente para mostrar el estado en las tablas
export default function StatusBadge({ activo }) {
    return activo ? (
        <span className="px-3 py-1 rounded-lg bg-[var(--color-terciario)] text-[var(--color-texto)] text-xs font-medium">
            Activo
        </span>
    ) : (
        <span className="px-3 py-1 rounded-lg bg-[var(--color-inactivo)] text-[var(--color-texto)] text-xs font-medium">
            Inactivo
        </span>
    );
}