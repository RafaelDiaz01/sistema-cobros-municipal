import CardCobro from "../../components/cards/CardCobro";

export default function ResumenRecibo({ total }) {
  return (
    <CardCobro className="bg-white rounded-2xl border border-[var(--color-borde)] p-6">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-sm font-semibold">Resumen del Recibo</h4>
        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
          BORRADOR
        </span>
      </div>

      <div className="text-sm space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>$1,250.00</span>
        </div>

        <div className="flex justify-between text-red-500">
          <span>Descuento (10%)</span>
          <span>-$125.00</span>
        </div>

        <hr />

        <div className="flex justify-between font-semibold text-green-700">
          <span>Total a pagar</span>
          <span>${total}</span>
        </div>
      </div>
    </CardCobro>
  );
}
