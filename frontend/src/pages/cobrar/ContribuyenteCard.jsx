import CardCobro from "../../components/cards/CardCobro";
import Stack from "../../components/layouts/Stack.jsx";
import Grid from "../../components/modals/components/Grid.jsx";

export default function ContribuyenteCard({ contribuyente }) {
  return (
    <CardCobro title="Contribuyente Seleccionado">
      <Grid cols={3}>
        <div className="col-span-2">
          <ItemContribuyente
            label="Nombre"
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
            value={
              [contribuyente?.id_contribuyente].filter(Boolean).join(" ") ||
              "No Seleccionado"
            }
          />
        </div>
        <div className="col-span-2">
          <ItemContribuyente
            label="Dirección"
            value={
              [contribuyente?.barrio].filter(Boolean).join(" ") ||
              "No Seleccionado"
            }
          />
        </div>
        <div className="col-span-1">
          <ItemContribuyente
            label="RFC"
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
function ItemContribuyente({ label, value }) {
  return (
    <Stack size="xs">
      <p className="text-sm text-gray-500">{label}</p>
      <div className="border border-dashed border-gray-300 rounded-md p-3 bg-gray-50 flex items-center gap-2">
        <p className="text-sm font-semibold">{value}</p>
      </div>
    </Stack>
  );
}
