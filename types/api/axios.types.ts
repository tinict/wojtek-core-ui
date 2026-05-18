export interface PageMeta {
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
    size: number;
    number: number;
    numberOfElements: number;
    empty: boolean;
}

export interface PageResponse<T> extends PageMeta {
    content: T[];
    pageable: {
        pageNumber: number;
        pageSize: number;
        offset: number;
        paged: boolean;
        unpaged: boolean;
        sort: {
            empty: boolean;
            sorted: boolean;
            unsorted: boolean;
        };
    };
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
}

export interface SuccessResponse<T> {
    isError: false;
    numCode: string;
    message: string;
    status: number;
    data: T;
}

export interface ErrorResponse {
    isError: true;
    numCode: string;
    message: string;
    status: number;
    data?: string;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
export type PageApiResponse<T> = ApiResponse<PageResponse<T>>;
