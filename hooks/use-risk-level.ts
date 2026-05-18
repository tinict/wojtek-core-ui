import riskLevelService, { GetRiskLevelsParams } from "@/services/risk-level.service";
import { IRiskLevel } from "@/types/models/risk-level.model";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type UpdateRiskLevelPayload = Pick<IRiskLevel, "id"> & Partial<Omit<IRiskLevel, "id">>;

export function useGetRiskLevels(params?: GetRiskLevelsParams) {
    const { data, status, refetch } = useQuery({
        queryKey: ["risk-levels", params],
        queryFn: () => riskLevelService.getRiskLevels(params),
        staleTime: 5000,
        refetchOnWindowFocus: false,
    });
    return { data, status, refetch };
}

export function useCreateRiskLevel() {
    const queryClient = useQueryClient();
    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["create-risk-level"],
        mutationFn: (variables: Omit<IRiskLevel, "id">) =>
            riskLevelService.createRiskLevel(variables),
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["risk-levels"] }),
    });
    return { data, mutate, mutateAsync, status };
}

export function useUpdateRiskLevel() {
    const queryClient = useQueryClient();
    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["update-risk-level"],
        mutationFn: (variables: UpdateRiskLevelPayload) =>
            riskLevelService.updateRiskLevel(variables),
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["risk-levels"] }),
    });
    return { data, mutate, mutateAsync, status };
}

export function useToggleRiskLevel() {
    const queryClient = useQueryClient();
    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["toggle-risk-level"],
        mutationFn: (id: IRiskLevel["id"]) => riskLevelService.toggleRiskLevel(id),
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["risk-levels"] }),
    });
    return { data, mutate, mutateAsync, status };
}

export function useDeleteRiskLevel() {
    const queryClient = useQueryClient();
    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["delete-risk-level"],
        mutationFn: (id: IRiskLevel["id"]) => riskLevelService.deleteRiskLevel(id),
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["risk-levels"] }),
    });
    return { data, mutate, mutateAsync, status };
}
