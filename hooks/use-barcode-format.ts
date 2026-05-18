import barcodeFormatService, { GetBarcodeFormatsParams } from "@/services/barcode-format.service";
import { IBarcodeFormat } from "@/types/models/barcode-format.model";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type UpdateBarcodeFormatPayload = Pick<IBarcodeFormat, "id"> & Partial<Omit<IBarcodeFormat, "id">>;

export function useGetBarcodeFormats(params?: GetBarcodeFormatsParams) {
    const { data, status, refetch } = useQuery({
        queryKey: ["barcode-formats", params],
        queryFn: () => barcodeFormatService.getBarcodeFormats(params),
        staleTime: 5000,
        refetchOnWindowFocus: false,
    });
    return { data, status, refetch };
}

export function useCreateBarcodeFormat() {
    const queryClient = useQueryClient();
    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["create-barcode-format"],
        mutationFn: (variables: Omit<IBarcodeFormat, "id">) =>
            barcodeFormatService.createBarcodeFormat(variables),
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["barcode-formats"] }),
    });
    return { data, mutate, mutateAsync, status };
}

export function useUpdateBarcodeFormat() {
    const queryClient = useQueryClient();
    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["update-barcode-format"],
        mutationFn: (variables: UpdateBarcodeFormatPayload) =>
            barcodeFormatService.updateBarcodeFormat(variables),
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["barcode-formats"] }),
    });
    return { data, mutate, mutateAsync, status };
}

export function useToggleBarcodeFormat() {
    const queryClient = useQueryClient();
    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["toggle-barcode-format"],
        mutationFn: (id: IBarcodeFormat["id"]) =>
            barcodeFormatService.toggleBarcodeFormat(id),
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["barcode-formats"] }),
    });
    return { data, mutate, mutateAsync, status };
}

export function useDeleteBarcodeFormat() {
    const queryClient = useQueryClient();
    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["delete-barcode-format"],
        mutationFn: (id: IBarcodeFormat["id"]) =>
            barcodeFormatService.deleteBarcodeFormat(id),
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["barcode-formats"] }),
    });
    return { data, mutate, mutateAsync, status };
}