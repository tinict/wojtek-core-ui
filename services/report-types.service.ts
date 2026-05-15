import { api } from "@/lib/axios";
import { Response } from "@/types/api/axios.types"
import { IReportType } from "@/types/models/report-type.model";

type UpdateReportTypePayload = Pick<IReportType, "typeId"> & Partial<Omit<IReportType, "typeId">>

class ReportTypeService {
    async getReportTypes(): Promise<Response<IReportType[]>> {
        try {
            const res = await api.get("/api/v1/report-types");

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

    async createReportType({
        typeName,
        description,
        active,
    }: Omit<IReportType, "typeId">): Promise<Response<IReportType>> {
        try {
            const res = await api.post(`/api/v1/report-types`, {
                typeName,
                description,
                active
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

    async updateReportType({
        typeId,
        ...fields
    }: UpdateReportTypePayload): Promise<Response<IReportType>> {
        try {
            const res = await api.put(`/api/v1/report-types/${typeId}`, fields)

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

    async deleteReportType(typeId: IReportType["typeId"]): Promise<Response<null>> {
        try {
            await api.delete(`/api/v1/report-types/${typeId}`)

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

export default new ReportTypeService();