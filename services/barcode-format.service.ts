import { api } from "@/lib/axios";
import { ApiResponse, PageApiResponse } from "@/types/api/axios.types";
import { IBarcodeFormat } from "@/types/models/barcode-format.model";
import { execute } from "@/lib/api-helper";

type UpdateBarcodeFormatPayload = Pick<IBarcodeFormat, "id"> & Partial<Omit<IBarcodeFormat, "id">>;

export interface GetBarcodeFormatsParams {
    name?: string;
    isActive?: boolean;
    page?: number;
    size?: number;
    sortBy?: string;
    sortDir?: "asc" | "desc";
};

class BarcodeFormatService {
    getBarcodeFormats(params?: GetBarcodeFormatsParams): Promise<PageApiResponse<IBarcodeFormat>> {
        return execute(() => api.get("/api/v1/barcode-formats", { params }));
    }

    getBarcodeFormatById(id: IBarcodeFormat["id"]): Promise<ApiResponse<IBarcodeFormat>> {
        return execute(() => api.get(`/api/v1/barcode-formats/${id}`));
    }

    createBarcodeFormat(payload: Omit<IBarcodeFormat, "id">): Promise<ApiResponse<IBarcodeFormat>> {
        return execute(() => api.post("/api/v1/barcode-formats", payload));
    }

    updateBarcodeFormat({ id, ...fields }: UpdateBarcodeFormatPayload): Promise<ApiResponse<IBarcodeFormat>> {
        return execute(() => api.put(`/api/v1/barcode-formats/${id}`, fields));
    }

    toggleBarcodeFormat(id: IBarcodeFormat["id"]): Promise<ApiResponse<IBarcodeFormat>> {
        return execute(() => api.patch(`/api/v1/barcode-formats/${id}/toggle`));
    }


    deleteBarcodeFormat(id: IBarcodeFormat["id"]): Promise<ApiResponse<null>> {
        return execute(() => api.delete(`/api/v1/barcode-formats/${id}`));
    }
}

export default new BarcodeFormatService();
