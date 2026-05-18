import deviceCategoryService, { GetDeviceCategoriesParams } from "@/services/device-category.service";
import { IDeviceCategory } from "@/types/models/device-category.model";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type UpdateDeviceCategoryPayload = Pick<IDeviceCategory, "categoryId"> & Partial<Omit<IDeviceCategory, "categoryId">>;

export function useGetDeviceCategories(params?: GetDeviceCategoriesParams) {
    const { data, status, refetch } = useQuery({
        queryKey: ["device-categories", params],
        queryFn: () => deviceCategoryService.getDeviceCategories(params),
        staleTime: 5000,
        refetchOnWindowFocus: false,
    });
    return { data, status, refetch };
}

export function useGetDeviceCategoryById(categoryId: IDeviceCategory["categoryId"]) {
    const { data, status, refetch } = useQuery({
        queryKey: ["device-categories", categoryId],
        queryFn: () => deviceCategoryService.getDeviceCategoryById(categoryId),
        staleTime: 5000,
        refetchOnWindowFocus: false,
        enabled: !!categoryId,
    });
    return { data, status, refetch };
}

export function useCreateDeviceCategory() {
    const queryClient = useQueryClient();
    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["create-device-category"],
        mutationFn: (variables: Omit<IDeviceCategory, "categoryId">) =>
            deviceCategoryService.createDeviceCategory(variables),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["device-categories"] });
        },
    });
    return { data, mutate, mutateAsync, status };
}

export function useUpdateDeviceCategory() {
    const queryClient = useQueryClient();
    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["update-device-category"],
        mutationFn: (variables: UpdateDeviceCategoryPayload) =>
            deviceCategoryService.updateDeviceCategory(variables),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["device-categories"] });
        },
    });
    return { data, mutate, mutateAsync, status };
}

export function useToggleDeviceCategory() {
    const queryClient = useQueryClient();
    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["toggle-device-category"],
        mutationFn: (categoryId: IDeviceCategory["categoryId"]) =>
            deviceCategoryService.toggleDeviceCategory(categoryId),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["device-categories"] });
        },
    });
    return { data, mutate, mutateAsync, status };
}

export function useDeleteDeviceCategory() {
    const queryClient = useQueryClient();
    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["delete-device-category"],
        mutationFn: (categoryId: IDeviceCategory["categoryId"]) =>
            deviceCategoryService.deleteDeviceCategory(categoryId),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["device-categories"] });
        },
    });
    return { data, mutate, mutateAsync, status };
}
