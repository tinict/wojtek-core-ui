import { api } from "@/lib/axios";
import { Response } from "@/types/api/axios.types"
import { IReportSubject } from "@/types/models/report-subject.model";

type ReportSubjectPayload = Pick<IReportSubject, "subjectId"> & Partial<Omit<IReportSubject, "subjectId">>

class ReportSubjectService {
    async getSubjects({ typeId }: { typeId?: string }): Promise<Response<IReportSubject[]>> {
        try {
            const url = typeId
                ? `/api/v1/report-types/${typeId}/subjects`
                : `/api/v1/report-subjects`;
            const res = await api.get(url);
            return {
                message: "Success",
                statusCode: 200,
                data: res.data.data,
            }
        } catch (error: any) {
            return {
                success: false,
                data: error.message,
            }
        }
    }

    async createSubject({
        subjectName,
        description,
        active,
        typeId
    }: Omit<IReportSubject, "subjectId">): Promise<Response<IReportSubject>> {
        try {
            const res = await api.post(`/api/v1/report-subjects`, {
                subjectName,
                description,
                active,
                typeId
            })
            return {
                message: "Success",
                statusCode: 200,
                data: res.data,
            }
        } catch (error: any) {
            return {
                success: false,
                data: error.message,
            }
        }
    }

    async updateReportSubject({
        subjectId,
        ...fields
    }: ReportSubjectPayload): Promise<Response<IReportSubject>> {
        try {
            const res = await api.put(`/api/v1/report-subjects/${subjectId}`, fields)
            return {
                message: "Success",
                statusCode: 200,
                data: res.data,
            }
        } catch (error: any) {
            return {
                success: false,
                data: error.message,
            }
        }
    }

    async deleteReportSubject(subjectId: IReportSubject["subjectId"]): Promise<Response<null>> {
        try {
            await api.delete(`/api/v1/report-subjects/${subjectId}`)
            return {
                message: "Success",
                statusCode: 200,
                data: null,
            }
        } catch (error: any) {
            return {
                success: false,
                data: error.message,
            }
        }
    }
}

export default new ReportSubjectService();