export interface S3File {
    s3Filename: string;
    filename: string;
    folder: string[];
    mimeType?: string | null;
    url?: string | null;
    description: string;
}
export interface ArrayBufferObject {
    type: "Buffer";
    data: number[];
}
export declare const isS3File: (file: any) => file is S3File;
export declare const isFile: (file: any) => file is File;
export declare const isPromise: (value: any) => value is Promise<any>;
export declare const isArrayBufferObject: (value: any) => value is ArrayBufferObject;
//# sourceMappingURL=file.d.ts.map