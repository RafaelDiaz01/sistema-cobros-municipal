import CardCobro from "../../../components/cards/CardCobro.jsx";
import Grid from "../../../components/modals/components/Grid.jsx";
import Input from "../../../components/modals/components/Input.jsx";
import Select from "../../../components/modals/components/Select.jsx";
import TextArea from "../../../components/modals/components/TextArea.jsx";
import BuscarConceptoPago from "./BuscarConceptoPago.jsx";
import BuscarEstimuloFiscal from "./BuscarEstimuloFiscal.jsx";

export default function DetallesPago({
  onSelectConcepto,
  onSelectEstimulo,
  searchConceptoPagoAPI,
  searchEstimuloFiscalAPI,
  form,
}) {
  const { register } = form;
  return (
    <CardCobro title="Detalles del Pago">
      <label className="text-sm font-medium">
        {"Concepto de Pago"} <span className="text-red-500">*</span>
      </label>
      <BuscarConceptoPago
        onSelect={onSelectConcepto}
        searchFn={searchConceptoPagoAPI}
      />
      <Grid cols={4}>
        <Input
          label="Monto a Pagar"
          placeholder="Ej. 1,250.00"
          {...register("monto")}
        />
        <Input
          label="Periodo de Pago"
          placeholder="Ej. Enero - Diciembre 2024"
          {...register("periodo")}
        />
        <BuscarEstimuloFiscal
          onSelect={onSelectEstimulo}
          searchFn={searchEstimuloFiscalAPI}
        />
        <Select
          label="Método de Pago"
          options={["Efectivo", "Transferencia Bancaria"]}
          {...register("metodo_pago")}
        />
      </Grid>
      <p class="text-[11px] text-gray-400 italic">
        Nota: El descuento adicional por pronto pago solo aplica en los meses de
        enero y febrero.
      </p>
      <TextArea
        label="Descripción"
        placeholder="Ej. Pago de Predial correspondiente al año 2024"
        {...register("descripcion")}
      />
    </CardCobro>
  );
}
