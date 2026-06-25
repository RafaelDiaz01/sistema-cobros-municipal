import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateContribuyente } from "../../services/contribuyentesService.js";
import { contribuyentesKeys } from "./contribuyentesKeys.js";

export function useUpdateContribuyenteMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => updateContribuyente(id, data),

        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: contribuyentesKeys.lists(),
                }),
                queryClient.invalidateQueries({
                    queryKey: contribuyentesKeys.stats(),
                }),
            ]);
        },
    });
}