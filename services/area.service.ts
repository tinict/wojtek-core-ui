import { apiTest } from "@/lib/axios";
import { Response } from "@/types/api/axios.types"
import { IArea, IAreaTree } from "@/types/models/area.model";

type UpdateAreaPayload = Pick<IArea, "areaId"> & Partial<Omit<IArea, "areaId">>

class AreaService {
    async getAreas(): Promise<Response<IAreaTree[]>> {
        try {
            const res = await apiTest.get("/api/areas/tree");

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

    async createArea({
        areaName,
        areaNameE,
        areaNameL,
        areaTypeRcd,
        activeFlag,
        parentAreaId,
        shortCode
    }: Omit<IArea, "areaId">): Promise<Response<IArea>> {
        try {
            const res = await apiTest.post(`/api/areas`, {
                areaName,
                areaNameE,
                areaNameL,
                areaTypeRcd,
                activeFlag,
                parentAreaId,
                shortCode
            });

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

    async updateArea({
        areaId,
        ...fields
    }: UpdateAreaPayload): Promise<Response<IArea>> {
        try {
            const res = await apiTest.post(`/api/areas/${areaId}`, fields);

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

}

export default new AreaService();