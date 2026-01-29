import { Tooltip } from "@mui/material";
import { User } from "lucide-react";

export const corteColumns = () => [
  {
    field: "folio",
    headerName: "Folio",
    width: 150,
  },
  {
    field: "contribuyente",
    headerName: "Contribuyente",
    flex: 1,
    valueGetter: (params, row) =>
      `${row.contribuyente.nombre} ${row.contribuyente.apellido_paterno} ${row.contribuyente.apellido_materno}`,
  },
  {
    field: "concepto_pago",
    headerName: "Concepto de Pago",
    flex: 1,
    renderCell: (params) => (
      <Tooltip title={params.value} arrow>
        <span className="flex items-center gap-1">
          {params.value.length > 30
            ? `${params.value.substring(0, 30)}...`
            : params.value}
          {params.value.length > 30 && <User size={14} />}
        </span>
      </Tooltip>
    ),
  },
  {
    field: "fecha_pago",
    headerName: "Fecha de Pago",
    width: 180,
    valueGetter: (params, row) => {
      const value = params.value || (row && row.fecha_pago);
      if (!value) return "";
      if (typeof value === "string" && value.length >= 10) {
        return value.slice(0, 10);
      }
      if (value instanceof Date) {
        return value.toISOString().slice(0, 10);
      }
      return "";
    },
  },
  {
    field: "metodo_pago",
    headerName: "Método de Pago",
    width: 150,
  },
  {
    field: "monto",
    headerName: "Monto",
    width: 120,
    valueGetter: (params, row) => {
      const value = Number(row.monto || 0);
      return `$${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    },
  },
];
