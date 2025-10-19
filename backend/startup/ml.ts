import { Express } from "express";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import s3Service from "../utilities/s3";

const ml = async (app: Express) => {
	if (app.get("env") === "development") return;

	const filePath = "./backend/ml/pca.json";

	if (!fs.existsSync(filePath)) {
		const dir = path.dirname(filePath);
		if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

		try {
			const downloadURL = s3Service.getPublicUrl("pca.json", ["ml"]);
			const res = await fetch(downloadURL);
			if (!res.ok)
				throw new Error(
					`Failed to download pca.json: ${res.statusText}`
				);
			const data = await res.arrayBuffer();
			fs.writeFileSync(filePath, Buffer.from(data));
			console.log("Downloaded pca.json successfully.");
		} catch (err) {
			console.error("Error downloading pca.json:", err);
			throw err;
		}
	}
};

export default ml;
