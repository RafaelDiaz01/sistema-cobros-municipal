import StatusBadge from "../../components/ui/StatusBadge.jsx";
import ActionButtons from "../../components/ui/ActionButtons.jsx";
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
    valueGetter: (_, row) =>
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
    valueGetter: (_, row) =>
      formatAddress(row.calle, row.numero_calle, row.barrio),
  },
  {
    field: "telefono",
    headerName: "Teléfono",
    width: 140,
    valueFormatter: (value) => formatPhone(value),
  },
  {
    field: "updatedAt",
    headerName: "Última Actualización",
    width: 180,
    valueFormatter: (value) => formatDateTime(value),
  },
  {
    field: "activo",
    headerName: "Estado",
    width: 100,
    sortable: false,
    renderCell: (params) => <StatusBadge activo={params.row.activo} />
  },
  {
    field: "acciones",
    headerName: "Acciones",
    width: 100,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <ActionButtons
        row={params.row}
        id={params.row.id_contribuyente}
        active={params.row.activo}
        onEdit={onEdit}
        onToggle={onToggleStatus}
        editTitle="Editar contribuyente"
        toggleTitleActive="Desactivar contribuyente"
        toggleTitleInactive="Activar contribuyente"
      />
    )
  },
];
