import { api } from "@/lib/axios";
import { PageApiResponse } from "@/types/api/axios.types";
import { execute } from "@/lib/api-helper";
import { IReport } from "@/types/models/report.model";

export interface GetReportParams {
    active?: boolean;
    offset?: number;
    pageNumber?: number;
    paged?: boolean;
};

class ReportService {
    getReports(params?: GetReportParams): Promise<PageApiResponse<IReport>> {
        return execute(() => api.get("/api/v1/admin/reports", { params }));
    }
}

export default new ReportService();
