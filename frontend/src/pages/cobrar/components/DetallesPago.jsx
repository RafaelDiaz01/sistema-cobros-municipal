import CardCobro from "../../../components/cards/CardCobro.jsx";
import Grid from "../../../components/modals/components/Grid.jsx";
import Input from "../../../components/modals/components/Input.jsx";
import Select from "../../../components/modals/components/Select.jsx";
import TextArea from "../../../components/modals/components/TextArea.jsx";
import AsyncAutocomplete from "../../../components/ui/AsyncAutocomplete.jsx";
import Stack from "../../../components/layouts/Stack.jsx";

export default function DetallesPago({
  conceptoSeleccionado,
  conceptoInput,
  setConceptoInput,
  estimuloSeleccionado,
  estimuloInput,
  setEstimuloInput,
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
        value={conceptoSeleccionado}
        inputValue={conceptoInput}
        onSelect={onSelectConcepto}
        onInputChange={setConceptoInput}
        searchFn={searchConceptoPagoAPI}
        getOptionLabel={(option) => option.nombre}
        renderOption={(props, option) => {
          const { key, ...rest } = props;
          return (
            <li key={key} {...rest}>
              {option.nombre}
            </li>
          );
        }}
        placeholder="Ej. Predial, Agua, Impuestos"
        disabled={disabled}
      />
      <Grid cols={4}>
        <div className="col-span-1">
          <Input
            label="Monto a Pagar"
            disabled={disabled}
            placeholder="Ej. 1,250.00"
            {...register("monto", {
              required: "El monto es obligatorio",
              pattern: {
                value: /^[1-9]\d{0,4}(\.\d{1,2})?$/,
                message: "Monto inválido",
              },
              validate: (value) =>
                parseFloat(value) > 0 || "El monto debe ser mayor a cero",
            })}
          />
          {form.formState.errors.monto && (
            <span className="text-red-500 text-xs">
              {form.formState.errors.monto.message}
            </span>
          )}
        </div>
        <div className="col-span-1">
          <Input
            label="Periodo de Pago"
            disabled={disabled}
            placeholder="Ej. Enero - Diciembre"
            {...register("periodo", {
              required: "El periodo es obligatorio",
              maxLength: {
                value: 30,
                message: "No puede tener más de 30 caracteres",
              },
              pattern: {
                value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s\-]+$/,
                message: "Solo se permiten letras",
              },
            })}
          />
          {form.formState.errors.periodo && (
            <span className="text-red-500 text-xs">
              {form.formState.errors.periodo.message}
            </span>
          )}
        </div>
        <Stack size="xs">
          <label className="text-sm font-medium">
            {"Descuento"} <span className="text-red-500">*</span>
          </label>
          <AsyncAutocomplete
            value={estimuloSeleccionado}
            inputValue={estimuloInput}
            onSelect={onSelectEstimulo}
            onInputChange={setEstimuloInput}
            searchFn={searchEstimuloFiscalAPI}
            getOptionLabel={(option) => option.nombre}
            renderOption={(props, option) => (
              <li {...props} key={option.id_estimulo}>
                <div>
                  <span className="font-semibold">{option.nombre}</span>
                  <span className="text-xs text-[var(--color-acento)]">
                    {option.porcentaje_descuento
                      ? ` (${option.porcentaje_descuento}% descuento)`
                      : ""}
                  </span>
                  <div className="text-xs text-gray-400">{option.resumen}</div>
                </div>
              </li>
            )}
            placeholder="Ej. Impuesto Predial - Mayores de 60 años"
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
      <p className="text-[11px] text-gray-400 italic">
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
