import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getContribuyentes } from "../../services/contribuyentesService.js";
import { contribuyentesKeys } from "./contribuyentesKeys.js";

export function useContribuyentesQuery({
    paginationModel,
    debouncedSearch,
    activo,
    sortModel,
}) {
    const sort = sortModel[0];

    const filters = {
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
        search: debouncedSearch,
        activo,
        sortField: sort?.field ?? "id_contribuyente",
        sortOrder: sort?.sort?.toUpperCase() ?? "DESC",
    };

    return useQuery({
        queryKey: contribuyentesKeys.list(filters),
        queryFn: () => getContribuyentes(filters),
        placeholderData: keepPreviousData,
        staleTime: 30_000,
    });
}