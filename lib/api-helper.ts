import { SuccessResponse, ErrorResponse, ApiResponse } from "@/types/api/axios.types";
import { AxiosResponse } from "axios";

export function toSuccess<T>(res: AxiosResponse): SuccessResponse<T> {
    return {
        isError: false,
        numCode: res.data.numCode,
        message: res.data.message,
        status: res.data.status,
        data: res.data.data,
    };
}

export function toError(error: any): ErrorResponse {
    return {
        isError: true,
        numCode: String(error.response?.status ?? 500),
        message: error.response?.data?.message ?? error.message ?? "Unexpected error",
        status: error.response?.status ?? 500,
    };
}

export async function execute<T>(fn: () => Promise<AxiosResponse>): Promise<ApiResponse<T>> {
    try {
        return toSuccess<T>(await fn());
    } catch (error) {
        return toError(error);
    }
}