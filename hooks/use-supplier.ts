import supplierService, { GetSuppliersParams } from "@/services/supplier.service";
import { ISupplier } from "@/types/models/supplier.model";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type UpdateSupplierPayload = Pick<ISupplier, "supplierId"> & Partial<Omit<ISupplier, "supplierId">>;

export function useGetSuppliers(params?: GetSuppliersParams) {
    const { data, status, refetch } = useQuery({
        queryKey: ["suppliers", params],
        queryFn: () => supplierService.getSuppliers(params),
        staleTime: 5000,
        refetchOnWindowFocus: false,
    });
    return { data, status, refetch };
}

export function useGetSupplierById(supplierId: ISupplier["supplierId"]) {
    const { data, status, refetch } = useQuery({
        queryKey: ["suppliers", supplierId],
        queryFn: () => supplierService.getSupplierById(supplierId),
        staleTime: 5000,
        refetchOnWindowFocus: false,
        enabled: !!supplierId,
    });
    return { data, status, refetch };
}

export function useCreateSupplier() {
    const queryClient = useQueryClient();
    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["create-supplier"],
        mutationFn: (variables: Omit<ISupplier, "supplierId">) =>
            supplierService.createSupplier(variables),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["suppliers"] });
        },
    });
    return { data, mutate, mutateAsync, status };
}

export function useUpdateSupplier() {
    const queryClient = useQueryClient();
    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["update-supplier"],
        mutationFn: (variables: UpdateSupplierPayload) =>
            supplierService.updateSupplier(variables),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["suppliers"] });
        },
    });
    return { data, mutate, mutateAsync, status };
}

export function useToggleSupplier() {
    const queryClient = useQueryClient();
    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["toggle-supplier"],
        mutationFn: (supplierId: ISupplier["supplierId"]) =>
            supplierService.toggleSupplier(supplierId),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["suppliers"] });
        },
    });
    return { data, mutate, mutateAsync, status };
}

export function useDeleteSupplier() {
    const queryClient = useQueryClient();
    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["delete-supplier"],
        mutationFn: (supplierId: ISupplier["supplierId"]) =>
            supplierService.deleteSupplier(supplierId),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["suppliers"] });
        },
    });
    return { data, mutate, mutateAsync, status };
}