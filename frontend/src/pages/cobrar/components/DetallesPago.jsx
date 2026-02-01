import CardCobro from "../../../components/cards/CardCobro.jsx";
import Grid from "../../../components/modals/components/Grid.jsx";
import Input from "../../../components/modals/components/Input.jsx";
import Select from "../../../components/modals/components/Select.jsx";
import TextArea from "../../../components/modals/components/TextArea.jsx";
import AsyncAutocomplete from "../../../components/ui/AsyncAutocomplete.jsx";
import Stack from "../../../components/layouts/Stack.jsx";

export default function DetallesPago({
  onSelectConcepto,
  onSelectEstimulo,
  searchConceptoPagoAPI,
  searchEstimuloFiscalAPI,
  form,
  disabled,
}) {
  const { register } = form;
  return (
    <CardCobro title="Detalles del Pago">
      <label className="text-sm font-medium">
        {"Concepto de Pago"} <span className="text-red-500">*</span>
      </label>
      <AsyncAutocomplete
        onSelect={onSelectConcepto}
        searchFn={searchConceptoPagoAPI}
        getOptionLabel={(option) => option.nombre}
        renderOption={(props, option) => (
          <li {...props} key={option.id_concepto_pago}>
            {option.nombre}
          </li>
        )}
        placeholder="Ej. Predial, Agua, Impuestos"
        disabled={disabled}
      />
      <Grid cols={4}>
        <Input
          label="Monto a Pagar"
          disabled={disabled}
          placeholder="Ej. 1,250.00"
          {...register("monto")}
        />
        <Input
          label="Periodo de Pago"
          disabled={disabled}
          placeholder="Ej. Enero - Diciembre 2024"
          {...register("periodo")}
        />
        <Stack size="xs">
          <label className="text-sm font-medium">
            {"Descuento"} <span className="text-red-500">*</span>
          </label>
          <AsyncAutocomplete
            onSelect={onSelectEstimulo}
            searchFn={searchEstimuloFiscalAPI}
            getOptionLabel={(option) => option.nombre}
            renderOption={(props, option) => (
              <li {...props} key={option.id_estimulo}>
                {option.nombre}
              </li>
            )}
            placeholder="Ej. Certificado"
            disabled={disabled}
          />
        </Stack>
        <Select
          label="Método de Pago"
          disabled={disabled}
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
        disabled={disabled}
        placeholder="Ej. Pago de Predial correspondiente al año 2024"
        {...register("descripcion")}
      />
    </CardCobro>
  );
}
