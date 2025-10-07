export declare class HttpError<T = any> {
    errorCode: number;
    status?: string;
    message: string;
    data?: T;
    constructor(message: string, status?: string | undefined, errorCode?: number | undefined, data?: T);
}
export interface WebsocketMessage<T = any> {
    type: string;
    data?: T;
    status?: string;
    timestamp: string;
    [key: string]: any;
}
//# sourceMappingURL=http.d.ts.map