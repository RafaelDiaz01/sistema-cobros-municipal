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
            <p className="text-sm text-gray-500 font-medium">FOLIO:</p>
            <p className="text-lg font-semibold text-gray-800">2024-00123</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500 font-medium">FECHA:</p>
            <p className="text-lg font-semibold text-gray-800">
              24 de Mayo, 2024
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
        <div className="text-center">
          <p className="text-sm text-gray-500 font-medium">TOTAL A PAGAR</p>
          <p
            className="text-3xl font-bold"
            style={{ color: "var(--color-primario)" }}
          >
            $1,125.00
          </p>
        </div>

        {/* Total en letra */}
        <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-700 font-medium">
            MIL CIENTO VEINTICINCO PESOS 00/100 M.N.
          </p>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-4 pt-4">
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 transition-colors">
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
