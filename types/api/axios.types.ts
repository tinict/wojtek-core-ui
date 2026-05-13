export interface SuccessResponse<T> {
    message: string;
    statusCode: number;
    data?: T;
    total?: number;
    page?: number;
    pageSize?: number;
    totalPages?: number;
};

export type ErrorResponse = {
    success: false
    data: string
};

export type Response<T> = SuccessResponse<T> | ErrorResponse;
