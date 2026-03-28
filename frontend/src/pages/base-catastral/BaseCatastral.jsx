import { useState, useEffect, useMemo } from "react";
import { getBasesCatastralesAPI, updateBaseCatastralAPI, updateBaseCatastralEstadoAPI } from "../../services/baseCatastralService.js";
import { Home, Check, X, DollarSign } from "lucide-react";
import { alertConfirmation } from "../../utils/alerts/alert.js";
import { showToast } from "../../utils/alerts/toast.js";
import { basesCatastralesColumns } from "./bases.columns.jsx";
import PageLayout from "../../components/layouts/PageLayout.jsx";
import Stack from "../../components/layouts/Stack.jsx";
import SectionTittle from "../../components/titles/SectionTitle.jsx";
import StatsCards from "../../components/cards/StatsCards.jsx";
import Table from "../../components/table/Table.jsx";
import AddBaseCatastralModal from "../../components/features/base-catastral/AddBaseCatastralModal.jsx";

export default function BaseCatastral() {
  const [basesCatastrales, setBasesCatastrales] = useState([]);
  const [open, setOpen] = useState(false);
  const [basesCatastralesEdit, setBasesCatastralesEdit] = useState(null);

  useEffect(() => {
    fetchBases();
  }, []);

  const fetchBases = async () => {
    try {
      const data = await getBasesCatastralesAPI();
      setBasesCatastrales(data);
    } catch (error) {
      console.error("Error fetching bases catastrales:", error);
    }
  }

  const stats = useMemo(() => {
    return [
      {
        title: "Total de Bases Catastrales",
        value: basesCatastrales.length,
        icon: <Home size={26} />
      },
      {
        title: "Bases Catastrales Activas",
        value: basesCatastrales.filter((b) => b.activo).length,
        icon: <Check size={26} />
      },
      {
        title: "Bases Catastrales Inactivas",
        value: basesCatastrales.filter((b) => !b.activo).length,
        icon: <X size={26} />
      },
      {
        title: "Con Valor Superior a $500,000",
        value: basesCatastrales.filter((b) => b.valor > 500000).length,
        icon: <DollarSign size={26} />
      }
    ];
  }, [basesCatastrales]);

  const handleAdd = () => {
    setBasesCatastralesEdit(null);
    setOpen(true);
  };

  const handleDelete = async (id, estadoActual) => {
    const nuevoEstado = !estadoActual;
    const mensaje = nuevoEstado
      ? "¿Desea activar esta base catastral?"
      : "¿Desea inactivar esta base catastral?";

    const confirmacion = await alertConfirmation("Atención", mensaje, "warning");

    if (!confirmacion) return;

    try {
      await updateBaseCatastralEstadoAPI(id, { estado: nuevoEstado });
      fetchBases();
      showToast("success", "Estado actualizado exitosamente");
    } catch (error) {
      console.error("Error actualizando estado de base catastral:", error);
      showToast("error", "Error al cambiar el estado de la base catastral");
    }
  };

  const handleEdit = (base) => {
    setBasesCatastralesEdit(base);
    setOpen(true);
  };

  return (
    <PageLayout>
      <Stack>
        <SectionTittle
          text="Gestión de Base Catastral"
          onAdd={handleAdd}
          textButton="Agregar Base Catastral"
        />
        {open && (
          <AddBaseCatastralModal
            isOpen={open}
            onClose={() => setOpen(false)}
            onSuccess={fetchBases}
            baseCatastral={basesCatastralesEdit}
          />
        )}
        <StatsCards stats={stats} />
        <Table
          rows={basesCatastrales}
          columns={basesCatastralesColumns(handleEdit, handleDelete)}
          getRowId={(row) => row.id_base_catastral}
        />
      </Stack>
    </PageLayout>
  );
}
