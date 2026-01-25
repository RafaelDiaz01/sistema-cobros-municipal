import React from "react";
import { HandCoins } from "lucide-react";
import Stack from "../../components/layouts/Stack.jsx";
import CardCobro from "../../components/cards/CardCobro.jsx";
import InfoItem from "../../components/cobros/InfoItem.jsx";
import Grid from "../../components/modals/components/Grid.jsx";

const today = new Date();
const ejercicioFiscal = today.getFullYear();
const fechaActual = today.toLocaleDateString("es-MX", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const ResumenRecibo = ({ concepto, contribuyente, form }) => {
  const values = form.watch();
  return (
    <CardCobro title="Resumen del Recibo">
      <Stack size="md">
        {/* Información del folio y fecha */}
        <Stack size="md">
          <InfoItem label="Folio del Recibo" value="RC-000123" />
          <InfoItem label="Fecha" value={fechaActual} />
          <InfoItem label="Ejercicio Fiscal" value={ejercicioFiscal} />

          <hr className="border-gray-300" />

          {/* Detalles del pago */}
          <InfoItem
            label="Concepto de Pago"
            value={
              [concepto?.nombre].filter(Boolean).join(" ") || "No Seleccionado"
            }
          />
          <InfoItem
            label="Periodo de Pago"
            value={values.periodo || "No Seleccionado"}
          />
          <InfoItem
            label="Método de Pago"
            value={values.metodo_pago || "No Seleccionado"}
          />

          <hr className="border-gray-300" />

          {/* Resumen financiero */}
          <InfoItem
            label="Contribuyente"
            value={
              [
                contribuyente?.nombre,
                contribuyente?.apellido_paterno,
                contribuyente?.apellido_materno,
              ]
                .filter(Boolean)
                .join(" ") || "No Seleccionado"
            }
          />
          <InfoItem
            label="Subtotal"
            value={[concepto?.monto_base].filter(Boolean).join(" ") || "$0.00"}
          />
          <InfoItem label="Descuento Aplicado" value="-$125.00" />
        </Stack>

        {/* Línea divisoria */}
        <hr className="border-gray-300" />

        {/* Total a pagar */}
        <div class="bg-[var(--color-terciario)] p-4 rounded-lg border border-[var(--color-borde)]">
          <Stack size="sm">
            <div class="flex justify-between items-center text-[var(--color-texto)]">
              <span class="text-sm font-bold uppercase tracking-widest">
                TOTAL
              </span>
              <span class="text-2xl font-black">$1,125.00</span>
            </div>
            <div class="pt-2 border-t border-[var(--color-borde)] flex justify-between items-center">
              <p class="text-xs text-primary/70 uppercase">Total en letra</p>
              <p class="text-xs leading-relaxed text-[var(--color-texto)] uppercase">
                MIL CIENTO VEINTICINCO PESOS 00/100 M.X.N.
              </p>
            </div>
          </Stack>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-4">
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[var(--color-primario)] text-white ext-white font-medium rounded-lg hover:bg-green-700 transition-colors">
            <HandCoins size={20} />
            Cobrar
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[var(--color-cancelar)] text-white font-medium rounded-lg hover:bg-red-700 transition-colors">
            Cancelar
          </button>
        </div>
      </Stack>
    </CardCobro>
  );
};

export default ResumenRecibo;
