import { useEffect, useMemo, useState } from "react";
import { FileText, Check, X, Percent } from "lucide-react";
import { getEstimulosAPI } from "../../api/estimulosFiscales.js";
import { estimulosColumns } from "./estimulos.columns.jsx";
import { updateStatusEstimuloAPI } from "../../api/estimulosFiscales.js";
import { alertConfirmation } from "../../utils/alerts/alert.js";
import { showToast } from "../../utils/alerts/toast.js";
import PageLayout from "../../components/layouts/PageLayout";
import Stack from "../../components/layouts/Stack";
import SectionTitle from "../../components/titles/SectionTitle.jsx";
import StatsCards from "../../components/cards/StatsCards.jsx";
import Table from "../../components/table/Table.jsx";

export default function GestionEstimulos() {
  const [estimulos, setEstimulos] = useState([]);
  const [open, setOpen] = useState(false);
  const [estimuloEdit, setEstimuloEdit] = useState(null);

  useEffect(() => {
    fetchEstimulos();
  }, []);

  const fetchEstimulos = async () => {
    try {
      const data = await getEstimulosAPI();
      setEstimulos(data);
    } catch (error) {
      console.error("Error al cargar estímulos", error);
    }
  };

  const stats = useMemo(() => {
    const activos = estimulos.filter((e) => e.activo).length;
    const inactivos = estimulos.length - activos;
    const descuentoTotal = estimulos.filter(
      (e) => Number(e.porcentaje_descuento) === 100,
    ).length;
    return [
      {
        title: "Total de Estímulos",
        value: estimulos.length,
        icon: <FileText size={26} />,
      },
      {
        title: "Estímulos Activos",
        value: activos,
        icon: <Check size={26} />,
      },
      {
        title: "Estímulos Inactivos",
        value: inactivos,
        icon: <X size={26} />,
      },
      {
        title: "Con 100% de Descuento",
        value: descuentoTotal,
        icon: <Percent size={26} />,
      },
    ];
  }, [estimulos]);

  // Eliminar un estimulo
  const handleDelete = async (id, estadoActual) => {
    const nuevoEstado = !estadoActual;
    const mensaje = nuevoEstado
      ? "¿Estás seguro de activar este estímulo fiscal?"
      : "¿Estás seguro de desactivar este estímulo fiscal?";

    const confirmacion = await alertConfirmation(
      "Atención",
      mensaje,
      "warning",
    );
    if (!confirmacion) return;

    try {
      await updateStatusEstimuloAPI(id, nuevoEstado);
      fetchEstimulos();
      showToast("success", "Estado del estímulo actualizado");
    } catch (error) {
      console.error("Error al actualizar el estado del estímulo", error);
    }
  };

  // Abrir modal para editar
  const handleEdit = (estimulo) => {
    setEstimuloEdit(estimulo);
    setOpen(true);
  };

  return (
    <PageLayout>
      <Stack size="xl">
        <SectionTitle
          text="Gestión de Estímulos"
          textButton="Agregar Estímulo"
        />
        <StatsCards stats={stats} />
        <Table
          rows={estimulos}
          columns={estimulosColumns(handleEdit, handleDelete)}
          getRowId={(row) => row.id_estimulo}
        />
      </Stack>
    </PageLayout>
  );
}
