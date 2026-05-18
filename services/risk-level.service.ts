import { api } from "@/lib/axios";
import { ApiResponse, PageApiResponse } from "@/types/api/axios.types";
import { IRiskLevel } from "@/types/models/risk-level.model";
import { execute } from "@/lib/api-helper";

type UpdateRiskLevelPayload = Pick<IRiskLevel, "id"> & Partial<Omit<IRiskLevel, "id">>;

export interface GetRiskLevelsParams {
    name?: string;
    isActive?: boolean;
    page?: number;
    size?: number;
    sortBy?: string;
    sortDir?: "asc" | "desc";
};

class RiskLevelService {
    getRiskLevels(params?: GetRiskLevelsParams): Promise<PageApiResponse<IRiskLevel>> {
        return execute(() => api.get("/api/v1/risk-levels", { params }));
    }

    getRiskLevelById(id: IRiskLevel["id"]): Promise<ApiResponse<IRiskLevel>> {
        return execute(() => api.get(`/api/v1/risk-levels/${id}`));
    }

    createRiskLevel(payload: Omit<IRiskLevel, "id">): Promise<ApiResponse<IRiskLevel>> {
        return execute(() => api.post("/api/v1/risk-levels", payload));
    }

    updateRiskLevel(payload: UpdateRiskLevelPayload): Promise<ApiResponse<IRiskLevel>> {
        return execute(() => api.put("/api/v1/risk-levels", payload));
    }

    toggleRiskLevel(id: IRiskLevel["id"]): Promise<ApiResponse<IRiskLevel>> {
        return execute(() => api.patch(`/api/v1/risk-levels/${id}/toggle`));
    }

    deleteRiskLevel(id: IRiskLevel["id"]): Promise<ApiResponse<null>> {
        return execute(() => api.delete(`/api/v1/risk-levels/${id}`));
    }
}

export default new RiskLevelService();
