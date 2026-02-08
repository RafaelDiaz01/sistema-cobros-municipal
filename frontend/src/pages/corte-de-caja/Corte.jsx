import {
  Landmark,
  Clock,
  Calendar,
  DollarSign,
  HandCoins,
  Smartphone,
  AlertCircleIcon,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { getCorteActivoAPI } from "../../api/corteCaja.js";
import { getPagosPorCorteAPI } from "../../api/corteCaja.js";
import { corteColumns } from "./corte.columns.jsx";
import { cerrarCorteCajaAPI } from "../../api/corteCaja.js";
import { showToast } from "../../utils/alerts/toast.js";
import PageLayout from "../../components/layouts/PageLayout.jsx";
import Stack from "../../components/layouts/Stack.jsx";
import Grid from "../../components/modals/components/Grid.jsx";
import SectionSimpleTitle from "../../components/titles/SectionTitleSimple.jsx";
import InfoBadge from "./components/InfoBadge.jsx";
import StatsCards from "../../components/cards/StatsCards.jsx";
import Table from "../../components/table/Table.jsx";
import CajaCierreCard from "./components/CajaCierreCard.jsx";
import CajaInactivaOverlay from "../../components/overlays/CajaInactivaOverlay.jsx";

export default function Corte() {
  const [cortes, setCortes] = useState({});
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resetCierreCard, setResetCierreCard] = useState(false); // Para resetear CajaCierreCard

  const fechaActual = new Date().toLocaleDateString("es-MX");

  useEffect(() => {
    fetchCorteActivo();
  }, []);

  const stats = useMemo(() => {
    const totalPagos = Number(cortes.total_pagos) || 0;
    const totalEfectivo = Number(cortes.total_efectivo) || 0;
    const totalTransferencias = Number(cortes.total_transferencia) || 0;
    const finalEsperado = Number(cortes.saldo_final_esperado) || 0;

    return [
      {
        title: "Transacciones Totales",
        value: totalPagos,
        icon: <DollarSign size={26} />,
      },
      {
        title: "Total en Efectivo",
        value: `$${totalEfectivo.toFixed(2)}`,
        icon: <HandCoins size={26} />,
      },
      {
        title: "Total en Transferencias Bancarias",
        value: `$${totalTransferencias.toFixed(2)}`,
        icon: <Smartphone size={26} />,
      },
      {
        title: "Saldo Final Esperado",
        value: `$${finalEsperado.toFixed(2)}`,
        icon: <Clock size={26} />,
      },
    ];
  }, [cortes]);

  const fetchCorteActivo = async () => {
    try {
      const data = await getCorteActivoAPI();
      const payments = await getPagosPorCorteAPI(data.id_corte_caja);
      setCortes(data);
      setPagos(payments);
    } catch (error) {
      console.error("Error al cargar los datos del corte", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCerrarCaja = async (data) => {
    try {
      const userStr = localStorage.getItem("user");
      const user = userStr ? JSON.parse(userStr) : null;
      const id_usuario = user ? user.id : null;

      await cerrarCorteCajaAPI(
        cortes.id_corte_caja,
        id_usuario,
        Number(data.saldo_real),
        data.observaciones,
      );

      // Limpiar datos de la página
      setCortes([]);
      setPagos([]);
      setResetCierreCard(true); // Indicar a CajaCierreCard que limpie sus campos

      showToast("success", "Caja cerrada correctamente");
    } catch (error) {
      showToast("error", "Error al cerrar la caja");
      console.error("Error al cerrar la caja", error);
    }
  };

  return (
    <PageLayout>
      <Stack size="xl">
        <Grid cols={2} className="items-center">
          <SectionSimpleTitle text="Corte de Caja" />
          <Grid cols={4}>
            <InfoBadge
              icon={AlertCircleIcon}
              label={`Estado: ${cortes.estado === true ? "Activo" : "Inactivo"}`}
              status={cortes.estado}
            />

            <InfoBadge icon={Landmark} label="Caja: Principal" />

            <InfoBadge icon={Clock} label="Turno: Matutino" />

            <InfoBadge icon={Calendar} label={`Fecha: ${fechaActual}`} />
          </Grid>
        </Grid>
        <div className="relative">
          {(cortes.estado === false || cortes.estado === undefined) && (
            <CajaInactivaOverlay />
          )}
          <Stack size="lg">
            <StatsCards stats={stats} />
            <Table
              rows={pagos}
              loading={loading}
              columns={corteColumns()}
              getRowId={(row) => row.id_pago}
            />
            <CajaCierreCard
              totalEfectivo={cortes.total_efectivo}
              onCerrarCaja={handleCerrarCaja}
              reset={resetCierreCard}
              onResetDone={() => setResetCierreCard(false)}
              activo={cortes.estado}
            />
          </Stack>
        </div>
      </Stack>
    </PageLayout>
  );
}
