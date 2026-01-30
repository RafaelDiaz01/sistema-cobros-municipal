import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { showToast } from "../../utils/alerts/toast.js";
import { searchConceptoPagoAPI } from "../../api/conceptoPago.js";
import { searchEstimuloFiscalAPI } from "../../api/estimulosFiscales.js";
import { getCorteActivoAPI } from "../../api/corteCaja.js";
import { iniciarCorteCajaAPI } from "../../api/corteCaja.js";
import PageLayout from "../../components/layouts/PageLayout";
import Stack from "../../components/layouts/Stack";
import SectionTitleCobrar from "./components/SectionTitleCobrar.jsx";
import CardCobro from "../../components/cards/CardCobro";
import BuscarContribuyente from "./components/BuscarContribuyente.jsx";
import ResumenRecibo from "./components/ResumenRecibo.jsx";
import ContribuyenteCard from "./components/ContribuyenteCard.jsx";
import DetallesPago from "./components/DetallesPago.jsx";

export default function Cobrar() {
  const [contribuyente, setContribuyente] = useState(null);
  const [conceptoSeleccionado, setConceptoSeleccionado] = useState(null);
  const [estimuloSeleccionado, setEstimuloSeleccionado] = useState(null);
  const [corteActivo, setCorteActivo] = useState(null);

  // React Hook Form
  const form = useForm({
    defaultValues: {
      id_contribuyente: "",
      tipo_referencia: "",
      concepto_pago: "",
      monto: "",
      periodo: "",
      descuento: "",
      metodo_pago: "",
      descripcion: "",
    },
  });

  useEffect(() => {
    if (contribuyente?.id_contribuyente) {
      form.setValue("id_contribuyente", contribuyente.id_contribuyente);
    }
  }, [contribuyente, form]);

  useEffect(() => {
    const loadCorte = async () => {
      try {
        const userStr = localStorage.getItem("user");
        const user = userStr ? JSON.parse(userStr) : null;
        const id_usuario = user ? user.id : null;
        const data = await getCorteActivoAPI(id_usuario);
        setCorteActivo(data);
      } catch (error) {
        console.error("Error al cargar los datos del corte activo", error);
      }
    };

    loadCorte();
  }, []);

  const handleSelectConcepto = (concepto) => {
    setConceptoSeleccionado(concepto);
    form.setValue("tipo_referencia", concepto?.tipo);
    form.setValue("concepto_pago", concepto?.nombre);
    form.setValue("monto", concepto?.monto_base);
    form.setValue("descuento", concepto?.porcentaje_descuento || "");
  };

  const handleSelectEstimulo = (estimulo) => {
    setEstimuloSeleccionado(estimulo);
  };

  const handleIniciarTurno = async () => {
    try {
      const userStr = localStorage.getItem("user");
      const user = userStr ? JSON.parse(userStr) : null;
      const id_usuario = user ? user.id : null;
      const corte = await iniciarCorteCajaAPI(id_usuario, 0);
      setCorteActivo(corte);

      showToast("success", "Caja Iniciada");
    } catch (error) {
      alert("Error al iniciar turno");
    }
  };

  return (
    <PageLayout>
      <Stack size="xl">
        <SectionTitleCobrar
          text="Procesar Cobros Municipales"
          corteActivo={corteActivo}
          onAdd={handleIniciarTurno}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* IZQUIERDA */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CardCobro title="Buscar Contribuyente">
                <BuscarContribuyente onSelect={setContribuyente} />
                <Nota />
              </CardCobro>
              <ContribuyenteCard contribuyente={contribuyente} />
            </div>

            <DetallesPago
              onSelectConcepto={handleSelectConcepto}
              onSelectEstimulo={handleSelectEstimulo}
              searchConceptoPagoAPI={searchConceptoPagoAPI}
              searchEstimuloFiscalAPI={searchEstimuloFiscalAPI}
              form={form}
            />
          </div>

          {/* DERECHA */}
          <div className="flex flex-col gap-6">
            <ResumenRecibo
              concepto={conceptoSeleccionado}
              estimulo={estimuloSeleccionado}
              contribuyente={contribuyente}
              form={form}
              onClear={() => {
                setContribuyente(null);
                setConceptoSeleccionado(null);
                setEstimuloSeleccionado(null);
                form.reset();
              }}
            />
          </div>
        </div>
      </Stack>
    </PageLayout>
  );
}

// Componente para mostrar una nota en buscar contribuyente
function Nota() {
  return (
    <div className="bg-[var(--color-terciario)] p-4 rounded-lg border border-[var(--color-borde)]">
      <p className="text-sm text-gray-400 italic">
        Nota: Si el contribuyente no está registrado, favor de registrarlo en el
        módulo de Contribuyentes.
      </p>
    </div>
  );
}
