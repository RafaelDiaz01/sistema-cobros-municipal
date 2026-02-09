import { Tooltip } from "@mui/material";
import { Pencil, ToggleRight, ToggleLeft } from "lucide-react";

export const cuentasColumns = (onEdit, onToggleStatus) => [
  {
    field: "nombre",
    headerName: "Nombre",
    flex: 1,
  },
  {
    field: "clave_cuenta",
    headerName: "Clave de Cuenta",
    flex: 2,
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
      const { id_cuenta_contable, activo } = params.row;

      return (
        <div className="flex items-center justify-center gap-4">
          <Tooltip title="Editar Cuenta Contable">
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
          <Tooltip title={activo ? "Desactivar Cuenta Contable" : "Activar Cuenta Contable"}>
            <button
              onClick={() => onToggleStatus(id_cuenta_contable, activo)}
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
              )}{" "}
            </button>
          </Tooltip>
        </div>
      );
    },
  },
];
