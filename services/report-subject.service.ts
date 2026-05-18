import { api } from "@/lib/axios";
import { ApiResponse, PageApiResponse } from "@/types/api/axios.types";
import { IReportSubject } from "@/types/models/report-subject.model";
import { execute } from "@/lib/api-helper";

type UpdateReportSubjectPayload = Pick<IReportSubject, "subjectId"> &
    Partial<Omit<IReportSubject, "subjectId">>;

export interface GetReportSubjectsParams {
    typeId?: string;
    subjectName?: string;
    active?: boolean;
    page?: number;
    size?: number;
    sortBy?: string;
    sortDir?: "asc" | "desc";
}

class ReportSubjectService {
    getSubjects(params?: GetReportSubjectsParams): Promise<PageApiResponse<IReportSubject>> {
        return execute(() => api.get("/api/v1/report-subjects", { params }));
    }

    getSubjectById(subjectId: IReportSubject["subjectId"]): Promise<ApiResponse<IReportSubject>> {
        return execute(() => api.get(`/api/v1/report-subjects/${subjectId}`));
    }

    createSubject(payload: Omit<IReportSubject, "subjectId">): Promise<ApiResponse<IReportSubject>> {
        return execute(() => api.post("/api/v1/report-subjects", payload));
    }

    updateReportSubject({ subjectId, ...fields }: UpdateReportSubjectPayload): Promise<ApiResponse<IReportSubject>> {
        return execute(() => api.put(`/api/v1/report-subjects/${subjectId}`, fields));
    }

    toggleReportSubject(subjectId: IReportSubject["subjectId"]): Promise<ApiResponse<IReportSubject>> {
        return execute(() => api.patch(`/api/v1/report-subjects/${subjectId}/toggle`));
    }

    deleteReportSubject(subjectId: IReportSubject["subjectId"]): Promise<ApiResponse<null>> {
        return execute(() => api.delete(`/api/v1/report-subjects/${subjectId}`));
    }
}

export default new ReportSubjectService();
