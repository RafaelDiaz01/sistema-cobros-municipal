import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createContribuyente } from "../../services/contribuyentesService.js";
import { contribuyentesKeys } from "./contribuyentesKeys.js";

export function useCreateContribuyenteMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createContribuyente,

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