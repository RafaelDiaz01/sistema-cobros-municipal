import { Tooltip } from "@mui/material";
import { Pencil, ToggleRight, ToggleLeft } from "lucide-react";

export const contribuyentesColumns = (onEdit, onToggleStatus) => [
  {
    field: "id_contribuyente",
    headerName: "ID",
    width: 90,
  },
  {
    field: "nombre",
    headerName: "Nombre Completo",
    flex: 1,
    valueGetter: (params, row) =>
      `${row.nombre} ${row.apellido_paterno} ${row.apellido_materno}`,
  },
  {
    field: "direccion",
    headerName: "Dirección",
    flex: 1,
    valueGetter: (params, row) =>
      `${row.calle} #${row.numero_calle}, ${row.barrio}`,
  },
  {
    field: "telefono",
    headerName: "Teléfono",
    width: 140,
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
    field: "acciones",
    headerName: "Acciones",
    width: 140,
    sortable: false,
    filterable: false,

    renderCell: (params) => {
      const { id_contribuyente, activo } = params.row;

      return (
        <div className="flex items-center justify-center gap-4">
          <Tooltip title="Editar contribuyente" arrow>
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
            title={
              activo ? "Desactivar contribuyente" : "Activar contribuyente"
            }
            arrow
          >
            <button
              onClick={() => onToggleStatus(id_contribuyente, activo)}
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
