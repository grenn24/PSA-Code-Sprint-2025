import { isFile } from "@common/types/file.js";

const { fileTypeFromBuffer, fileTypeFromStream, fileTypeFromFile } =
	await import("file-type");

// Deserialise a buffer object into array buffer
export function deserialiseBufferObject(bufferObj: Buffer): ArrayBuffer {
	return new Uint8Array(bufferObj).buffer;
}

export function deserialiseBufferObjectToFile(
	bufferObj: Buffer,
	filename: string,
	mimeType: string = "image/jpeg"
): File {
	const arrayBuffer = deserialiseBufferObject(bufferObj);
	return new File([arrayBuffer], filename, { type: mimeType });
}

export function arrayBufferToFile(
	arrayBuffer: ArrayBuffer,
	filename: string,
	mimeType: string = "image/jpeg"
) {
	return new File([arrayBuffer], filename, { type: mimeType });
}

export async function fileToBuffer(file: File) {
	return Buffer.from(await file.arrayBuffer());
}

export const createFileFromUrl = async (url: string, slug: string) => {
	const response = await fetch(url);
	const blob = await response.blob();
	return new File([blob], `${slug}.jpg`, { type: blob.type });
};

export const createBufferFromUrl = async (url: string): Promise<Buffer> => {
	const response = await fetch(url);
	const blob = await response.blob();
	return Buffer.from(await blob.arrayBuffer());
};

export const getFileType = async (
	file: File | Buffer
): Promise<
	| {
			mime: string;
			ext: string;
	  }
	| undefined
> => {
	if (file instanceof File) {
		return await fileTypeFromStream(file.stream());
	} else {
		return await fileTypeFromBuffer(file);
	}
};
