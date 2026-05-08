import { useState, useEffect, useMemo } from "react";
import { FileText, Check, X, HandCoins } from "lucide-react";
import { getSubconceptosAPI } from "../../services/subconceptoService.js";
import { updateSubconceptoEstadoAPI } from "../../services/subconceptoService.js";
import { showToast } from "../../utils/alerts/toast.js";
import { alertConfirmation } from "../../utils/alerts/alert.js";
import { subconceptosColumns } from "./subconceptos.columns.jsx";
import PageLayout from "../../components/layouts/PageLayout.jsx";
import Stack from "../../components/layouts/Stack.jsx";
import SectionTittle from "../../components/titles/SectionTitle.jsx";
import StatsCards from "../../components/cards/StatsCards.jsx";
import Table from "../../components/table/Table.jsx";
import AddSubconceptoModal from "../../components/features/subconceptos/AddSubconceptosModal.jsx";

export default function Subconceptos() {
  const [subconceptos, setSubconceptos] = useState([]);
  const [open, setOpen] = useState(false);
  const [subconceptosEdit, setSubconceptosEdit] = useState(null);

  useEffect(() => {
    fetchSubconceptos();
  }, []);

  const fetchSubconceptos = async () => {
    try {
      const data = await getSubconceptosAPI();
      setSubconceptos(data);
    } catch (error) {
      console.error("Error fetching subconceptos:", error);
    }
  };

  const stats = useMemo(() => {
    return [
      {
        title: "Total Subconceptos",
        value: subconceptos.length,
        icon: <FileText size={26} />,
      },
      {
        title: "Subconceptos Activos",
        value: subconceptos.filter((s) => s.activo).length,
        icon: <Check size={26} />,
      },
      {
        title: "Subconceptos Inactivos",
        value: subconceptos.filter((s) => !s.activo).length,
        icon: <X size={26} />,
      },
      {
        title: "Son Cobrables",
        value: subconceptos.filter((s) => s.es_cobrable).length,
        icon: <HandCoins size={26} />,
      },
    ];
  }, [subconceptos]);

  // Abrir modal para crear
  const handleAdd = () => {
    setSubconceptosEdit(null);
    setOpen(true);
  };

  const handleDelete = async (id, estadoActual) => {
    const nuevoEstado = !estadoActual;
    const mensaje = nuevoEstado
      ? "¿Deseas activar este subconcepto?"
      : "¿Deseas desactivar este subconcepto?";

    const confirmacion = await alertConfirmation(
      "Atención",
      mensaje,
      "warning",
    );
    if (!confirmacion) return;

    try {
      await updateSubconceptoEstadoAPI(id, { estado: nuevoEstado });
      fetchSubconceptos();
      showToast("success", "Estado actualizado exitosamente");
    } catch (error) {
      console.error("Error al cambiar el estado subconcepto", error);
      showToast("error", "Error al cambiar el estado del subconcepto");
    }
  };

  const handleEdit = (subconcepto) => {
    setSubconceptosEdit(subconcepto);
    setOpen(true);
  };

  return (
    <PageLayout>
      <Stack size="xl">
        <SectionTittle
          text="Gestión de Subconceptos"
          onAdd={handleAdd}
          textButton="Agregar Subconcepto"
        />
        {open && (
          <AddSubconceptoModal
            isOpen={open}
            onClose={() => setOpen(false)}
            subconcepto={subconceptosEdit}
            onSuccess={fetchSubconceptos}
          />
        )}
        <StatsCards stats={stats} />
        <Table
          rows={subconceptos}
          columns={subconceptosColumns(handleEdit, handleDelete)}
          getRowId={(row) => row.id_subconcepto}
        />
      </Stack>
    </PageLayout>
  );
}
