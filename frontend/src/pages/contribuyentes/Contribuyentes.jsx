import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { Users, UserCheck, UserX, IdCard } from "lucide-react";
import { showToast } from "../../utils/alerts/toast.js";
import { alertConfirmation } from "../../utils/alerts/alert.js";
import { contribuyentesColumns } from "./contribuyetes.columns.jsx";
import { useDebounce } from "../../hooks/useDebounce.js";
import { useContribuyentesQuery } from "../../hooks/contribuyentes/useContribuyentesQuery.js";
import { useContribuyentesStatsQuery } from "../../hooks/contribuyentes/useContribuyentesStatsQuery.js";
import { useQueryClient } from "@tanstack/react-query";
import { contribuyentesKeys } from "../../hooks/contribuyentes/contribuyentesKeys.js";
import { useUpdateStatusContribuyente } from "../../hooks/contribuyentes/useUpdateStatusContribuyente.js";
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
  const [open, setOpen] = useState(false);
  const [contribuyenteEdit, setContribuyenteEdit] = useState(null);
  const [search, setSearch] = useState("");
  const [activo, setActivo] = useState("");
  const [sortModel, setSortModel] = useState(INITIAL_SORT);
  const [paginationModel, setPaginationModel] = useState(INITIAL_PAGINATION);
  const debouncedSearch = useDebounce(search, 500);

  // ─── React Query ─────────────────────────────────────────────
  const queryClient = useQueryClient();

  const {
    data: contribuyentesData,
    isLoading: isLoadingContribuyentes,
    isFetching: isFetchingContribuyentes,
    isError: isErrorContribuyentes,
  } = useContribuyentesQuery({
    paginationModel,
    debouncedSearch,
    activo,
    sortModel,
  });

  const {
    data: stats = {},
    isLoading: isLoadingStats,
    isError: isErrorStats,
  } = useContribuyentesStatsQuery();

  const updateStatusMutation = useUpdateStatusContribuyente();
  const contribuyentes = contribuyentesData?.contribuyentes ?? [];
  const totalRows = contribuyentesData?.total ?? 0;
  const loadingPage = isLoadingContribuyentes || isLoadingStats;
  const loadingTable = isFetchingContribuyentes;

  useEffect(() => {
    if (isErrorContribuyentes) {
      showToast("error", "Error al cargar contribuyentes");
    }
  }, [isErrorContribuyentes]);

  useEffect(() => {
    if (isErrorStats) {
      showToast("error", "Error al cargar estadísticas de contribuyentes");
    }
  }, [isErrorStats]);

  // ─── Handlers ──────────────────────────────────────────────────────────────
  const handleDelete = useCallback(async (id, estadoActual) => {
    const nuevoEstado = !estadoActual;
    const mensaje = nuevoEstado
      ? "¿Deseas activar este contribuyente?"
      : "¿Deseas desactivar este contribuyente?";

    const confirmacion = await alertConfirmation("Atención", mensaje, "warning");
    if (!confirmacion) return;

    try {
      await updateStatusMutation.mutateAsync({ id, estado: nuevoEstado });
      showToast("success", "Estado actualizado exitosamente");
    } catch (error) {
      showToast("error", "Error al cambiar el estado del contribuyente");
    }
  }, [updateStatusMutation]);

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
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: contribuyentesKeys.lists(),
      }),
      queryClient.invalidateQueries({
        queryKey: contribuyentesKeys.stats(),
      }),
    ]);
  }, [queryClient]);

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

  const handleActivoChange = useCallback((valor) => {
    setActivo(valor);
    // Volver a la primera página al cambiar el filtro de estado
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
        <ModuleSkeleton tableRows={7} tableColumns={8} statsCards={4} />
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
          statusValue={activo}
          onStatusChange={handleActivoChange}
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
