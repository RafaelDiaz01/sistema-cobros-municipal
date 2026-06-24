import { useQuery } from "@tanstack/react-query";
import { getEstadisticasContribuyentes } from "../../services/contribuyentesService.js";
import { contribuyentesKeys } from "./contribuyentesKeys.js";

export function useContribuyentesStatsQuery() {
    return useQuery({
        queryKey: contribuyentesKeys.stats(),
        queryFn: getEstadisticasContribuyentes,
        staleTime: 60_000,
    });
}