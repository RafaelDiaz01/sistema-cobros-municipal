import { useState } from "react";
import { useForm } from "react-hook-form";
import { searchConceptoPagoAPI } from "../../api/conceptoPago.js";
import PageLayout from "../../components/layouts/PageLayout";
import Stack from "../../components/layouts/Stack";
import SectionTitleSimple from "../../components/titles/SectionTitleSimple";
import CardCobro from "../../components/cards/CardCobro";
import BuscarContribuyente from "./BuscarContribuyente";
import ResumenRecibo from "./ResumenRecibo";
import ContribuyenteCard from "./ContribuyenteCard.jsx";
import DetallesPago from "./components/DetallesPago.jsx";

export default function Cobrar() {
  const [contribuyente, setContribuyente] = useState(null);
  const [conceptoSeleccionado, setConceptoSeleccionado] = useState(null);

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CardCobro title="Buscar Contribuyente">
                <BuscarContribuyente onSelect={setContribuyente} />
              </CardCobro>
              <ContribuyenteCard contribuyente={contribuyente} />
            </div>

            <DetallesPago
              onSelectConcepto={handleSelectConcepto}
              searchConceptoPagoAPI={searchConceptoPagoAPI}
            />
          </div>

          {/* DERECHA */}
          <div className="flex flex-col gap-6">
            <ResumenRecibo concepto={conceptoSeleccionado} contribuyente={contribuyente} />
          </div>
        </div>
      </Stack>
    </PageLayout>
  );
}
