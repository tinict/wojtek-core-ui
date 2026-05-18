import { api } from "@/lib/axios";
import { ApiResponse, PageApiResponse } from "@/types/api/axios.types";
import { IDeviceCategory } from "@/types/models/device-category.model";
import { execute } from "@/lib/api-helper";

type UpdateDeviceCategoryPayload = Pick<IDeviceCategory, "categoryId"> & Partial<Omit<IDeviceCategory, "categoryId">>;

export interface GetDeviceCategoriesParams {
    categoryName?: string;
    activeFlag?: number;
    page?: number;
    size?: number;
    sortBy?: string;
    sortDir?: "asc" | "desc";
};

class DeviceCategoryService {
    getDeviceCategories(params?: GetDeviceCategoriesParams): Promise<PageApiResponse<IDeviceCategory>> {
        return execute(() => api.get("/api/v1/device-categories", { params }));
    }

    getDeviceCategoryById(categoryId: IDeviceCategory["categoryId"]): Promise<ApiResponse<IDeviceCategory>> {
        return execute(() => api.get(`/api/v1/device-categories/${categoryId}`));
    }

    createDeviceCategory(payload: Omit<IDeviceCategory, "categoryId">): Promise<ApiResponse<IDeviceCategory>> {
        return execute(() => api.post("/api/v1/device-categories", payload));
    }

    updateDeviceCategory(payload: UpdateDeviceCategoryPayload): Promise<ApiResponse<IDeviceCategory>> {
        return execute(() => api.put("/api/v1/device-categories", payload));
    }

    toggleDeviceCategory(categoryId: IDeviceCategory["categoryId"]): Promise<ApiResponse<IDeviceCategory>> {
        return execute(() => api.patch(`/api/v1/device-categories/${categoryId}/toggle`));
    }

    deleteDeviceCategory(categoryId: IDeviceCategory["categoryId"]): Promise<ApiResponse<null>> {
        return execute(() => api.delete(`/api/v1/device-categories/${categoryId}`));
    }
}

export default new DeviceCategoryService();
