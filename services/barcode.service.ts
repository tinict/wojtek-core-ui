import { api } from "@/lib/axios";
import { ApiResponse } from "@/types/api/axios.types";
import { IBarcode } from "@/types/models/barcode.model";
import { execute } from "@/lib/api-helper";

class BarcodeService {
    generateBarcode(payload: IBarcode): Promise<ApiResponse<string>> {
        return execute(() => api.post("/api/v1/barcode-generate/generate", payload));
    }
}

export default new BarcodeService();
