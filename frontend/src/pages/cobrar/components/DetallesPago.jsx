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
      <Grid cols={5}>
        <div className="col-span-3">
          <Stack size="xs">
            <label className="text-sm font-medium">
              Concepto de Pago <span className="text-red-500">*</span>
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
                  <li key={option.id} {...rest}>
                    {option.nombre}
                  </li>
                );
              }}
              placeholder="Ej. Predial, Agua, Impuestos"
              disabled={disabled}
            />
          </Stack>
        </div>
        <div className="col-span-1">
          <ItemConcepto
            label="Valor del Concepto"
            value={
              conceptoSeleccionado?.monto_base
                ? `$${conceptoSeleccionado.monto_base.toLocaleString()}`
                : "Concepto Seleccionado"
            }
          />
        </div>
        <div className="col-span-1">
          <ItemConcepto
            label="Periodicidad"
            value={
              [conceptoSeleccionado?.periodicidad].filter(Boolean).join(" ") ||
              "Concepto Seleccionado"
            }
          />
        </div>
      </Grid>

      <Grid cols={5}>
        <div className="col-span-1">
          <Input
            label="Periodos a Pagar"
            disabled={disabled}
            placeholder="Ej. 2"
            {...register("periodos_pagados", {
              required: "El periodo es obligatorio",
              pattern: {
                value: /^[0-9]+$/,
                message: "Solo se permiten números",
              },
            })}
          />
          {form.formState.errors.periodos_pagados && (
            <span className="text-red-500 text-xs">
              {form.formState.errors.periodos_pagados.message}
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
        <Select
          label="Método de Pago"
          disabled={disabled}
          options={["Efectivo", "Transferencia Bancaria"]}
          {...register("metodo_pago")}
        />
        <div className="col-span-2">
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
                    <div className="text-xs text-gray-400">
                      {option.resumen}
                    </div>
                  </div>
                </li>
              )}
              placeholder="Ej. Impuesto Predial - Mayores de 60 años"
              disabled={disabled}
            />
          </Stack>
        </div>
      </Grid>
      <TextArea
        label="Descripción"
        disabled={disabled}
        placeholder="Ej. Pago de Predial correspondiente al año 2024"
        {...register("descripcion")}
      />
      <p className="text-[11px] text-gray-400 italic">
        Nota: El descuento adicional por pronto pago solo aplica en los meses de
        enero y febrero.
      </p>
    </CardCobro>
  );
}

// Componente para mostrar los datos del concepto seleccionado
function ItemConcepto({ label, value }) {
  const isNotSelected = value === "Concepto Seleccionado";
  return (
    <Stack size="xs">
      <label className="text-sm font-medium">{label}</label>
      <div className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3 py-2 outline-none bg-[#F9FAFB] border-[#E5E7EB] text-gray-800 focus:border-[var(--color-acento)] focus:ring-1 focus:ring-[var(--color-acento)]">
        <p
          className={`text-sm ${isNotSelected ? "text-gray-400" : "text-gray-800"}`}
        >
          {value}
        </p>
      </div>
    </Stack>
  );
}
