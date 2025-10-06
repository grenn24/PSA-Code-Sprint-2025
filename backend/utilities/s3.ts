import fs from "fs";
import path from "path";
import { Readable } from "stream";
import { fileURLToPath } from "url";
import {
	DeleteObjectCommand,
	DeleteObjectsCommand,
	GetObjectCommand,
	HeadObjectCommand,
	PutObjectCommand,
	S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3File } from "@common/types/file.js";
import axios from "axios";
import config from "config";
import { v4 as uuidv4 } from "uuid";
import { getFileType } from "./file.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const s3Client = new S3Client({
	region: "auto",
	endpoint: config.get("S3_URL"),
	credentials: {
		accessKeyId: config.get("S3_ACCESS_KEY_ID"),
		secretAccessKey: config.get("S3_SECRET_ACCESS_KEY"),
	},
});

class S3Service {
	getPublicUrl(s3Filename: string, folders: string[]) {
		return `${config.get<string>("S3_PUBLIC_URL")}/${folders.join(
			"/"
		)}/${s3Filename}`;
	}

	async uploadFile(
		file: File | Buffer,
		s3Filename: string,
		folder: string[],
		description: string = ""
	): Promise<S3File> {
		let buffer: Buffer;
		let fileName: string = "";

		const fileType = await getFileType(file);

		if (Buffer.isBuffer(file)) {
			buffer = file;
		} else if (file instanceof File) {
			buffer = Buffer.from(await file.arrayBuffer());
			fileName = file.name;
		} else {
			throw new Error("Unsupported file type");
		}

		if (!fileName.includes(".")) {
			fileName = fileType?.ext
				? `${fileName}.${fileType?.ext}`
				: fileName;
		}

		const tempPath = path.join(__dirname, "../temp", s3Filename);
		// create directory for file if it doesnt exist
		await fs.promises.mkdir(path.dirname(tempPath), { recursive: true });
		// write buffer to file
		await fs.promises.writeFile(tempPath, buffer);
		// create stream from file path
		const fileStream = Readable.from(buffer);

		const params = {
			Bucket: config.get<string>("S3_BUCKET"),
			Key: [...folder, s3Filename].join("/"),
			Body: fileStream,
			ContentType: fileType?.mime,
			ContentLength: buffer.length,
		};

		const command = new PutObjectCommand(params);
		await s3Client.send(command);

		await fs.promises.unlink(tempPath);
		return {
			filename: fileName,
			s3Filename,
			folder,
			mimeType: fileType?.mime,
			url: this.getPublicUrl(s3Filename, folder),
			description,
		};
	}

	// Randomly generate s3 filename
	async uploadFileWithHashing(
		file: File | Buffer,
		folder: string[]
	): Promise<S3File> {
		const fileType = await getFileType(file);
		const extension = fileType?.ext ? `.${fileType.ext}` : undefined;
		const s3Filename = extension ? `${uuidv4()}${extension}` : uuidv4();
		return this.uploadFile(file, s3Filename, folder);
	}

	async uploadFiles(
		files: (File | Buffer)[],
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

	async uploadFilesWithHashing(
		files: (File | Buffer)[],
		folder: string[]
	): Promise<S3File[]> {
		const s3Files = files.map((file) =>
			this.uploadFileWithHashing(file, folder)
		);
		return Promise.all(s3Files);
	}

	async generatePresignedUrl(
		s3Filename: string,
		folder: string[],
		type: "GET" | "PUT" | "DELETE" | "METADATA",
		contentDisposition: "inline" | "attachment" | string = "inline",
		expiresIn = 1800
	) {
		folder.push(s3Filename);
		let command;
		switch (type) {
			case "GET":
				command = new GetObjectCommand({
					Bucket: config.get<string>("S3_BUCKET"),
					Key: folder.join("/"),
					ResponseContentDisposition: contentDisposition,
				});
				break;
			case "PUT":
				command = new PutObjectCommand({
					Bucket: config.get<string>("S3_BUCKET"),
					Key: folder.join("/"),
				});
				break;
			case "DELETE":
				command = new DeleteObjectCommand({
					Bucket: config.get<string>("S3_BUCKET"),
					Key: folder.join("/"),
				});
				break;
			default:
				command = new HeadObjectCommand({
					Bucket: config.get<string>("S3_BUCKET"),
					Key: folder.join("/"),
				});
				break;
		}
		const signedUrl = await getSignedUrl(s3Client, command, { expiresIn });
		return signedUrl;
	}

	async removeFile(s3File: S3File) {
		const deleteUrl = await this.generatePresignedUrl(
			s3File.s3Filename,
			s3File.folder,
			"DELETE"
		);
		const response = await axios.delete(deleteUrl);
		return response;
	}

	async removeFiles(s3Files: S3File[]) {
		if (s3Files.length === 0) return;

		const objectsToDelete = s3Files.map((s3File) => {
			const prefix = s3File.folder.join("/");
			return {
				Key: prefix
					? `${prefix}/${s3File.s3Filename}`
					: s3File.s3Filename,
			};
		});

		const params = {
			Bucket: config.get<string>("S3_BUCKET"),
			Delete: {
				Objects: objectsToDelete,
				Quiet: false, // optional
			},
		};

		const response = await s3Client.send(new DeleteObjectsCommand(params));
		return response;
	}
}

const s3Service = new S3Service();

export default s3Service;
