import React from "react";
import { Printer, Download } from "lucide-react";
import Stack from "../../components/layouts/Stack.jsx";
import CardCobro from "../../components/cards/CardCobro.jsx";

const ResumenRecibo = () => {
  return (
    <CardCobro title="Resumen del Recibo">
      <Stack size="md">
        {/* Información del folio y fecha */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 uppercase font-semibold">FOLIO:</p>
            <p className="font-mono font-bold text-gray-700">2024-00123</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-500 uppercase font-semibold">FECHA:</p>
            <p className="font-mono font-bold text-gray-700">
              09 de Febrero, 2026
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-500 uppercase font-semibold">EJERCICIO FISCAL:</p>
            <p className="font-mono font-bold text-gray-700">
              2026
            </p>
          </div>
        </div>

        {/* Detalles del pago */}
        <div className="border-t border-b border-gray-200 py-4">
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-700 font-medium">
              Predial - Enero 2024
            </span>
            <span className="text-gray-800 font-semibold">$1,250.00</span>
          </div>
        </div>

        {/* Resumen financiero */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">$1,250.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Descuento Total (10%)</span>
            <span className="text-green-600 font-medium">-$125.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Impuestos</span>
            <span className="font-medium">$0.00</span>
          </div>
        </div>

        {/* Línea divisoria */}
        <hr className="border-gray-300" />

        {/* Total a pagar */}
        <div class="bg-[var(--color-terciario)] p-4 rounded-lg mt-4 border border-[var(--color-borde)]">
          <div class="flex justify-between items-center text-[var(--color-texto)] mb-2">
            <span class="text-sm font-bold uppercase tracking-widest">TOTAL A PAGAR</span>
            <span class="text-2xl font-black">$1,125.00</span>
          </div>
          <div class="pt-2 border-t border-[var(--color-borde)]">
            <p class="text-[10px] font-bold text-primary/70 uppercase mb-1">Total en letra:</p>
            <p class="text-[11px] leading-relaxed font-bold text-gray-700 dark:text-gray-200 uppercase">
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
    </CardCobro >
  );
};

export default ResumenRecibo;
