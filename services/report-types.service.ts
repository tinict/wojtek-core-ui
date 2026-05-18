import { api } from "@/lib/axios";
import { ApiResponse, PageApiResponse } from "@/types/api/axios.types";
import { IReportType } from "@/types/models/report-type.model";
import { execute } from "@/lib/api-helper";

type UpdateReportTypePayload = Pick<IReportType, "typeId"> & Partial<Omit<IReportType, "typeId">>;

export interface GetReportTypesParams {
    typeName?: string;
    active?: boolean;
    page?: number;
    size?: number;
    sortBy?: string;
    sortDir?: "asc" | "desc";
};

class ReportTypeService {
    getReportTypes(params?: GetReportTypesParams): Promise<PageApiResponse<IReportType>> {
        return execute(() => api.get("/api/v1/report-types", { params }));
    }

    getReportTypeById(typeId: IReportType["typeId"]): Promise<ApiResponse<IReportType>> {
        return execute(() => api.get(`/api/v1/report-types/${typeId}`));
    }

    createReportType(payload: Omit<IReportType, "typeId">): Promise<ApiResponse<IReportType>> {
        return execute(() => api.post("/api/v1/report-types", payload));
    }

    updateReportType({ typeId, ...fields }: UpdateReportTypePayload): Promise<ApiResponse<IReportType>> {
        return execute(() => api.put(`/api/v1/report-types/${typeId}`, fields));
    }

    toggleReportType(typeId: IReportType["typeId"]): Promise<ApiResponse<IReportType>> {
        return execute(() => api.patch(`/api/v1/report-types/${typeId}/toggle`));
    }

    deleteReportType(typeId: IReportType["typeId"]): Promise<ApiResponse<null>> {
        return execute(() => api.delete(`/api/v1/report-types/${typeId}`));
    }
}

export default new ReportTypeService();
