import { Tooltip } from "@mui/material";
import { Pencil, ToggleRight, ToggleLeft } from "lucide-react";

export const basesCatastralesColumns = (onEdit, onToggleStatus) => [
    {
        field: "cuenta",
        headerName: "Cuenta Catastral",
        width: 150,
    },
    {
        field: "propietario",
        headerName: "Propietario",
        width: 250,
        valueGetter: (params, row) =>
            `${row.contribuyente.nombre} ${row.contribuyente.apellido_paterno} ${row.contribuyente.apellido_materno}`,
    },
    {
        field: "valor",
        headerName: "Valor",
        width: 200,
    },
    {
        field: "impuesto_calculado",
        headerName: "Impuesto Calculado",
        width: 200,
    },
    {
        field: "direccion",
        headerName: "Dirección de la Base Catastral",
        flex: 1,
        valueGetter: (params, row) =>
            `${row.calle} #${row.numero_calle}, ${row.barrio}`,
    },
    {
        field: "fecha_avaluo",
        headerName: "Última Fecha de Avalúo",
        width: 200,
    },
    {
        field: "activo",
        headerName: "Estado",
        width: 140,
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
        width: 120,
        sortable: false,
        filterable: false,
        renderCell: (params) => {
            const { id_base_catastral, activo } = params.row;

            return (
                <div className="flex items-center justify-center gap-4">
                    <Tooltip title="Editar Base Catastral">
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
                        title={activo ? "Desactivar Base Catastral" : "Activar Base Catastral"}
                    >
                        <button
                            onClick={() => onToggleStatus(id_base_catastral, activo)}
                            className="hover :opacity-70 flex items-center"
                        >
                            {activo ? <ToggleRight size={18} className="text-[var(--color-cancelar)]" /> : <ToggleLeft size={18} className="text-[var(--color-primario)]" />}
                        </button>
                    </Tooltip>
                </div>
            );
        },
    },
];