import { Tooltip } from "@mui/material";
import { Pencil, ToggleRight, ToggleLeft } from "lucide-react";
import StatusBadge from "../../components/ui/StatusBadge.jsx";
import formatPhone from "../../utils/phoneFormatter.js";
import formatDateTime from "../../utils/timeFormatter.js";
import formatAddress from "../../utils/adreessFormatter.js";

export const contribuyentesColumns = (onEdit, onToggleStatus) => [
  {
    field: "clave_unica",
    headerName: "Clave Única",
    width: 120,
  },
  {
    field: "nombre",
    headerName: "Nombre Completo",
    width: 400,
    valueGetter: (params, row) =>
      `${row.nombre} ${row.apellido_paterno} ${row.apellido_materno}`,
  },
  {
    field: "fecha_nacimiento",
    headerName: "Fecha de Nacimiento",
    width: 180,
    renderCell: (params) =>
      new Date(params.row.fecha_nacimiento).toLocaleDateString("es-MX"),
  },
  {
    field: "rfc",
    headerName: "RFC",
    width: 150,
    renderCell: (params) => params.row.rfc ? (
      params.row.rfc
    ) : (
      <span className="px-3 py-1 rounded-lg bg-[var(--color-inactivo)] text-[var(--color-texto)] text-xs font-medium">
        Sin RFC
      </span>
    ),
  },
  {
    field: "direccion",
    headerName: "Dirección",
    flex: 1,
    valueGetter: (params, row) =>
      formatAddress(row.calle, row.numero_calle, row.barrio),
  },
  {
    field: "telefono",
    headerName: "Teléfono",
    width: 140,
    valueFormatter: formatPhone,
  },
  {
    field: "updatedAt",
    headerName: "Última Actualización",
    width: 180,
    valueFormatter: formatDateTime,
  },
  {
    field: "activo",
    headerName: "Estado",
    width: 140,
    sortable: false,
    renderCell: (params) => <StatusBadge activo={params.row.activo} />
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
