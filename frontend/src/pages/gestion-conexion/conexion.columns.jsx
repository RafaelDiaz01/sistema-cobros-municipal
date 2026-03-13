import { Tooltip } from "@mui/material";
import { Pencil, ToggleRight, ToggleLeft } from "lucide-react";

export const conexionColumns = (onEdit, onToggleStatus) => [
    {
        field: "cuenta",
        headerName: "Cuenta Única",
        width: 170,
    },
    {
        field: "nombre_contribuyente",
        headerName: "Propietario",
        width: 300,
        renderCell: (params) => {
            return `${params.row.contribuyente?.nombre || ""} ${params.row.contribuyente?.apellido_paterno || ""} ${params.row.contribuyente?.apellido_materno || ""}` || 'Sin contribuyente';
        }
    },
    {
        field: "ubicacion",
        headerName: "Ubicación de la Conexión",
        flex: 1,
        renderCell: (params) =>
            `${params.row.calle} #${params.row.numero_calle || ""}, ${params.row.barrio}`,
    },
    {
        field: "referencia",
        headerName: "Referencia de Ubicación",
        flex: 1,
    },
    {
        field: "tipo",
        headerName: "Tipo de Conexión",
        width: 150,
    },
    {
        field: "uso",
        headerName: "Uso de Servicio",
        width: 130,
    },
    {
        field: "fecha_conexion",
        headerName: "Fecha de Apertura",
        width: 150,
    },
    {
        field: "activo",
        headerName: "Estado",
        width: 100,
        sortable: false,
        renderCell: (params) =>
            params.row.activo ? (
                <span className="px-3 py-1 rounded-lg bg-[#E8F8EE] text-[var(--color-texto)] text-xs font-medium">
                    Activa
                </span>
            ) : (
                <span className="px-3 py-1 rounded-lg bg-[#E6E7EB] text-[#4B5563] text-xs font-medium">
                    Inactiva
                </span>
            ),
    },
    {
        field: "actions",
        headerName: "Acciones",
        width: 120,
        sortable: false,
        filterable: false,
        renderCell: (params) => {
            const { id_conexion, activo } = params.row;

            return (
                <div className="flex items-center justify-center gap-4">
                    <Tooltip title="Editar Conexión">
                        <button
                            onClick={() => onEdit(params.row)}
                            className="flex items-center justify-center w-8 h-8 rounded-full
                       text-[var(--color-primario)]
                       hover:bg-gray-200
                       transition-transform duration-200 hover:scale-110"
                        >
                            <Pencil size={18} />
                        </button>
                    </Tooltip>
                    <Tooltip
                        title={activo ? "Desactivar Conexión" : "Activar Conexión"}
                    >
                        <button
                            onClick={() => onToggleStatus(id_conexion, activo)}
                            className="hover:opacity-70 flex items-center"
                        >
                            {activo ? (
                                <ToggleRight
                                    size={18}
                                    className="text-[var(--color-cancelar)]"
                                />
                            ) : (
                                <ToggleLeft
                                    size={18}
                                    className="text-[var(--color-primario)]"
                                />
                            )}
                        </button>
                    </Tooltip>
                </div>
            );
        },
    },
];
