export default function error(err: any, request: any, response: any, next: any): any;
export declare class HttpError<T = any> {
    errorCode: number;
    status?: string;
    message: string;
    data?: T;
    constructor(message: string, status?: string | undefined, errorCode?: number | undefined, data?: T);
}
