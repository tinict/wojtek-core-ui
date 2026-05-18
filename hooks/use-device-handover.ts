import deviceHandoverService, { GetDeviceHandoversParams } from "@/services/device-handover.service";
import { IDeviceHandover, IDeviceHandoverRequest } from "@/types/models/device-handover.model";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetDeviceHandovers(params?: GetDeviceHandoversParams) {
    const { data, status, refetch } = useQuery({
        queryKey: ["device-handovers", params],
        queryFn: () => deviceHandoverService.getHandovers(params),
        staleTime: 5000,
        refetchOnWindowFocus: false,
    });
    return { data, status, refetch };
}

export function useGetDeviceHandoverById(handoverId: IDeviceHandover["handoverId"]) {
    const { data, status, refetch } = useQuery({
        queryKey: ["device-handovers", handoverId],
        queryFn: () => deviceHandoverService.getHandoverById(handoverId),
        staleTime: 5000,
        refetchOnWindowFocus: false,
        enabled: !!handoverId,
    });
    return { data, status, refetch };
}

export function useCreateDeviceHandover() {
    const queryClient = useQueryClient();
    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["create-device-handover"],
        mutationFn: (variables: IDeviceHandoverRequest) =>
            deviceHandoverService.createHandover(variables),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["device-handovers"] });
        },
    });
    return { data, mutate, mutateAsync, status };
}

export function useUpdateDeviceHandover() {
    const queryClient = useQueryClient();
    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["update-device-handover"],
        mutationFn: ({ handoverId, ...payload }: { handoverId: string } & IDeviceHandoverRequest) =>
            deviceHandoverService.updateHandover(handoverId, payload),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["device-handovers"] });
        },
    });
    return { data, mutate, mutateAsync, status };
}

export function useDeleteDeviceHandover() {
    const queryClient = useQueryClient();
    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["delete-device-handover"],
        mutationFn: (handoverId: IDeviceHandover["handoverId"]) =>
            deviceHandoverService.deleteHandover(handoverId),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["device-handovers"] });
        },
    });
    return { data, mutate, mutateAsync, status };
}