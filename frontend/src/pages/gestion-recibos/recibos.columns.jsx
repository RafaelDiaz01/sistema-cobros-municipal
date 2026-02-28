import { Tooltip } from "@mui/material";
import { Printer, FileX } from "lucide-react";

export const recibosColumns = (onEdit, onToggleStatus) => [
    {
        field: "folio",
        headerName: "Folio",
        width: 100,
    },
    {
        field: "estado",
        headerName: "Estado",
        width: 150,
        renderCell: (params) => {
            const estado = params.row.estado;
            const color =
                estado === "EMITIDO"
                    ? "#E8F8EE"
                    : estado === "CANCELADO"
                        ? "#FDEDEC"
                        : "#E6E7EB";
            const textColor =
                estado === "EMITIDO"
                    ? "var(--color-texto)"
                    : estado === "CANCELADO"
                        ? "#C0392B"
                        : "#4B5563";
            return (
                <span
                    className="px-3 py-1 rounded-lg text-xs font-medium"
                    style={{ backgroundColor: color, color: textColor }}
                >
                    {estado}
                </span>
            );
        },
    },
    {
        field: "updatedAt",
        headerName: "Última Actualización",
        flex: 1,
        renderCell: (params) =>
            new Date(params.row.updatedAt).toLocaleString("es-MX"),
    },
    {
        field: "acciones",
        headerName: "Acciones",
        width: 140,
        sortable: false,
        filterable: false,

        renderCell: (params) => {
            const { id_recibo, estado } = params.row;

            return (
                <div className="flex items-center justify-center gap-4">
                    <Tooltip title="Imprimir recibo" arrow>
                        <button
                            onClick={() => onEdit(params.row)}
                            className="flex items-center justify-center w-8 h-8 rounded-full
                       text-[var(--color-primario)]
                       hover:bg-gray-200
                       transition-transform duration-200 hover:scale-110"
                        >
                            <Printer size={18} />
                        </button>
                    </Tooltip>

                    <Tooltip
                        title={estado === "CANCELADO" ? "Recibo cancelado" : "Cancelar recibo"}
                        arrow
                    >
                        {estado === "CANCELADO" ? (
                            <button
                                className="flex items-center cursor-not-allowed"
                                disabled
                            >
                                <FileX size={18} className="text-gray-400" />
                            </button>
                        ) : (
                            <button
                                onClick={() => onToggleStatus(id_recibo)}
                                className="hover:opacity-70 flex items-center"
                            >
                                <FileX size={18} className="text-red-500" />
                            </button>
                        )}
                    </Tooltip>
                </div>
            );
        },
    },];