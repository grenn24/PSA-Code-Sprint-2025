export declare function deserialiseBufferObject(bufferObj: Buffer): ArrayBuffer;
export declare function deserialiseBufferObjectToFile(bufferObj: Buffer, filename: string, mimeType?: string): File;
export declare function arrayBufferToFile(arrayBuffer: ArrayBuffer, filename: string, mimeType?: string): File;
export declare function fileToBuffer(file: File): Promise<Buffer<ArrayBufferLike>>;
export declare const createFileFromUrl: (url: string, slug: string) => Promise<File>;
export declare const createBufferFromUrl: (url: string) => Promise<Buffer>;
export declare const getFileType: (file: File | Buffer) => Promise<{
    mime: string;
    ext: string;
} | undefined>;
