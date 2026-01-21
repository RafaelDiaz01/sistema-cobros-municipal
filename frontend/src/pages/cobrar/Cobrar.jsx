import { useForm } from "react-hook-form";
import PageLayout from "../../components/layouts/PageLayout";
import Stack from "../../components/layouts/Stack";
import SectionTitleSimple from "../../components/titles/SectionTitleSimple";
import CardCobro from "../../components/cards/CardCobro";
import Grid from "../../components/modals/components/Grid";
import BuscarContribuyente from "./BuscarContribuyente";
import ContribuyenteCard from "./ContribuyenteCard";
import ResumenRecibo from "./ResumenRecibo";
import Input from "../../components/modals/components/Input.jsx";
import Select from "../../components/modals/components/Select.jsx";

export default function Cobrar() {
  const total = 1200;

  return (
    <PageLayout>
      <Stack gap="gap-10">
        <SectionTitleSimple text="Procesar Cobros Municipales" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* IZQUIERDA */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <CardCobro title="Buscar Contribuyente">
              <BuscarContribuyente />
            </CardCobro>

            <CardCobro title="Detalles del Pago">
                <Select
                    label="Concepto de Pago"
                    options={[
                      "Predial",
                      "Estacionamiento",
                      "Conexión",
                      "Multas",
                    ]}
                    // {...register("barrio", { required: true })}
                  />
              <Grid cols={3}>
                <Input
                  // {...register("nombre", { required: true })}
                  label="Concepto de Pago"
                  placeholder="Ej. Predial 2024"
                />
                <Input
                  // {...register("nombre", { required: true })}
                  label="Monto a Pagar"
                  placeholder="Ej. 1,250.00"
                />
              </Grid>
            </CardCobro>
          </div>

          {/* DERECHA */}
          <div className="flex flex-col gap-6">
            <ContribuyenteCard />
            <ResumenRecibo total={total.toFixed(2)} />
          </div>
        </div>
      </Stack>
    </PageLayout>
  );
}
