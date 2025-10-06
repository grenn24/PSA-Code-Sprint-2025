export interface S3File {
	s3Filename: string;
	filename: string;
	folder: string[];
	mimeType?: string | null;
	url?: string | null;
	description: string;
}

// Node Buffer objects get serialised by JSON into array buffer objects
export interface ArrayBufferObject {
	type: "Buffer";
	data: number[];
}

export const isS3File = (file: any): file is S3File => {
	return (
		file &&
		typeof file === "object" &&
		"s3Filename" in file &&
		"filename" in file &&
		Array.isArray(file.folder)
	);
};

export const isFile = (file: any): file is File => {
	return file && typeof file === "object" && file instanceof File;
};

export const isPromise = (value: any): value is Promise<any> => {
	return (
		typeof value === "object" &&
		value !== null &&
		typeof value.then === "function"
	);
};

export const isArrayBufferObject = (value: any): value is ArrayBufferObject => {
	return (
		value !== null &&
		typeof value === "object" &&
		value.type === "Buffer" &&
		Array.isArray(value.data) &&
		value.data.every((item: number) => typeof item === "number")
	);
};
