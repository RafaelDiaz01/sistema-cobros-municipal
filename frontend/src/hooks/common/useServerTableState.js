import { useCallback, useState } from "react";
import { useDebounce } from "../useDebounce.js";

export function useServerTableState({
    initialPagination,
    initialSort,
    debounceDelay = 500,
}) {
    // ─── Estados de búsqueda, ordenamiento y paginación ─────────────
    const [search, setSearch] = useState("");
    const [sortModel, setSortModel] = useState(initialSort);
    const [paginationModel, setPaginationModel] = useState(initialPagination);

    // ─── Búsqueda con debounce ─────────────
    const debouncedSearch = useDebounce(search, debounceDelay);

    // ─── Función para reiniciar la página a 0 ─────────────
    const resetPage = useCallback(() => {
        setPaginationModel((prev) => ({
            ...prev,
            page: 0,
        }));
    }, []);
    
    // ─── Handlers para cambios en búsqueda y ordenamiento ─────────────
    const handleSearchChange = useCallback(
        (value) => {
            setSearch(value);
            resetPage();
        },
        [resetPage],
    );

    const handleSortModelChange = useCallback(
        (newSortModel) => {
            setSortModel(newSortModel);
            resetPage();
        },
        [resetPage],
    );

    return {
        search,
        debouncedSearch,

        sortModel,
        setSortModel,
        handleSortModelChange,

        paginationModel,
        setPaginationModel,

        handleSearchChange,
        resetPage,
    };
}