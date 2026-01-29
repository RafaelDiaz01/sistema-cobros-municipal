import {
  Landmark,
  Clock,
  Calendar,
  DollarSign,
  HandCoins,
  Smartphone,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { getCorteActivoAPI } from "../../api/corteCaja.js";
import { getPagosPorCorteAPI } from "../../api/corteCaja.js";
import { corteColumns } from "./corte.columns.jsx";
import PageLayout from "../../components/layouts/PageLayout.jsx";
import Stack from "../../components/layouts/Stack.jsx";
import Grid from "../../components/modals/components/Grid.jsx";
import SectionSimpleTitle from "../../components/titles/SectionTitleSimple.jsx";
import InfoBadge from "./components/InfoBadge.jsx";
import StatsCards from "../../components/cards/StatsCards.jsx";
import Table from "../../components/table/Table.jsx";

export default function Corte() {
  const [cortes, setCortes] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCorteActivo();
  }, []);

  const stats = useMemo(() => {
    const totalPagos = Number(cortes.total_pagos) || 0;
    const totalEfectivo = Number(cortes.total_efectivo) || 0;
    const totalTransferencias = Number(cortes.total_transferencias) || 0;
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
      const userStr = localStorage.getItem("user");
      const user = userStr ? JSON.parse(userStr) : null;
      const id_usuario = user ? user.id : null;
      const data = await getCorteActivoAPI(id_usuario);
      const payments = await getPagosPorCorteAPI(data.id_corte_caja);
      setCortes(data);
      setPagos(payments);
    } catch (error) {
      console.error("Error al cargar los datos del corte", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <Stack size="xl">
        <Grid cols={2} className="items-center">
          <SectionSimpleTitle text="Corte de Caja" />
          <Grid cols={4}>
            <InfoBadge
              label={`Estado: ${cortes.estado === true ? "Activo" : "Inactivo"}`}
              status={cortes.estado}
            />

            <InfoBadge icon={Landmark} label="Caja: Principal" />

            <InfoBadge icon={Clock} label="Turno: Matutino" />

            <InfoBadge icon={Calendar} label="27/01/2026" />
          </Grid>
        </Grid>
        <StatsCards stats={stats} />
        <Table
          rows={pagos}
          loading={loading}
          columns={corteColumns()}
          getRowId={(row) => row.id_pago}
        />
      </Stack>
    </PageLayout>
  );
}
