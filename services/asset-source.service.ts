import { api } from "@/lib/axios";
import { ApiResponse, PageApiResponse } from "@/types/api/axios.types";
import { IAssetSource } from "@/types/models/asset-source.model";
import { execute } from "@/lib/api-helper";

type UpdateAssetSourcePayload = Pick<IAssetSource, "id"> & Partial<Omit<IAssetSource, "id">>;

export interface GetAssetSourcesParams {
    name?: string;
    isActive?: boolean;
    page?: number;
    size?: number;
    sortBy?: string;
    sortDir?: "asc" | "desc";
};

class AssetSourceService {
    getAssetSources(params?: GetAssetSourcesParams): Promise<PageApiResponse<IAssetSource>> {
        return execute(() => api.get("/api/v1/asset-sources", { params }));
    }

    getAssetSourceById(id: IAssetSource["id"]): Promise<ApiResponse<IAssetSource>> {
        return execute(() => api.get(`/api/v1/asset-sources/${id}`));
    }

    createAssetSource(payload: Omit<IAssetSource, "id">): Promise<ApiResponse<IAssetSource>> {
        return execute(() => api.post("/api/v1/asset-sources", payload));
    }

    updateAssetSource(payload: UpdateAssetSourcePayload): Promise<ApiResponse<IAssetSource>> {
        return execute(() => api.put("/api/v1/asset-sources", payload));
    }

    toggleAssetSource(id: IAssetSource["id"]): Promise<ApiResponse<IAssetSource>> {
        return execute(() => api.patch(`/api/v1/asset-sources/${id}/toggle`));
    }

    deleteAssetSource(id: IAssetSource["id"]): Promise<ApiResponse<null>> {
        return execute(() => api.delete(`/api/v1/asset-sources/${id}`));
    }
}

export default new AssetSourceService();
