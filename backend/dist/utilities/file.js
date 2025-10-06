const { fileTypeFromBuffer, fileTypeFromStream, fileTypeFromFile } = await import("file-type");
// Deserialise a buffer object into array buffer
export function deserialiseBufferObject(bufferObj) {
    return new Uint8Array(bufferObj).buffer;
}
export function deserialiseBufferObjectToFile(bufferObj, filename, mimeType = "image/jpeg") {
    const arrayBuffer = deserialiseBufferObject(bufferObj);
    return new File([arrayBuffer], filename, { type: mimeType });
}
export function arrayBufferToFile(arrayBuffer, filename, mimeType = "image/jpeg") {
    return new File([arrayBuffer], filename, { type: mimeType });
}
export async function fileToBuffer(file) {
    return Buffer.from(await file.arrayBuffer());
}
export const createFileFromUrl = async (url, slug) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], `${slug}.jpg`, { type: blob.type });
};
export const createBufferFromUrl = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return Buffer.from(await blob.arrayBuffer());
};
export const getFileType = async (file) => {
    if (file instanceof File) {
        return await fileTypeFromStream(file.stream());
    }
    else {
        return await fileTypeFromBuffer(file);
    }
};
