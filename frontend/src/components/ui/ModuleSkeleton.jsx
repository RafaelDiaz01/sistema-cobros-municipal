// Esqueleto de carga para módulos completos (título, tarjetas de estadísticas y tabla)
const Bone = ({ className = "" }) => (
    <div
        className={`animate-pulse rounded-md bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 ${className}`}
    />
);

export const SectionTitleSkeleton = () => (
    <div className="flex items-center justify-between">
        <div className="flex flex-col">
            <Bone className="h-10 w-90" />
        </div>
        <Bone className="h-10 w-50 rounded-xl bg-gradient-to-r from-green-900 via-green-800 to-green-900" />
    </div>
);

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

export const TableSkeleton = ({ rows, columns }) => {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
            {/* CABECERA */}
            <div className="flex items-center gap-4 border-b border-gray-100 bg-green-50 p-5 justify-between">
                {Array.from({ length: columns }).map((_, i) => (
                    <Bone
                        key={i}
                        className={`h-4 w-40`}
                    />
                ))}
            </div>

            {/* FILAS */}
            {Array.from({ length: rows }).map((_, rowIdx) => (
                <div
                    key={rowIdx}
                    className="flex items-center gap-4 border-b border-gray-50 px-5 py-4 last:border-0 justify-between"
                >
                    {Array.from({ length: columns }).map((_, colIdx) => {
                        return (
                            <Bone
                                key={colIdx}
                                className="h-4 w-40"
                            />
                        );
                    })}
                </div>
            ))}

            {/* FOOTER */}
            <div className="flex items-center justify-end gap-4 border-t border-gray-100 bg-gray-50/50 px-4 py-2.5">
                <div className="flex items-center gap-2">
                    <Bone className="h-3.5 w-24" />
                    <Bone className="h-6 w-12 rounded-md" />
                </div>
                <Bone className="h-3.5 w-16" />
                <div className="flex gap-2">
                    <Bone className="h-7 w-7 rounded-md" />
                    <Bone className="h-7 w-7 rounded-md" />
                </div>
            </div>

        </div>
    );
};

const ModuleSkeleton = ({ tableRows, tableColumns, statsCards }) => (
    <div className="flex flex-col gap-10">
        <SectionTitleSkeleton />
        <StatsCardsSkeleton cards={statsCards} />
        <TableSkeleton rows={tableRows} columns={tableColumns} />
    </div>
);

export default ModuleSkeleton;