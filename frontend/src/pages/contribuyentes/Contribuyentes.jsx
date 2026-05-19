import { useEffect, useState, useMemo } from "react";
import { Users, UserCheck, UserX, IdCard } from "lucide-react";
import { getEstadisticasContribuyentes, getContribuyentes, updateStatusContribuyente } from "../../services/contribuyentesService.js";
import { showToast } from "../../utils/alerts/toast.js";
import { alertConfirmation } from "../../utils/alerts/alert.js";
import { contribuyentesColumns } from "./contribuyetes.columns.jsx";
import PageLayout from "../../components/layouts/PageLayout.jsx";
import Stack from "../../components/layouts/Stack.jsx";
import SectionTitle from "../../components/titles/SectionTitle.jsx";
import AddContribuyenteModal from "../../components/features/contribuyentes/AddContribuyenteModal.jsx";
import StatsCards from "../../components/cards/StatsCards.jsx";
import Table from "../../components/table/Table.jsx";
import ModuleSkeleton from "../../components/ui/ModuleSkeleton.jsx";

const Contribuyentes = () => {
  const [contribuyentes, setContribuyentes] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [contribuyenteEdit, setContribuyenteEdit] = useState(null);
  const [totalRows, setTotalRows] = useState(0);

  const [paginationModel, setPaginationModel] =
    useState({
      page: 0,
      pageSize: 10,
    });

  useEffect(() => {
    cargarDatos();
  }, [paginationModel]);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchEstadisticas(),
        fetchContribuyentes(),
      ]);
    } catch (error) {
      showToast("error", "Error al cargar datos");
    } finally {
      setLoading(false);
    }
  };

  const fetchEstadisticas = async () => {
    try {
      const data = await getEstadisticasContribuyentes();
      setStats(data);
    } catch (error) {
      showToast("error", "Error al cargar estadísticas de contribuyentes");
    }
  };

  const fetchContribuyentes = async () => {
    try {
      const data = await getContribuyentes({
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
      });
      setContribuyentes(data.data);
      setTotalRows(data.total);
    } catch (error) {
      showToast("error", "Error al cargar contribuyentes");
    }
  };

  const handleDelete = async (id, estadoActual) => {
    const nuevoEstado = !estadoActual;
    const mensaje = nuevoEstado
      ? "¿Deseas activar este contribuyente?"
      : "¿Deseas desactivar este contribuyente?";

    const confirmacion = await alertConfirmation(
      "Atención",
      mensaje,
      "warning",
    );
    if (!confirmacion) return;

    try {
      await updateStatusContribuyente(id, { estado: nuevoEstado });
      await fetchContribuyentes();
      await fetchEstadisticas();
      showToast("success", "Estado actualizado exitosamente");
    } catch (error) {
      showToast("error", "Error al cambiar el estado del contribuyente");
    }
  };

  // Abrir modal para crear
  const handleAdd = () => {
    setContribuyenteEdit(null);
    setOpen(true);
  };

  // Abrir modal para editar
  const handleEdit = (contribuyente) => {
    setContribuyenteEdit(contribuyente);
    setOpen(true);
  };

  return (
    <PageLayout>
      <Stack size="xl">
        {loading ? (
          <ModuleSkeleton tableRows={9} tableColumns={8} statsCards={4} />
        ) : (
          <>
            {/* TÍTULO DEL MÓDULO */}
            <SectionTitle
              text="Gestión de Contribuyentes"
              onAdd={handleAdd}
              textButton="Agregar Contribuyente"
            />
            {/* MODAL PARA AGREGAR CONTRIBUYENTE */}
            {open && (
              <AddContribuyenteModal
                isOpen={open}
                onClose={() => setOpen(false)}
                contribuyente={contribuyenteEdit}
                onSuccess={async () => {
                  await fetchContribuyentes();
                  await fetchEstadisticas();
                }}
              />
            )}
            {/* ESTADISTÍCAS DEL MÓDULO */}
            <StatsCards stats={[
              {
                title: "Total de Contribuyentes",
                value: stats.total,
                icon: <Users size={26} />,
              },
              {
                title: "Contribuyentes Activos",
                value: stats.activos,
                icon: <UserCheck size={26} />,
              },
              {
                title: "Contribuyentes Inactivos",
                value: stats.inactivos,
                icon: <UserX size={26} />,
              },
              {
                title: "Contribuyentes con RFC",
                value: stats.con_rfc,
                icon: <IdCard size={26} />,
              },
            ]} />

            <Table
              rows={contribuyentes}
              loading={loading}
              columns={contribuyentesColumns(handleEdit, handleDelete)}
              getRowId={(row) => row.id_contribuyente}
              rowCount={totalRows}
              paginationModel={paginationModel}
              onPaginationModelChange={
                setPaginationModel
              }
            />
          </>)}
      </Stack>
    </PageLayout>
  );
};

export default Contribuyentes;
