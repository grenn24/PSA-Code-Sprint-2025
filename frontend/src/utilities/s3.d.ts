import { S3File } from "@common/types/file.js";
declare class S3Service {
    apiClient: import("../utilities/apiClient").ApiClient;
    uploadFile(file: File | Blob, s3Filename: string, folder: string[]): Promise<S3File>;
    uploadFiles(files: (File | Blob)[], s3Filenames: string[], folder: string[]): Promise<S3File[]>;
    uploadFileWithHashing(file: File | Blob, folder: string[]): Promise<S3File>;
    uploadFilesWithHashing(files: (File | Blob)[], folder: string[]): Promise<S3File[]>;
    downloadFile(s3File: S3File): Promise<void>;
    openS3File(s3File: S3File, target?: "_blank" | "_self"): Promise<void>;
    removeFile(s3File: S3File): Promise<import("axios").AxiosResponse<any, any>>;
    getUploadURL(s3Filename: string, folders: string[]): Promise<any>;
    getDownloadURL(s3File: S3File, contentDisposition?: "inline" | "attachment"): Promise<any>;
    getRemoveURL(s3Filename: string, folders: string[]): Promise<any>;
    getPublicURL(s3Filename: string, folders: string[]): Promise<any>;
}
declare const s3Service: S3Service;
export default s3Service;
