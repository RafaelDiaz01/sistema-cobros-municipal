// Componente reutilizable para los botones de acción (editar y activar/desactivar)
import { Tooltip } from "@mui/material";
import { Pencil, ToggleRight, ToggleLeft } from "lucide-react";

export default function ActionButtons({
    row,
    id,
    active,
    onEdit,
    onToggle,
    editTitle = "Editar",
    toggleTitleActive = "Desactivar",
    toggleTitleInactive = "Activar",
}) {
    const buttonBase = "flex items-center justify-center w-8 h-8 rounded-full text-[var(--color-primario)] hover:bg-gray-200 transition-transform duration-200 hover:scale-110";
    return (
        <div className="flex items-center justify-center gap-2">
            <Tooltip title={editTitle} arrow>
                {active ? (
                    <button
                        onClick={() => onEdit(row)}
                        className={buttonBase}
                    >
                        <Pencil size={18} />
                    </button>
                ) : (
                    <span>
                        <button
                            disabled
                            className={`${buttonBase} cursor-not-allowed opacity-50`}
                        >
                            <Pencil size={18} />
                        </button>
                    </span>
                )}
            </Tooltip>

            <Tooltip title={active ? toggleTitleActive : toggleTitleInactive} arrow>
                <button
                    onClick={() => onToggle(id, active)}
                    className={buttonBase}
                >
                    {active ? (
                        <ToggleRight size={18} className="text-[var(--color-cancelar)]" />
                    ) : (
                        <ToggleLeft size={18} />
                    )}
                </button>
            </Tooltip>
        </div>
    );
}