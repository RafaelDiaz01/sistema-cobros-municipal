import { useState, useEffect, useMemo, use } from "react";
import { FileText, Check, X, HandCoins } from "lucide-react";
import { getSubconceptosAPI } from "../../services/subconceptoService.js";
import { updateSubconceptoEstadoAPI, getEstadisticasSubconceptosAPI } from "../../services/subconceptoService.js";
import { showToast } from "../../utils/alerts/toast.js";
import { alertConfirmation } from "../../utils/alerts/alert.js";
import { subconceptosColumns } from "./subconceptos.columns.jsx";
import PageLayout from "../../components/layouts/PageLayout.jsx";
import Stack from "../../components/layouts/Stack.jsx";
import SectionTittle from "../../components/titles/SectionTitle.jsx";
import StatsCards from "../../components/cards/StatsCards.jsx";
import Table from "../../components/table/Table.jsx";
import AddSubconceptoModal from "../../components/features/subconceptos/AddSubconceptosModal.jsx";
import { set } from "react-hook-form";

export default function Subconceptos() {
  const [subconceptos, setSubconceptos] = useState([]);
  const [stats, setStats] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingTable, setLoadingTable] = useState(false);
  const [open, setOpen] = useState(false);
  const [subconceptosEdit, setSubconceptosEdit] = useState(null);
  const [totalRows, setTotalRows] = useState(0);

  const [paginationModel, setPaginationModel] =
    useState({
      page: 0,
      pageSize: 9,
    });

  useEffect(() => {
    cargarModuloInicial();
  }, []);

  useEffect(() => {
    fetchSubconceptos();
  }, [paginationModel]);

  const cargarModuloInicial = async () => {
    try {
      setLoadingPage(true);
      await Promise.all([
        fetchEstadisticas(),
        fetchSubconceptos(),
      ]);
    } catch (error) {
      showToast("error", "Error al cargar datos");
    } finally {
      setLoadingPage(false);
    }
  };

  const fetchEstadisticas = async () => {
    try {
      const data = await getEstadisticasSubconceptosAPI();
      setStats(data);
    } catch (error) {
      showToast("error", "Error al cargar estadísticas de subconceptos");
    }
  };

  const fetchSubconceptos = async (cargaInicial = false) => {
    try {
      if (!cargaInicial) setLoadingTable(true);
      const data = await getSubconceptosAPI({
        page: paginationModel.page + 1,
        pageSize: paginationModel.pageSize,
      });
      setSubconceptos(data.data);
      setTotalRows(data.total);
    } catch (error) {
      showToast("error", "Error al cargar subconceptos");
    } finally {
      if (!cargaInicial) setLoadingTable(false);
    }
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
      await fetchSubconceptos();
      await fetchEstadisticas();
      showToast("success", "Estado actualizado exitosamente");
    } catch (error) {
      showToast("error", "Error al cambiar el estado del subconcepto");
    }
  };

  // Abrir modal para crear
  const handleAdd = () => {
    setSubconceptosEdit(null);
    setOpen(true);
  };

  // Abrir modal para editar
  const handleEdit = (subconcepto) => {
    setSubconceptosEdit(subconcepto);
    setOpen(true);
  };

  const columns = useMemo(() => {
    return subconceptosColumns(handleEdit, handleDelete);
  }, []);

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
        <StatsCards stats={[
          {
            title: "Total Subconceptos",
            value: stats.total,
            icon: <FileText size={26} />,
          },
          {
            title: "Subconceptos Activos",
            value: stats.activos,
            icon: <Check size={26} />,
          },
          {
            title: "Subconceptos Inactivos",
            value: stats.inactivos,
            icon: <X size={26} />,
          },
          {
            title: "Son Cobrables",
            value: stats.cobrables,
            icon: <HandCoins size={26} />,
          },
        ]} />
        <Table
          rows={subconceptos}
          loading={loadingTable}
          columns={columns}
          getRowId={(row) => row.id_subconcepto}
          rowCount={totalRows}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        />
      </Stack>
    </PageLayout>
  );
}
