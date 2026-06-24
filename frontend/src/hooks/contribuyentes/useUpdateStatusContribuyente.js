import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStatusContribuyente } from "../../services/contribuyentesService.js";
import { contribuyentesKeys } from "./contribuyentesKeys.js";

export function useUpdateStatusContribuyente() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, estado }) =>
            updateStatusContribuyente(id, { estado }),

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