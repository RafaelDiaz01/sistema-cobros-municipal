import { Pencil, Trash2 } from "lucide-react";

export const contribuyentesColumns = (onEdit, onToggleStatus) => [
  {
    field: "id_contribuyente",
    headerName: "ID",
    width: 90,
  },
  {
    field: "nombreCompleto",
    headerName: "Nombre Completo",
    flex: 1,
    renderCell: ({ row }) => (
      <span className="font-medium">
        {row.nombre} {row.apellido_paterno} {row.apellido_materno}
      </span>
    ),
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
    width: 120,
    renderCell: (params) => (params.value ? "Activo" : "Inactivo"),
  },
  {
    field: "acciones",
    headerName: "Acciones",
    width: 150,
    renderCell: (params) => (
      <div className="flex gap-3">
        <button onClick={() => onEdit(params.row)}>
          <Pencil size={18} />
        </button>
        <button onClick={() => onToggleStatus(params.row)}>
          <Trash2 size={18} />
        </button>
      </div>
    ),
  },
];
