import { useEffect, useState, useMemo, useCallback } from "react";
import { Users, UserCheck, UserX, IdCard } from "lucide-react";
import { getEstadisticasContribuyentes, getContribuyentes, updateStatusContribuyente } from "../../services/contribuyentesService.js";
import { showToast } from "../../utils/alerts/toast.js";
import { alertConfirmation } from "../../utils/alerts/alert.js";
import { contribuyentesColumns } from "./contribuyetes.columns.jsx";
import { useDebounce } from "../../hooks/useDebounce.js";
import PageLayout from "../../components/layouts/PageLayout.jsx";
import Stack from "../../components/layouts/Stack.jsx";
import SectionTitle from "../../components/titles/SectionTitle.jsx";
import AddContribuyenteModal from "../../components/features/contribuyentes/AddContribuyenteModal.jsx";
import SearchBar from "../../components/SearchBar.jsx";
import StatsCards from "../../components/cards/StatsCards.jsx";
import Table from "../../components/table/Table.jsx";
import ModuleSkeleton from "../../components/ui/ModuleSkeleton.jsx";

const Contribuyentes = () => {
  const [contribuyentes, setContribuyentes] = useState([]);
  const [stats, setStats] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingTable, setLoadingTable] = useState(false);
  const [open, setOpen] = useState(false);
  const [contribuyenteEdit, setContribuyenteEdit] = useState(null);
  const [totalRows, setTotalRows] = useState(0);
  const [search, setSearch] = useState("");
  const [activo, setActivo] = useState("");
  const [sortModel, setSortModel] = useState([
    {
      field: "id_contribuyente",
      sort: "desc",
    },
  ]);

  const debouncedSearch = useDebounce(search, 500);

  const [paginationModel, setPaginationModel] =
    useState({
      page: 0,
      pageSize: 7,
    });

  useEffect(() => {
    cargarModuloInicial();
  }, []);

  useEffect(() => {
    fetchContribuyentes();
  }, [paginationModel, debouncedSearch, activo, sortModel]);

  const cargarModuloInicial = async () => {
    try {
      setLoadingPage(true);
      await Promise.all([
        fetchEstadisticas(),
        fetchContribuyentes(true),
      ]);
    } catch (error) {
      showToast("error", "Error al cargar datos");
    } finally {
      setLoadingPage(false);
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

  const fetchContribuyentes = async (cargaInicial = false) => {
    try {
      if (!cargaInicial) setLoadingTable(true);
      const sort = sortModel?.[0];
      const data = await getContribuyentes({
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
        search: debouncedSearch,
        activo,
        sortField: sort?.field || "id_contribuyente",
        sortOrder: sort?.sort?.toUpperCase() || "DESC",
      });
      setContribuyentes(data.contribuyentes);
      setTotalRows(data.total);
    } catch (error) {
      showToast("error", "Error al cargar contribuyentes");
    } finally {
      if (!cargaInicial) setLoadingTable(false);
    }
  };

  const handleDelete = useCallback(async (id, estadoActual) => {
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
  }, [fetchContribuyentes, fetchEstadisticas]);

  // Abrir modal para crear
  const handleAdd = () => {
    setContribuyenteEdit(null);
    setOpen(true);
  };

  // Abrir modal para editar
  const handleEdit = useCallback((contribuyente) => {
    setContribuyenteEdit(contribuyente);
    setOpen(true);
  }, []);

  const columns = useMemo(() => {
    return contribuyentesColumns(
      handleEdit,
      handleDelete
    );
  }, [handleEdit, handleDelete]);

  useEffect(() => {
    console.log("Columns recreated");
  }, [columns]);

  const handlePaginationChange = (newPaginationModel) => {
    setPaginationModel(newPaginationModel);
  };

  const handleSortModelChange = (newSortModel) => {
    setSortModel(newSortModel);
  };

  return (
    <PageLayout>
      <Stack size="lg">
        {loadingPage ? (
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
            <SearchBar
              value={search}
              onChange={(valor) => {
                setSearch(valor);
                setPaginationModel((prev) => ({
                  ...prev,
                  page: 0,
                }));
              }}
              placeholder="Buscar por Clave Única o Nombre"
            />
            <Table
              rows={contribuyentes}
              loading={loadingTable}
              columns={columns}
              getRowId={(row) => row.id_contribuyente}
              rowCount={totalRows}
              paginationModel={paginationModel}
              onPaginationModelChange={
                handlePaginationChange
              }
              sortModel={sortModel}
              onSortModelChange={handleSortModelChange}
            />
          </>)}
      </Stack>
    </PageLayout>
  );
};

export default Contribuyentes;
