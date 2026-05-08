import { Tooltip } from "@mui/material";
import { Pencil, ToggleRight, ToggleLeft } from "lucide-react";
import formatPhone from "../../utils/phoneFormatter.js";
import formatDateTime from "../../utils/timeFormatter.js";

export const usuariosColumns = (onEdit, onToggleStatus) => [
    {
        field: "nombre_completo",
        headerName: "Nombre Completo",
        flex: 1,
    },
    {
        field: "nombre_usuario",
        headerName: "Nombre de Usuario",
        width: 170,
    },
    {
        field: "cargo",
        headerName: "Cargo",
        width: 200,
    },
    {
        field: "departamento",
        headerName: "Departamento",
        width: 200,
    },
    {
        field: "correo",
        headerName: "Correo Electrónico",
        flex: 1,
    },
    {
        field: "telefono",
        headerName: "Teléfono",
        width: 110,
        valueFormatter: formatPhone,
    },
    {
        field: "rol_usuario",
        headerName: "Rol",
        width: 120,
    },
    {
        field: "ultimo_acceso",
        headerName: "Último Acceso",
        width: 160,
        valueFormatter: formatDateTime,
    },
    {
        field: "activo",
        headerName: "Estado",
        width: 100,
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
        width: 110,
        sortable: false,
        filterable: false,
        renderCell: (params) => {
            const { id_usuario, activo } = params.row;

            return (
                <div className="flex items-center justify-center gap-4">
                    <Tooltip title="Editar Usuario">
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
                        title={activo ? "Desactivar Usuario" : "Activar Usuario"}
                    >
                        <button
                            onClick={() => onToggleStatus(id_usuario, activo)}
                            className="flex items-center justify-center w-8 h-8 rounded-full
                                       text-[var(--color-primario)]
                                       hover:bg-gray-200
                                       transition-transform duration-200 hover:scale-110"
                        >
                            {activo ? (
                                <ToggleRight size={18} className="text-[var(--color-cancelar)]" />
                            ) : (
                                <ToggleLeft size={18} className="text-[var(--color-primario)]" />
                            )}
                        </button>
                    </Tooltip>
                </div>
            );
        },
    },
];