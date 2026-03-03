import { useEffect, useState, useMemo } from "react";
import { Check, HandCoins, X, ReceiptText, SmartphoneNfc } from "lucide-react";
import { getRecibosAPI } from "../../services/reciboService.js";
import { cancelarReciboAPI } from "../../services/reciboService.js";
import { descargarReciboPDF } from "../../services/pagoService.js";
import { downloadBlob } from "../../utils/downloadFile.js";
import { recibosColumns } from "./recibos.columns.jsx";
import { showToast } from "../../utils/alerts/toast.js";
import { alertConfirmation } from "../../utils/alerts/alert.js";
import PageLayout from "../../components/layouts/PageLayout";
import Stack from "../../components/layouts/Stack";
import SectionTitleSimple from "../../components/titles/SectionTitleSimple.jsx";
import StatsCards from "../../components/cards/StatsCards.jsx";
import Table from "../../components/table/Table.jsx";

export default function GestionRecibos() {
  const [recibos, setRecibos] = useState([]);

  useEffect(() => {
    fetchRecibos();
  }, []);

  const fetchRecibos = async () => {
    try {
      const data = await getRecibosAPI();
      setRecibos(data);
    } catch (error) {
      console.error("Error al cargar recibos", error);
    }
  };

  const stats = useMemo(() => {
    return [
      {
        title: "Total de Recibos",
        value: recibos.length,
        icon: <ReceiptText />,
      },
      {
        title: "Recibos Emitidos",
        value: recibos.filter(r => r.estado === "EMITIDO").length,
        icon: <Check />,
      },
      {
        title: "Recibos Cancelados",
        value: recibos.filter(r => r.estado === "CANCELADO").length,
        icon: <X />,
      },
      {
        title: "Pagados con Efectivo",
        value: recibos.filter(r => r.pago.metodo_pago === "Efectivo").length,
        icon: <HandCoins />,
      },
      {
        title: "Pagados con Transferencia",
        value: recibos.filter(r => r.pago.metodo_pago === "Transferencia Bancaria").length,
        icon: <SmartphoneNfc />,
      }
    ];
  }, [recibos]);

  const handleEdit = async (recibo) => {
    try {
      const pdfblob = await descargarReciboPDF(recibo.id_pago);
      downloadBlob(pdfblob, `${recibo.folio}.pdf`);
      showToast("success", "Recibo descargado exitosamente");
    } catch (error) {
      console.error("Error al descargar recibo", error);
      showToast("error", "Error al descargar recibo");
    }
  };

  const handleDelete = async (id) => {
    let motivo = "cancelar";
    const confirmacion = await alertConfirmation(
      "Atención",
      "El recibo será cancelado. ¿Desea continuar?",
      "warning");
    if (!confirmacion) return;
    try {
      await cancelarReciboAPI(id, motivo);
      fetchRecibos();
      showToast("success", "Recibo cancelado exitosamente");
    } catch (error) {
      console.error("Error al cancelar recibo", error);
      showToast("error", "Error al cancelar recibo");
    }
  };

  return (
    <PageLayout>
      <Stack size="xl">
        <SectionTitleSimple text="Gestión de Recibos" />
        <StatsCards stats={stats} columns={5}/>
        <Table rows={recibos} columns={recibosColumns(handleEdit, handleDelete)} getRowId={(row) => row.id_recibo} />
      </Stack>
    </PageLayout>
  );
}
