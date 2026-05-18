import { api } from "@/lib/axios";
import { ApiResponse, PageApiResponse } from "@/types/api/axios.types";
import { IUnit } from "@/types/models/unit.model";
import { execute } from "@/lib/api-helper";

type UpdateUnitPayload = Pick<IUnit, "id"> & Partial<Omit<IUnit, "id">>;

export interface GetUnitsParams {
    unitName?: string;
    activeFlag?: number;
    page?: number;
    size?: number;
    sortBy?: string;
    sortDir?: "asc" | "desc";
};

class UnitService {
    getUnits(params?: GetUnitsParams): Promise<PageApiResponse<IUnit>> {
        return execute(() => api.get("/api/v1/units", { params }));
    }

    getUnitById(id: IUnit["id"]): Promise<ApiResponse<IUnit>> {
        return execute(() => api.get(`/api/v1/units/${id}`));
    }

    createUnit(payload: Omit<IUnit, "id" | "parentUnitName">): Promise<ApiResponse<IUnit>> {
        return execute(() => api.post("/api/v1/units", payload));
    }

    updateUnit(payload: UpdateUnitPayload): Promise<ApiResponse<IUnit>> {
        return execute(() => api.put("/api/v1/units", payload));
    }

    toggleUnit(id: IUnit["id"]): Promise<ApiResponse<IUnit>> {
        return execute(() => api.patch(`/api/v1/units/${id}/toggle`));
    }

    deleteUnit(id: IUnit["id"]): Promise<ApiResponse<null>> {
        return execute(() => api.delete(`/api/v1/units/${id}`));
    }
}

export default new UnitService();
