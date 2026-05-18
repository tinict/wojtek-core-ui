import { apiTest } from "@/lib/axios";
import { ApiResponse } from "@/types/api/axios.types";
import { IArea, IAreaTree } from "@/types/models/area.model";
import { execute } from "@/lib/api-helper";

type UpdateAreaPayload = Pick<IArea, "areaId"> & Partial<Omit<IArea, "areaId">>;

class AreaService {
    getAreas(): Promise<ApiResponse<IAreaTree[]>> {
        return execute(() => apiTest.get("/api/areas/tree"));
    }

    createArea(payload: Omit<IArea, "areaId">): Promise<ApiResponse<IArea>> {
        return execute(() => apiTest.post("/api/areas", payload));
    }

    updateArea({ areaId, ...fields }: UpdateAreaPayload): Promise<ApiResponse<IArea>> {
        return execute(() => apiTest.put(`/api/areas/${areaId}`, fields));
    }
}

export default new AreaService();
