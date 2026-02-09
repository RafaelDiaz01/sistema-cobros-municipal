import { Tooltip } from "@mui/material";
import { Pencil, ToggleRight, ToggleLeft } from "lucide-react";

export const estimulosColumns = (onEdit, onToggleStatus) => [
  {
    field: "nombre",
    headerName: "Nombre del Estímulo",
    width: 300,
  },
  {
    field: "descripcion",
    headerName: "Descripción",
    flex: 1,
  },
  {
    field: "porcentaje_descuento",
    headerName: "Descuento (%)",
    width: 150,
    renderCell: (params) => `${params.row.porcentaje_descuento}%`,
  },
  {
    field: "requisitos",
    headerName: "Requisitos",
    flex: 1,
  },
  {
    field: "resumen",
    headerName: "Resumen",
    flex: 1,
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
    renderCell: (params) => (
      <div className="flex items-center gap-2">
        <Tooltip title="Editar Estímulo">
          <Pencil
            size={18}
            className="text-gray-600 cursor-pointer hover:text-gray-800"
            onClick={() => onEdit(params.row)}
          />
        </Tooltip>
        <Tooltip
          title={params.row.activo ? "Desactivar Estímulo" : "Activar Estímulo"}
        >
          {params.row.activo ? (
            <ToggleRight
              size={18}
              className="text-green-500 cursor-pointer hover:text-green-700"
              onClick={() => onToggleStatus(params.row.id, false)}
            />
          ) : (
            <ToggleLeft
              size={18}
              className="text-gray-500 cursor-pointer hover:text-gray-700"
              onClick={() => onToggleStatus(params.row.id, true)}
            />
          )}
        </Tooltip>
      </div>
    ),
  },
];
