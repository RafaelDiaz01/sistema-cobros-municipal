import { Tooltip } from "@mui/material";
import { Pencil, ToggleRight, ToggleLeft } from "lucide-react";
import moneyFormatter from "../../utils/moneyFormatter.js";

export const ejerciciosColumns = (onEdit, onToggleStatus) => [
    {
        field: "anio",
        headerName: "Año del Ejercicio",
        width: 150,
    },
    {
        field: "descripcion",
        headerName: "Descripción",
        flex: 1,
    },
    {
        field: "proyeccion_ingreso",
        headerName: "Proyección de Ingreso",
        width: 200,
        valueFormatter: moneyFormatter,
    },
    {
        field: "ingreso_recaudado",
        headerName: "Ingreso Recaudado",
        width: 200,
        valueFormatter: moneyFormatter,
    },
    {
        field: "activo",
        headerName: "Estado",
        width: 150,
        sortable: false,
        renderCell: (params) =>
            params.row.activo ? (
                <span className="px-3 py-1 rounded-lg bg-[#E8F8EE] text-[var(--color-texto)] text-xs font-medium">
                    Activo
                </span>
            ) : (
                <span className="px-3 py-1 rounded-lg bg-[#E6E7EB] text-[#4B5563] text-xs font-medium">
                    Inactivo
                </span>
            ),
    },
    {
        field: "actions",
        headerName: "Acciones",
        width: 150,
        sortable: false,
        filterable: false,
        renderCell: (params) => {
            const { id_ejercicio, activo } = params.row;

            return (
                <div className="flex items-center justify-center gap-4">
                    <Tooltip title="Editar Ejercicio Fiscal">
                        <button
                            onClick={() => onEdit(params.row)}
                            className="flex items-center justify-center w-8 h-8 rounded-full
                       text-[var(--color-primario)]
                       hover:bg-gray-200
                       transition-transform duration-200 hover:scale-110"
                        >
                            <Pencil size={16} />
                        </button>
                    </Tooltip>
                    <Tooltip title={activo ? "Desactivar Ejercicio" : "Activar Ejercicio"}>
                        <button
                            onClick={() => onToggleStatus(id_ejercicio, activo)}
                            className={`flex items-center justify-center w-8 h-8 rounded-full
                       hover:bg-gray-200
                       transition-transform duration-200 hover:scale-110 ${activo
                                    ? "text-[var(--color-cancelar)]"
                                    : "text-[var(--color-primario)]"
                                }`}
                        >
                            {activo ? (
                                <ToggleRight size={16} />
                            ) : (
                                <ToggleLeft size={16} />
                            )}
                        </button>
                    </Tooltip>
                </div>
            );
        },
    }
];