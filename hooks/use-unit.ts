import unitService, { GetUnitsParams } from "@/services/unit.service";
import { IUnit } from "@/types/models/unit.model";
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

type UpdateUnitPayload = Pick<IUnit, "id"> & Partial<Omit<IUnit, "id">>;

export function useGetUnits(params?: GetUnitsParams) {
    const { data, status, refetch } = useQuery({
        queryKey: ["units", params],
        queryFn: () => unitService.getUnits(params),
        staleTime: 5000,
        refetchOnWindowFocus: false,
    });

    return { data, status, refetch };
}

export function useGetUnitById(id: IUnit["id"]) {
    const { data, status, refetch } = useQuery({
        queryKey: ["units", id],
        queryFn: () => unitService.getUnitById(id),
        staleTime: 5000,
        refetchOnWindowFocus: false,
        enabled: !!id,
    });

    return { data, status, refetch };
}

export function useCreateUnit() {
    const queryClient = useQueryClient();

    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["create-unit"],
        mutationFn: (variables: Omit<IUnit, "id" | "parentUnitName">) =>
            unitService.createUnit(variables),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["units"] });
        },
    });

    return { data, mutate, mutateAsync, status };
}

export function useUpdateUnit() {
    const queryClient = useQueryClient();

    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["update-unit"],
        mutationFn: (variables: UpdateUnitPayload) =>
            unitService.updateUnit(variables),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["units"] });
        },
    });

    return { data, mutate, mutateAsync, status };
}

export function useToggleUnit() {
    const queryClient = useQueryClient();

    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["toggle-unit"],
        mutationFn: (id: IUnit["id"]) =>
            unitService.toggleUnit(id),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["units"] });
        },
    });

    return { data, mutate, mutateAsync, status };
}

export function useDeleteUnit() {
    const queryClient = useQueryClient();

    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["delete-unit"],
        mutationFn: (id: IUnit["id"]) =>
            unitService.deleteUnit(id),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["units"] });
        },
    });

    return { data, mutate, mutateAsync, status };
}