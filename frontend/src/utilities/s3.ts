import { S3File } from "@common/types/file.js";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import createApiClient, { handleApiRequest } from "../utilities/apiClient";

class S3Service {
	apiClient = createApiClient("/s3");

	async uploadFile(
		file: File | Blob,
		s3Filename: string,
		folder: string[]
	): Promise<S3File> {
		const uploadFile =
			file instanceof File
				? file
				: new File([file], s3Filename, { type: file.type });
		const url = await this.getUploadURL(s3Filename, folder);
		await handleApiRequest(
			axios.put(url, file, {
				headers: {
					"Content-Type": file.type,
				},
			})
		);
		return {
			s3Filename,
			filename: uploadFile.name,
			folder,
			mimeType: file.type,
			url: await this.getPublicURL(s3Filename, folder),
			description: "",
		};
	}

	uploadFiles(
		files: (File | Blob)[],
		s3Filenames: string[],
		folder: string[]
	): Promise<S3File[]> {
		if (files.length !== s3Filenames.length) {
			throw new Error(
				"Files and s3 filenames must have the same length."
			);
		}
		const responses = files.map((file, index) =>
			this.uploadFile(file, s3Filenames[index], folder)
		);
		return Promise.all(responses);
	}

	// Hash filename
	uploadFileWithHashing(
		file: File | Blob,
		folder: string[]
	): Promise<S3File> {
		const extension =
			file instanceof File ? file.name.split(".").pop() : undefined;
		const filename = extension ? `${uuidv4()}.${extension}` : uuidv4();
		return this.uploadFile(file, filename, folder);
	}

	// Hash all the filenames
	uploadFilesWithHashing(
		files: (File | Blob)[],
		folder: string[]
	): Promise<S3File[]> {
		const s3Files = files.map((file) =>
			this.uploadFileWithHashing(file, folder)
		);
		return Promise.all(s3Files);
	}

	async downloadFile(s3File: S3File) {
		const url = await this.getDownloadURL(s3File, "attachment");
		const a = document.createElement("a");
		a.href = url;
		a.download = s3File.filename;
		a.style.display = "none";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}

	async openS3File(
		s3File: S3File,
		target: "_blank" | "_self" = "_blank" // new tab by default
	) {
		const url = await s3Service.getDownloadURL(s3File);
		window.open(url, target);
	}

	async removeFile(s3File: S3File) {
		const url = await this.getRemoveURL(s3File.s3Filename, s3File.folder);
		const response = await axios.delete(url);
		return response;
	}

	async getUploadURL(s3Filename: string, folders: string[]) {
		const { data } = await this.apiClient.post<object, any>(`/upload-url`, {
			s3Filename,
			folders,
		});
		return data.url;
	}

	async getDownloadURL(
		s3File: S3File,
		contentDisposition: "inline" | "attachment" = "inline"
	) {
		const { data } = await this.apiClient.post<object, any>(
			`/download-url`,
			{
				s3Filename: s3File.s3Filename,
				folders: s3File.folder,
				contentDisposition:
					contentDisposition === "inline"
						? contentDisposition
						: `${contentDisposition}; filename="${s3File.filename}"`,
			}
		);
		return data.url;
	}

	async getRemoveURL(s3Filename: string, folders: string[]) {
		const { data } = await this.apiClient.post<object, any>(`/remove-url`, {
			s3Filename,
			folders,
		});
		return data.url;
	}

	async getPublicURL(s3Filename: string, folders: string[]) {
		const { data } = await this.apiClient.post<object, any>(`/public-url`, {
			s3Filename,
			folders,
		});
		return data.url;
	}
}

const s3Service = new S3Service();
export default s3Service;
