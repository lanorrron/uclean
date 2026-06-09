// types/api.types.ts
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

export interface HttpResponse<T = any> {
  body: ApiResponse<T>;
  statusCode: number;
  headers: Record<string, any>;
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
