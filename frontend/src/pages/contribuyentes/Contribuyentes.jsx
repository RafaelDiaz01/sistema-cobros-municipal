import { useEffect, useState, useMemo, useCallback, useRef } from "react";
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

// ─── Constantes ────────────────────────────────────────
const INITIAL_PAGINATION = { page: 0, pageSize: 7 };
const INITIAL_SORT = [{ field: "id_contribuyente", sort: "desc" }];

const Contribuyentes = () => {
  const [contribuyentes, setContribuyentes] = useState([]);
  const [stats, setStats] = useState({});
  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingTable, setLoadingTable] = useState(false);
  const [open, setOpen] = useState(false);
  const [contribuyenteEdit, setContribuyenteEdit] = useState(null);
  const [totalRows, setTotalRows] = useState(0);
  const [search, setSearch] = useState("");
  const [activo, setActivo] = useState("");
  const [sortModel, setSortModel] = useState(INITIAL_SORT);
  const [paginationModel, setPaginationModel] = useState(INITIAL_PAGINATION);
  const debouncedSearch = useDebounce(search, 500);
  const isInitialMount = useRef(true);

  // ─── Data fetching ─────────────────────────────────────────────────────────
  const fetchEstadisticas = useCallback(async () => {
    try {
      const data = await getEstadisticasContribuyentes();
      setStats(data);
    } catch {
      showToast("error", "Error al cargar estadísticas de contribuyentes");
    }
  }, []);

  const fetchContribuyentes = useCallback(async () => {
    setLoadingTable(true);
    try {
      const sort = sortModel[0];
      const data = await getContribuyentes({
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
        search: debouncedSearch,
        activo,
        sortField: sort?.field ?? "id_contribuyente",
        sortOrder: sort?.sort?.toUpperCase() ?? "DESC",
      });
      setContribuyentes(data.contribuyentes);
      setTotalRows(data.total);
    } catch {
      showToast("error", "Error al cargar contribuyentes");
    } finally {
      setLoadingTable(false);
    }
  }, [paginationModel, debouncedSearch, activo, sortModel]);

  // Carga inicial, se ejecuta una sola vez al montar el componente.
  useEffect(() => {
    const initialize = async () => {
      try {
        await Promise.all([fetchEstadisticas(), fetchContribuyentes()]);
      } finally {
        setLoadingPage(false);
      }
    };
    initialize();
  }, []);

  // Se dispara cuando cambian filtros, paginación u orden.
  // Salta la primera ejecución (mount) para no duplicar la carga inicial.
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    fetchContribuyentes();
  }, [fetchContribuyentes]);

  // ─── Handlers ──────────────────────────────────────────────────────────────
  const handleDelete = useCallback(async (id, estadoActual) => {
    const nuevoEstado = !estadoActual;
    const mensaje = nuevoEstado
      ? "¿Deseas activar este contribuyente?"
      : "¿Deseas desactivar este contribuyente?";

    const confirmacion = await alertConfirmation("Atención", mensaje, "warning");
    if (!confirmacion) return;

    try {
      await updateStatusContribuyente(id, { estado: nuevoEstado });
      // Actualiza tabla y estadísticas en paralelo
      await Promise.all([fetchContribuyentes(), fetchEstadisticas()]);
      showToast("success", "Estado actualizado exitosamente");
    } catch (error) {
      showToast("error", "Error al cambiar el estado del contribuyente");
    }
  }, [fetchContribuyentes, fetchEstadisticas]);

  // Abrir modal para crear
  const handleAdd = useCallback(() => {
    setContribuyenteEdit(null);
    setOpen(true);
  }, []);

  // Abrir modal para editar
  const handleEdit = useCallback((contribuyente) => {
    setContribuyenteEdit(contribuyente);
    setOpen(true);
  }, []);

  // Callbacks estables para el modal (evitan renders innecesarios de hijo)
  const handleCloseModal = useCallback(() => setOpen(false), []);

  const handleModalSuccess = useCallback(async () => {
    await Promise.all([fetchContribuyentes(), fetchEstadisticas()]);
  }, [fetchContribuyentes, fetchEstadisticas]);

  const handleSearchChange = useCallback((valor) => {
    setSearch(valor);
    // Volver a la primera página al cambiar el término de búsqueda
    setPaginationModel((prev) => ({ ...prev, page: 0 }));
  }, []);

  const handleSortModelChange = useCallback((newSortModel) => {
    setSortModel(newSortModel);
    // Volver a la primera página al cambiar el orden
    setPaginationModel((prev) => ({ ...prev, page: 0 }));
  }, []);

  // ─── Valores derivados memoizados ──────────────────────────────────────────
  const columns = useMemo(
    () => contribuyentesColumns(handleEdit, handleDelete),
    [handleEdit, handleDelete],
  );

  // Memoizado para evitar que StatsCards se re-renderice innecesariamente
  const statsConfig = useMemo(
    () => [
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
    ],
    [stats],
  );

  // ─── Render ────────────────────────────────────────────────────────────────
  if (loadingPage) {
    return (
      <PageLayout>
        <ModuleSkeleton tableRows={9} tableColumns={8} statsCards={4} />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Stack size="lg">
        <SectionTitle
          text="Gestión de Contribuyentes"
          onAdd={handleAdd}
          textButton="Agregar Contribuyente"
        />

        {open && (
          <AddContribuyenteModal
            isOpen={open}
            onClose={handleCloseModal}
            contribuyente={contribuyenteEdit}
            onSuccess={handleModalSuccess}
          />
        )}

        <StatsCards stats={statsConfig} />

        <SearchBar
          value={search}
          onChange={handleSearchChange}
          placeholder="Buscar por Clave Única o Nombre"
        />

        <Table
          rows={contribuyentes}
          loading={loadingTable}
          columns={columns}
          getRowId={(row) => row.id_contribuyente}
          rowCount={totalRows}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          sortModel={sortModel}
          onSortModelChange={handleSortModelChange}
        />
      </Stack>
    </PageLayout>
  );
};

export default Contribuyentes;
