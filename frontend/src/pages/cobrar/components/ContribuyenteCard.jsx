import CardCobro from "../../../components/cards/CardCobro.jsx";
import Stack from "../../../components/layouts/Stack.jsx";
import Grid from "../../../components/modals/components/Grid.jsx";

export default function ContribuyenteCard({ contribuyente, disabled }) {
  return (
    <CardCobro title="Contribuyente Seleccionado">
      <Grid cols={3}>
        <div className="col-span-2">
          <ItemContribuyente
            label="Nombre"
            disabled={disabled}
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
        </div>
        <div className="col-span-1">
          <ItemContribuyente
            label="Clave Única"
            disabled={disabled}
            value={
              [contribuyente?.id_contribuyente].filter(Boolean).join(" ") ||
              "No Seleccionado"
            }
          />
        </div>
        <div className="col-span-2">
          <ItemContribuyente
            label="Dirección"
            disabled={disabled}
            value={
              [contribuyente?.barrio].filter(Boolean).join(" ") ||
              "No Seleccionado"
            }
          />
        </div>
        <div className="col-span-1">
          <ItemContribuyente
            label="RFC"
            disabled={disabled}
            value={
              [contribuyente?.rfc].filter(Boolean).join(" ") ||
              "No Seleccionado"
            }
          />
        </div>
      </Grid>
    </CardCobro>
  );
}

// Componente para mostrar los datos del contribuyente seleccionado
function ItemContribuyente({ label, value, disabled }) {
  const isNotSelected = value === "No Seleccionado";
  return (
    <Stack size="xs">
      <label className="text-sm font-medium">{label}</label>
      <div
        className={`w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3 py-2 outline-none ${
          disabled
            ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
            : "bg-[#F9FAFB] border-[#E5E7EB] text-gray-800 focus:border-[var(--color-acento)] focus:ring-1 focus:ring-[var(--color-acento)]"
        }`}
      >
        <p
          className={`text-sm ${isNotSelected ? "text-gray-400" : "text-gray-800"}`}
        >
          {value}
        </p>
      </div>
    </Stack>
  );
}
