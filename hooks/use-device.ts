import deviceService, { GetDevicesParams } from "@/services/device.service";
import { IDevice } from "@/types/models/device.model";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type UpdateDevicePayload = Pick<IDevice, "deviceId"> & Partial<Omit<IDevice, "deviceId">>;

export function useGetDevices(params?: GetDevicesParams) {
    const { data, status, refetch } = useQuery({
        queryKey: ["devices", params],
        queryFn: () => deviceService.getDevices(params),
        staleTime: 5000,
        refetchOnWindowFocus: false,
    });
    return { data, status, refetch };
}

export function useGetDeviceById(deviceId: IDevice["deviceId"]) {
    const { data, status, refetch } = useQuery({
        queryKey: ["devices", deviceId],
        queryFn: () => deviceService.getDeviceById(deviceId),
        staleTime: 5000,
        refetchOnWindowFocus: false,
        enabled: !!deviceId,
    });
    return { data, status, refetch };
}

export function useCreateDevice() {
    const queryClient = useQueryClient();
    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["create-device"],
        mutationFn: (variables: Omit<IDevice, "deviceId" | "categoryName" | "supplierName">) =>
            deviceService.createDevice(variables),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["devices"] });
        },
    });
    return { data, mutate, mutateAsync, status };
}

export function useUpdateDevice() {
    const queryClient = useQueryClient();
    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["update-device"],
        mutationFn: (variables: UpdateDevicePayload) =>
            deviceService.updateDevice(variables),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["devices"] });
        },
    });
    return { data, mutate, mutateAsync, status };
}

export function useToggleDevice() {
    const queryClient = useQueryClient();
    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["toggle-device"],
        mutationFn: (deviceId: IDevice["deviceId"]) =>
            deviceService.toggleDevice(deviceId),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["devices"] });
        },
    });
    return { data, mutate, mutateAsync, status };
}

export function useDeleteDevice() {
    const queryClient = useQueryClient();
    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["delete-device"],
        mutationFn: (deviceId: IDevice["deviceId"]) =>
            deviceService.deleteDevice(deviceId),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["devices"] });
        },
    });
    return { data, mutate, mutateAsync, status };
}