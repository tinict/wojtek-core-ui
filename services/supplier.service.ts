import { api } from "@/lib/axios";
import { ApiResponse, PageApiResponse } from "@/types/api/axios.types";
import { ISupplier } from "@/types/models/supplier.model";
import { execute } from "@/lib/api-helper";

type UpdateSupplierPayload = Pick<ISupplier, "supplierId"> & Partial<Omit<ISupplier, "supplierId">>;

export interface GetSuppliersParams {
    supplierName?: string;
    activeFlag?: number;
    page?: number;
    size?: number;
    sortBy?: string;
    sortDir?: "asc" | "desc";
};

class SupplierService {
    getSuppliers(params?: GetSuppliersParams): Promise<PageApiResponse<ISupplier>> {
        return execute(() => api.get("/api/v1/suppliers", { params }));
    }

    getSupplierById(supplierId: ISupplier["supplierId"]): Promise<ApiResponse<ISupplier>> {
        return execute(() => api.get(`/api/v1/suppliers/${supplierId}`));
    }

    createSupplier(payload: Omit<ISupplier, "supplierId">): Promise<ApiResponse<ISupplier>> {
        return execute(() => api.post("/api/v1/suppliers", payload));
    }

    updateSupplier(payload: UpdateSupplierPayload): Promise<ApiResponse<ISupplier>> {
        return execute(() => api.put("/api/v1/suppliers", payload));
    }

    toggleSupplier(supplierId: ISupplier["supplierId"]): Promise<ApiResponse<ISupplier>> {
        return execute(() => api.patch(`/api/v1/suppliers/${supplierId}/toggle`));
    }

    deleteSupplier(supplierId: ISupplier["supplierId"]): Promise<ApiResponse<null>> {
        return execute(() => api.delete(`/api/v1/suppliers/${supplierId}`));
    }
}

export default new SupplierService();
