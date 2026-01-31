import { createPagoAPI } from "../../../api/pago.js";
import { showToast } from "../../../utils/alerts/toast.js";
import NumeroALetras from "@vigilio/numeros-a-letras";
import Stack from "../../../components/layouts/Stack.jsx";
import CardCobro from "../../../components/cards/CardCobro.jsx";
import InfoItem from "./InfoItem.jsx";

const today = new Date();
const ejercicioFiscal = today.getFullYear();
const fechaActual = today.toLocaleDateString("es-MX", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const ResumenRecibo = ({
  concepto,
  estimulo,
  contribuyente,
  form,
  onClear,
  disabled,
}) => {
  const values = form.watch();

  const onSubmit = async (data) => {
    console.log("Formulario enviado con datos:", data);
    try {
      await createPagoAPI(data);
      showToast("success", "Pago registrado exitosamente");
      form.reset();
    } catch (error) {
      console.error("Error al guardar el pago", error);
      showToast("error", "Error al registrar el pago");
    }
  };

  const handleCancel = () => {
    if (onClear) onClear(); // Limpia el formulario
  };

  const montoBase = Number(concepto?.monto_base) || 0;
  const porcentajeDescuento = Number(estimulo?.porcentaje_descuento) || 0;
  const total = montoBase - (montoBase * porcentajeDescuento) / 100;
  let totalEnLetras;
  if (total === 0) {
    totalEnLetras = "CERO PESOS 00/100";
  } else {
    totalEnLetras = NumeroALetras(total, {
      plural: "PESOS",
      singular: "PESO",
      centPlural: "CENTAVOS",
      centSingular: "CENTAVO",
    });
  }

  return (
    <CardCobro title="Resumen del Recibo">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stack size="md">
          {/* Información del folio y fecha */}
          <Stack size="md">
            <InfoItem label="Folio del Recibo" value="REC-PENDIENTE" />
            <InfoItem label="Fecha" value={fechaActual} />
            <InfoItem label="Ejercicio Fiscal" value={ejercicioFiscal} />

            <hr className="border-gray-300" />

            {/* Detalles del pago */}
            <InfoItem
              label="Concepto de Pago"
              value={
                [concepto?.nombre].filter(Boolean).join(" ") ||
                "No Seleccionado"
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
              value={
                [concepto?.monto_base].filter(Boolean).join(" ") || "$0.00"
              }
            />
            <InfoItem
              label="Descuento Aplicado"
              value={
                estimulo?.porcentaje_descuento !== undefined &&
                estimulo?.porcentaje_descuento !== null
                  ? `${estimulo.porcentaje_descuento}%`
                  : "No Seleccionado"
              }
            />
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
                <span className="text-2xl font-black">
                  ${total.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div class="pt-2 border-t border-[var(--color-borde)] flex justify-between items-center">
                <p class="text-xs text-primary/70 uppercase">Total en letra</p>
                <p class="text-xs leading-relaxed text-[var(--color-texto)] uppercase">
                  {totalEnLetras}
                </p>
              </div>
            </Stack>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-5">
            <button
              type="submit"
              disabled={disabled}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 font-medium rounded-lg transition-colors  bg-[var(--color-primario)] text-white hover:bg-green-700
                ${disabled ? "opacity-60 cursor-not-allowed hover:bg-[var(--color-primario)]" : ""}`}
            >
              Cobrar
            </button>
            <button
              type="button"
              disabled={disabled}
              onClick={handleCancel}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 font-medium rounded-lg transition-colors bg-[var(--color-cancelar)] text-white hover:bg-red-700
                ${disabled ? "opacity-60 cursor-not-allowed hover:bg-[var(--color-cancelar)]" : ""}`}
            >
              Cancelar
            </button>
          </div>
        </Stack>
      </form>
    </CardCobro>
  );
};

export default ResumenRecibo;
