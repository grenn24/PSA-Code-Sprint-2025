import { S3File } from "@common/types/file.js";
declare class S3Service {
    getPublicUrl(s3Filename: string, folders: string[]): string;
    uploadFile(file: File | Buffer, s3Filename: string, folder: string[], description?: string): Promise<S3File>;
    uploadFileWithHashing(file: File | Buffer, folder: string[]): Promise<S3File>;
    uploadFiles(files: (File | Buffer)[], s3Filenames: string[], folder: string[]): Promise<S3File[]>;
    uploadFilesWithHashing(files: (File | Buffer)[], folder: string[]): Promise<S3File[]>;
    generatePresignedUrl(s3Filename: string, folder: string[], type: "GET" | "PUT" | "DELETE" | "METADATA", contentDisposition?: "inline" | "attachment" | string, expiresIn?: number): Promise<string>;
    removeFile(s3File: S3File): Promise<import("axios").AxiosResponse<any, any, {}>>;
    removeFiles(s3Files: S3File[]): Promise<import("@aws-sdk/client-s3").DeleteObjectsCommandOutput | undefined>;
}
declare const s3Service: S3Service;
export default s3Service;
