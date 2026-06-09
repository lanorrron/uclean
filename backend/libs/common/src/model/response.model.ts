export interface Response<T> {
    success?: boolean;
    data: T;
    error?: string;
    statusCode?: number;
    headers?: Record<string, string>;
}

export interface PagedData<T> {
    items: Array<T>;
    meta: {
        pageSize: number;
        currentPage: number;
        totalPages: number;
        totalItems: number;
    };
}

export interface PagedResponse<T> {
    success?: boolean;
    data: PagedData<T>;
    error?: string;
    statusCode?: number;
    headers?: Record<string, string>;
}