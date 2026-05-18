import { api } from "@/lib/axios";
import { ApiResponse, PageApiResponse } from "@/types/api/axios.types";
import { IDeviceHandover, IDeviceHandoverRequest } from "@/types/models/device-handover.model";
import { execute } from "@/lib/api-helper";

export interface GetDeviceHandoversParams {
    deviceId?: string;
    unitReceiverId?: string;
    from?: string;
    to?: string;
    page?: number;
    size?: number;
    sortBy?: string;
    sortDir?: "asc" | "desc";
};

class DeviceHandoverService {
    getHandovers(params?: GetDeviceHandoversParams): Promise<PageApiResponse<IDeviceHandover>> {
        return execute(() => api.get("/api/v1/device-handovers", { params }));
    }

    getHandoverById(handoverId: IDeviceHandover["handoverId"]): Promise<ApiResponse<IDeviceHandover>> {
        return execute(() => api.get(`/api/v1/device-handovers/${handoverId}`));
    }

    createHandover(payload: IDeviceHandoverRequest): Promise<ApiResponse<IDeviceHandover>> {
        return execute(() => api.post("/api/v1/device-handovers", payload));
    }

    updateHandover(handoverId: IDeviceHandover["handoverId"], payload: IDeviceHandoverRequest): Promise<ApiResponse<IDeviceHandover>> {
        return execute(() => api.put(`/api/v1/device-handovers/${handoverId}`, payload));
    }

    deleteHandover(handoverId: IDeviceHandover["handoverId"]): Promise<ApiResponse<null>> {
        return execute(() => api.delete(`/api/v1/device-handovers/${handoverId}`));
    }
}

export default new DeviceHandoverService();
