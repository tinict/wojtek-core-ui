import { api } from "@/lib/axios";
import { ApiResponse, PageApiResponse } from "@/types/api/axios.types";
import { IDevice } from "@/types/models/device.model";
import { execute } from "@/lib/api-helper";

type UpdateDevicePayload = Pick<IDevice, "deviceId"> & Partial<Omit<IDevice, "deviceId">>;

export interface GetDevicesParams {
    deviceName?: string;
    activeFlag?: number;
    page?: number;
    size?: number;
    sortBy?: string;
    sortDir?: "asc" | "desc";
};

class DeviceService {
    getDevices(params?: GetDevicesParams): Promise<PageApiResponse<IDevice>> {
        return execute(() => api.get("/api/v1/devices", { params }));
    }

    getDeviceById(deviceId: IDevice["deviceId"]): Promise<ApiResponse<IDevice>> {
        return execute(() => api.get(`/api/v1/devices/${deviceId}`));
    }

    createDevice(payload: Omit<IDevice, "deviceId" | "categoryName" | "supplierName">): Promise<ApiResponse<IDevice>> {
        return execute(() => api.post("/api/v1/devices", payload));
    }

    updateDevice(payload: UpdateDevicePayload): Promise<ApiResponse<IDevice>> {
        return execute(() => api.put("/api/v1/devices", payload));
    }

    toggleDevice(deviceId: IDevice["deviceId"]): Promise<ApiResponse<IDevice>> {
        return execute(() => api.patch(`/api/v1/devices/${deviceId}/toggle`));
    }

    deleteDevice(deviceId: IDevice["deviceId"]): Promise<ApiResponse<null>> {
        return execute(() => api.delete(`/api/v1/devices/${deviceId}`));
    }
}

export default new DeviceService();
