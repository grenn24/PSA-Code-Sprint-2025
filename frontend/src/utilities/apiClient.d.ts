import { AxiosRequestConfig, AxiosResponse } from "axios";
export declare class ApiClient {
    private client;
    private baseUrlClient;
    constructor(baseURL: string, requestConfigInterceptor?: (config: AxiosRequestConfig) => void, responseErrorInterceptor?: (status: number, body: object) => void);
    get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    post<T, R>(url: string, data: T, config?: AxiosRequestConfig): Promise<AxiosResponse<R>>;
    put<T, R>(url: string, data: T, config?: AxiosRequestConfig): Promise<AxiosResponse<R>>;
    patch<T, R>(url: string, data: T, config?: AxiosRequestConfig): Promise<AxiosResponse<R>>;
    delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
}
declare const createApiClient: (parentPath: string, requestConfigInterceptor?: (config: AxiosRequestConfig) => void, responseErrorInterceptor?: (status: number, body: object) => void) => ApiClient;
export default createApiClient;
export declare const handleApiRequest: <T>(request: Promise<AxiosResponse<T>>, errorHandler?: (status: number, body: any) => void, shouldShowErrorSnackbar?: boolean | ((status: number, body: any) => boolean)) => Promise<{
    isSuccess: boolean;
    data?: T;
    body?: T;
    status?: number;
}>;
