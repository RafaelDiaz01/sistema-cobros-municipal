import React from "react";
import { Printer, Download } from "lucide-react";
import Stack from "../../components/layouts/Stack.jsx";
import CardCobro from "../../components/cards/CardCobro.jsx";
import InfoItem from "../../components/cobros/InfoItem.jsx";

const today = new Date();
const ejercicioFiscal = today.getFullYear();
const fechaActual = today.toLocaleDateString("es-MX", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const ResumenRecibo = ({ concepto }) => {
  return (
    <CardCobro title="Resumen del Recibo">
      <Stack size="sm">
        {/* Información del folio y fecha */}
        <Stack size="xs">
          <InfoItem label="Folio del Recibo" value="RC-000123" />
          <InfoItem label="Fecha" value={fechaActual} />
          <InfoItem label="Ejercicio Fiscal" value={ejercicioFiscal} />
        </Stack>

        {/* Detalles del pago */}
        <div className="border-t border-b border-gray-200 py-4">
          <Stack size="xs">
            <InfoItem label="Concepto de Pago" value={concepto?.nombre} />
            <InfoItem label="Periodo de Pago" value="Enero - Diciembre 2024" />
            <InfoItem label="Método de Pago" value="Efectivo" />
          </Stack>
        </div>

        {/* Resumen financiero */}
        <Stack size="xs">
          <InfoItem label="Subtotal" value={concepto?.monto_base} />
          <InfoItem label="Descuento Aplicado" value="-$125.00" />
        </Stack>

        {/* Línea divisoria */}
        <hr className="border-gray-300" />

        {/* Total a pagar */}
        <div class="bg-[var(--color-terciario)] p-4 rounded-lg mt-4 border border-[var(--color-borde)]">
          <div class="flex justify-between items-center text-[var(--color-texto)] mb-2">
            <span class="text-sm font-bold uppercase tracking-widest">
              TOTAL A PAGAR
            </span>
            <span class="text-2xl font-black">$1,125.00</span>
          </div>
          <div class="pt-2 border-t border-[var(--color-borde)] flex justify-between items-center">
            <p class="text-[10px] font-bold text-primary/70 uppercase mb-1">
              Total en letra
            </p>
            <p class="text-[11px] leading-relaxed font-bold text-[var(--color-texto)] uppercase">
              MIL CIENTO VEINTICINCO PESOS 00/100 M.N.
            </p>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-4 pt-4">
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[var(--color-primario)] text-white ext-white font-medium rounded-lg hover:bg-gray-900 transition-colors">
            <Printer size={20} />
            Imprimir
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-800 text-gray-800 font-medium rounded-lg hover:bg-gray-50 transition-colors">
            <Download size={20} />
            Descargar
          </button>
        </div>
      </Stack>
    </CardCobro>
  );
};

export default ResumenRecibo;
