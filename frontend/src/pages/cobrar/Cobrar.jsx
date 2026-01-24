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
import TextArea from "../../components/modals/components/TextArea.jsx";
import InfoItem from "../../components/cobros/InfoItem.jsx";
import { User } from "lucide-react";
import { useState } from "react";
import Descuento from "../../components/cobros/Descuento.jsx";
import BuscarConceptoPago from "../../components/cobros/BuscarConceptoPago.jsx";
import { searchConceptoPagoAPI } from "../../api/conceptoPago.js";

export default function Cobrar() {
  const total = 1200;
  const [contribuyente, setContribuyente] = useState(null);

  const handleSelectConcepto = (concepto) => {
    setConceptoSeleccionado(concepto);
  };

  return (
    <PageLayout>
      <Stack size="xl">
        <SectionTitleSimple text="Procesar Cobros Municipales" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* IZQUIERDA */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <CardCobro title="Buscar Contribuyente">
              <BuscarContribuyente onSelect={setContribuyente} />
            </CardCobro>

            <CardCobro title="Detalles del Pago">
              <BuscarConceptoPago onSelect={handleSelectConcepto} searchFn={searchConceptoPagoAPI} />
              <Grid cols={2}>
                <Input
                  // {...register("nombre", { required: true })}
                  label="Monto a Pagar"
                  placeholder="Ej. 1,250.00"
                />
                <Input
                  // {...register("nombre", { required: true })}
                  label="Periodo de Pago"
                  placeholder="Ej. Predial 2024"
                />
              </Grid>
              <Descuento />
              <TextArea
                label="Descripción"
                placeholder="Ej. Pago de Predial correspondiente al año 2024"
              />
            </CardCobro>
          </div>

          {/* DERECHA */}
          <div className="flex flex-col gap-6">
            <CardCobro title="Contribuyente Seleccionado">
              <Grid cols={2}>
                <div>
                  <InfoItem
                    label="Nombre Completo"
                    value={
                      [
                        contribuyente?.nombre,
                        contribuyente?.apellido_paterno,
                        contribuyente?.apellido_materno,
                      ]
                        .filter(Boolean)
                        .join(" ") || "No seleccionado"
                    }
                  />
                </div>
                <div>
                  <InfoItem
                    label="RFC"
                    value={
                      [contribuyente?.rfc].filter(Boolean).join(" ") ||
                      "No seleccionado"
                    }
                  />
                </div>
                <div>
                  <InfoItem
                    label="Clave Catastral"
                    value={
                      [contribuyente?.id_contribuyente]
                        .filter(Boolean)
                        .join(" ") || "No seleccionado"
                    }
                  />
                </div>
                <div>
                  <InfoItem
                    label="Dirección"
                    value={
                      [contribuyente?.barrio].filter(Boolean).join(" ") ||
                      "No seleccionado"
                    }
                  />
                </div>
              </Grid>
            </CardCobro>

            {/* RESUMEN DEL RECIBO */}
            <ResumenRecibo />
          </div>
        </div>
      </Stack>
    </PageLayout>
  );
}
