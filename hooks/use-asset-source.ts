import assetSourceService, { GetAssetSourcesParams } from "@/services/asset-source.service";
import { IAssetSource } from "@/types/models/asset-source.model";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type UpdateAssetSourcePayload = Pick<IAssetSource, "id"> & Partial<Omit<IAssetSource, "id">>;

export function useGetAssetSources(params?: GetAssetSourcesParams) {
    const { data, status, refetch } = useQuery({
        queryKey: ["asset-sources", params],
        queryFn: () => assetSourceService.getAssetSources(params),
        staleTime: 5000,
        refetchOnWindowFocus: false,
    });
    return { data, status, refetch };
}

export function useCreateAssetSource() {
    const queryClient = useQueryClient();
    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["create-asset-source"],
        mutationFn: (variables: Omit<IAssetSource, "id">) =>
            assetSourceService.createAssetSource(variables),
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["asset-sources"] }),
    });
    return { data, mutate, mutateAsync, status };
}

export function useUpdateAssetSource() {
    const queryClient = useQueryClient();
    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["update-asset-source"],
        mutationFn: (variables: UpdateAssetSourcePayload) =>
            assetSourceService.updateAssetSource(variables),
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["asset-sources"] }),
    });
    return { data, mutate, mutateAsync, status };
}

export function useToggleAssetSource() {
    const queryClient = useQueryClient();
    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["toggle-asset-source"],
        mutationFn: (id: IAssetSource["id"]) => assetSourceService.toggleAssetSource(id),
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["asset-sources"] }),
    });
    return { data, mutate, mutateAsync, status };
}

export function useDeleteAssetSource() {
    const queryClient = useQueryClient();
    const { data, status, mutate, mutateAsync } = useMutation({
        mutationKey: ["delete-asset-source"],
        mutationFn: (id: IAssetSource["id"]) => assetSourceService.deleteAssetSource(id),
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["asset-sources"] }),
    });
    return { data, mutate, mutateAsync, status };
}
