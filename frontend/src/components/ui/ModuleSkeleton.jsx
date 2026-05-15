/**
 * Uso:
 *   import ModuleSkeleton, {
 *     SectionTitleSkeleton,
 *     StatsCardsSkeleton,
 *     TableSkeleton,
 *   } from "./SkeletonLoader";
 *
 *   // Módulo completo
 *   {loading ? <ModuleSkeleton /> : <TuModulo />}
 *
 *   // Partes individuales
 *   {loading ? <StatsCardsSkeleton /> : <StatsCards stats={stats} />}
 */

const Bone = ({ className = "" }) => (
    <div
        className={`animate-pulse rounded-md bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 ${className}`}
    />
);

/* ─────────────────────────────────────────────
   1. SECTION TITLE
   Título a la izquierda + botón a la derecha
   ───────────────────────────────────────────── */
export const SectionTitleSkeleton = () => (
    <div className="flex items-center justify-between">
        <div className="flex flex-col">
            <Bone className="h-10 w-90" />
        </div>
        <Bone className="h-10 w-50 rounded-xl bg-gradient-to-r from-green-900 via-green-100 to-green-900" />
    </div>
);

/* ─────────────────────────────────────────────
   2. STATS CARDS
   4 tarjetas: ícono + título + valor
   ───────────────────────────────────────────── */
export const StatsCardsSkeleton = ({ cards = 4 }) => (
    <div className="w-full grid grid-cols-4 gap-6">
        {Array.from({ length: cards }).map((_, i) => (
            <div
                key={i}
                className="flex items-center gap-4 bg-[var(--color-secundario)] border border-[var(--color-borde)] rounded-2xl px-6 py-4 shadow-sm"
            >   {/* ICONO */}
                <Bone className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-100 via-green-50 to-green-100" />

                <div className="flex flex-col gap-3">
                    {/* TEXTO */}
                    <Bone className="h-4 w-40" />

                    {/* VALOR */}
                    <Bone className="h-6 w-6" />
                </div>
            </div>
        ))}
    </div>
);

/* ─────────────────────────────────────────────
   3. TABLE
   Cabecera + filas de datos
   Props:
     rows    — número de filas visibles (default 7)
     columns — número de columnas (default 6)
   ───────────────────────────────────────────── */
export const TableSkeleton = ({ rows = 7, columns = 6 }) => {
    // Ancho relativo de cada columna para variedad visual
    const colWidths = ["w-32", "w-28", "w-24", "w-20", "w-28", "w-16"];

    return (
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
            {/* Toolbar / buscador */}
            <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/60 px-4 py-3">
                <Bone className="h-9 w-56 rounded-lg" />
                <div className="flex gap-2">
                    <Bone className="h-9 w-24 rounded-lg" />
                    <Bone className="h-9 w-24 rounded-lg" />
                </div>
            </div>

            {/* Cabecera */}
            <div className="flex items-center gap-4 border-b border-gray-100 bg-gray-50 px-5 py-3">
                {Array.from({ length: columns }).map((_, i) => (
                    <Bone
                        key={i}
                        className={`h-4 ${colWidths[i % colWidths.length]}`}
                    />
                ))}
            </div>

            {/* Filas */}
            {Array.from({ length: rows }).map((_, rowIdx) => (
                <div
                    key={rowIdx}
                    className={`flex items-center gap-4 border-b border-gray-50 px-5 py-4 last:border-0 ${rowIdx % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                        }`}
                >
                    {Array.from({ length: columns }).map((_, colIdx) => {
                        const isLastCol = colIdx === columns - 1;
                        return (
                            <Bone
                                key={colIdx}
                                className={`h-4 ${isLastCol
                                    ? "ml-auto w-16 from-green-50 via-green-100 to-green-50"
                                    : colWidths[colIdx % colWidths.length]
                                    }`}
                            />
                        );
                    })}
                </div>
            ))}

            {/* Paginación */}
            <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/60 px-5 py-3">
                <Bone className="h-4 w-40" />
                <div className="flex gap-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Bone key={i} className="h-8 w-8 rounded-md" />
                    ))}
                </div>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────
   DEFAULT: Módulo completo
   Combina los tres esqueletos en orden
   ───────────────────────────────────────────── */
const ModuleSkeleton = ({ tableRows = 7, tableColumns = 6, statsCards = 4 }) => (
    <div className="flex flex-col gap-10">
        <SectionTitleSkeleton />
        <StatsCardsSkeleton cards={statsCards} />
        <TableSkeleton rows={tableRows} columns={tableColumns} />
    </div>
);

export default ModuleSkeleton;