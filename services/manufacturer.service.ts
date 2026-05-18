import { api } from "@/lib/axios";
import { ApiResponse, PageApiResponse } from "@/types/api/axios.types";
import { IManufacturer } from "@/types/models/manufacturer.model";
import { execute } from "@/lib/api-helper";

type UpdateManufacturerPayload = Pick<IManufacturer, "manufacturerId"> & Partial<Omit<IManufacturer, "manufacturerId">>;

export interface GetManufacturersParams {
    manufacturerName?: string;
    activeFlag?: number;
    page?: number;
    size?: number;
    sortBy?: string;
    sortDir?: "asc" | "desc";
};

class ManufacturerService {
    getManufacturers(params?: GetManufacturersParams): Promise<PageApiResponse<IManufacturer>> {
        return execute(() => api.get("/api/v1/manufacturers", { params }));
    }

    getManufacturerById(manufacturerId: IManufacturer["manufacturerId"]): Promise<ApiResponse<IManufacturer>> {
        return execute(() => api.get(`/api/v1/manufacturers/${manufacturerId}`));
    }

    createManufacturer(payload: Omit<IManufacturer, "manufacturerId">): Promise<ApiResponse<IManufacturer>> {
        return execute(() => api.post("/api/v1/manufacturers", payload));
    }

    updateManufacturer(payload: UpdateManufacturerPayload): Promise<ApiResponse<IManufacturer>> {
        return execute(() => api.put("/api/v1/manufacturers", payload));
    }

    toggleManufacturer(manufacturerId: IManufacturer["manufacturerId"]): Promise<ApiResponse<IManufacturer>> {
        return execute(() => api.patch(`/api/v1/manufacturers/${manufacturerId}/toggle`));
    }

    deleteManufacturer(manufacturerId: IManufacturer["manufacturerId"]): Promise<ApiResponse<null>> {
        return execute(() => api.delete(`/api/v1/manufacturers/${manufacturerId}`));
    }
}

export default new ManufacturerService();