import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { showToast } from "../../utils/alerts/toast.js";
import { alertConfirmation } from "../../utils/alerts/alert.js";
import { searchContribuyentes } from "../../services/contribuyentesService.jsx";
import { searchConceptoPagoAPI } from "../../api/conceptoPago.js";
import { searchEstimuloFiscalAPI } from "../../api/estimulosFiscales.js";
import { getCorteActivoAPI } from "../../api/corteCaja.js";
import { iniciarCorteCajaAPI } from "../../api/corteCaja.js";
import PageLayout from "../../components/layouts/PageLayout";
import Stack from "../../components/layouts/Stack";
import SectionTitleCobrar from "./components/SectionTitleCobrar.jsx";
import CajaInactivaOverlay from "../../components/overlays/CajaInactivaOverlay.jsx";
import CardCobro from "../../components/cards/CardCobro";
import AsyncAutocomplete from "../../components/ui/AsyncAutocomplete.jsx";
import ResumenRecibo from "./components/ResumenRecibo.jsx";
import ContribuyenteCard from "./components/ContribuyenteCard.jsx";
import DetallesPago from "./components/DetallesPago.jsx";

export default function Cobrar() {
  const [contribuyente, setContribuyente] = useState(null);
  const [contribuyenteInput, setContribuyenteInput] = useState("");
  const [conceptoSeleccionado, setConceptoSeleccionado] = useState(null);
  const [conceptoInput, setConceptoInput] = useState("");
  const [estimuloSeleccionado, setEstimuloSeleccionado] = useState(null);
  const [estimuloInput, setEstimuloInput] = useState("");
  const [corteActivo, setCorteActivo] = useState(null);

  // React Hook Form
  const form = useForm({
    defaultValues: {
      id_contribuyente: "",
      tipo_referencia: "",
      concepto_pago: "",
      monto: "",
      periodo: "",
      periodos_pagados: "",
      porcentaje_descuento: "",
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
        const data = await getCorteActivoAPI();
        setCorteActivo(data);
      } catch (error) {
        if (error?.response?.status === 404) {
          handleIniciarTurno();
        } else {
          console.error("Error al cargar los datos del corte activo", error);
        }
      }
    };

    loadCorte();
  }, []);

  const handleSelectConcepto = (concepto) => {
    setConceptoSeleccionado(concepto);
    form.setValue("tipo_referencia", concepto?.tipo);
    form.setValue("concepto_pago", concepto?.nombre);
    form.setValue("monto", concepto?.monto_base);
  };

  const handleSelectEstimulo = (estimulo) => {
    setEstimuloSeleccionado(estimulo);
    form.setValue("porcentaje_descuento", estimulo?.porcentaje_descuento);
  };

  const handleIniciarTurno = async () => {
    try {
      const montoInicial = await alertConfirmation(
        "Corte de Caja Inactivo",
        "¿Deseas iniciar un nuevo corte de caja?",
        "warning",
        "Iniciar",
        "Cancelar",
        true,
      );

      if (montoInicial) {
        const corte = await iniciarCorteCajaAPI(montoInicial);
        setCorteActivo(corte);
        showToast("success", "Caja Iniciada");
      }
    } catch (error) {
      showToast("error", "Error al iniciar el corte de caja");
      console.error("Error al iniciar el corte de caja", error);
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
        <div className="relative">
          {/* OVERLAY PARA INDICAR QUE NO HAY CAJA ACTIVA */}
          {!corteActivo && <CajaInactivaOverlay />}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* IZQUIERDA */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CardCobro title="Buscar Contribuyente">
                  <AsyncAutocomplete
                    value={contribuyente}
                    inputValue={contribuyenteInput}
                    onSelect={setContribuyente}
                    onInputChange={setContribuyenteInput}
                    searchFn={searchContribuyentes}
                    getOptionLabel={(option) =>
                      `${option.nombre} ${option.apellido_paterno} ${option.apellido_materno}`
                    }
                    renderOption={(props, option) => (
                      <li {...props} key={option.id_contribuyente}>
                        {option.nombre} {option.apellido_paterno}{" "}
                        {option.apellido_materno}
                      </li>
                    )}
                    placeholder="Ej. Rafael Díaz López"
                    disabled={!corteActivo}
                  />
                  <Nota />
                </CardCobro>
                <ContribuyenteCard contribuyente={contribuyente} />
              </div>

              <DetallesPago
                conceptoSeleccionado={conceptoSeleccionado}
                conceptoInput={conceptoInput}
                setConceptoInput={setConceptoInput}
                estimuloSeleccionado={estimuloSeleccionado}
                estimuloInput={estimuloInput}
                setEstimuloInput={setEstimuloInput}
                onSelectConcepto={handleSelectConcepto}
                onSelectEstimulo={handleSelectEstimulo}
                searchConceptoPagoAPI={searchConceptoPagoAPI}
                searchEstimuloFiscalAPI={searchEstimuloFiscalAPI}
                form={form}
                disabled={!corteActivo}
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
                  setContribuyenteInput("");
                  setConceptoSeleccionado(null);
                  setConceptoInput("");
                  setEstimuloSeleccionado(null);
                  setEstimuloInput("");
                  form.reset();
                }}
                disabled={!corteActivo}
              />
            </div>
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
