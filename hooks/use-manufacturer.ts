import manufacturerService, { GetManufacturersParams } from "@/services/manufacturer.service";
import { IManufacturer } from "@/types/models/manufacturer.model";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type UpdateManufacturerPayload = Pick<IManufacturer, "manufacturerId"> & Partial<Omit<IManufacturer, "manufacturerId">>;

export function useGetManufacturers(params?: GetManufacturersParams) {
    const { data, status, refetch } = useQuery({
        queryKey: ["manufacturers", params],
        queryFn: () => manufacturerService.getManufacturers(params),
        staleTime: 5000,
        refetchOnWindowFocus: false,
    });
    return { data, status, refetch };
}

export function useGetManufacturerById(manufacturerId: IManufacturer["manufacturerId"]) {
    const { data, status, refetch } = useQuery({
        queryKey: ["manufacturers", manufacturerId],
        queryFn: () => manufacturerService.getManufacturerById(manufacturerId),
        staleTime: 5000,
        refetchOnWindowFocus: false,
        enabled: !!manufacturerId,
    });
    return { data, status, refetch };
}

export function useCreateManufacturer() {
    const queryClient = useQueryClient();
    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["create-manufacturer"],
        mutationFn: (variables: Omit<IManufacturer, "manufacturerId">) =>
            manufacturerService.createManufacturer(variables),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["manufacturers"] });
        },
    });
    return { data, mutate, mutateAsync, status };
}

export function useUpdateManufacturer() {
    const queryClient = useQueryClient();
    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["update-manufacturer"],
        mutationFn: (variables: UpdateManufacturerPayload) =>
            manufacturerService.updateManufacturer(variables),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["manufacturers"] });
        },
    });
    return { data, mutate, mutateAsync, status };
}

export function useToggleManufacturer() {
    const queryClient = useQueryClient();
    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["toggle-manufacturer"],
        mutationFn: (manufacturerId: IManufacturer["manufacturerId"]) =>
            manufacturerService.toggleManufacturer(manufacturerId),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["manufacturers"] });
        },
    });
    return { data, mutate, mutateAsync, status };
}

export function useDeleteManufacturer() {
    const queryClient = useQueryClient();
    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["delete-manufacturer"],
        mutationFn: (manufacturerId: IManufacturer["manufacturerId"]) =>
            manufacturerService.deleteManufacturer(manufacturerId),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["manufacturers"] });
        },
    });
    return { data, mutate, mutateAsync, status };
}