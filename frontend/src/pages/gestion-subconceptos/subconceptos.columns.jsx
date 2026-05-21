import StatusBadge from "../../components/ui/StatusBadge";
import ActionButtons from "../../components/ui/ActionButtons";
import moneyFormatter from "../../utils/moneyFormatter.js";

export const subconceptosColumns = (onEdit, onToggleStatus) => [
  {
    field: "nombre",
    headerName: "Nombre",
    flex: 2,
  },
  {
    field: "clave_subconcepto",
    headerName: "Clave de Subconcepto",
    width: 200,
  },
  {
    field: "monto_base",
    headerName: "Monto Base",
    width: 120,
    valueFormatter: moneyFormatter,
  },
  {
    field: "activo",
    headerName: "Estado",
    width: 100,
    sortable: false,
    renderCell: (params) => <StatusBadge activo={params.row.activo} />
  },
  {
    field: "actions",
    headerName: "Acciones",
    width: 100,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <ActionButtons
        row={params.row}
        id={params.row.id_subconcepto}
        active={params.row.activo}
        onEdit={onEdit}
        onToggle={onToggleStatus}
        editTitle="Editar Subconcepto"
        toggleTitleActive="Desactivar Subconcepto"
        toggleTitleInactive="Activar Subconcepto"
      />
    )
  },
];