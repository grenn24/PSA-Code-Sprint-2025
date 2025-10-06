import mongoose from "mongoose";
import s3Service from "../utilities/s3.js";
export const s3FileSchema = new mongoose.Schema({
    s3Filename: {
        type: String,
        required: true,
    },
    filename: {
        type: String,
        default: "",
    },
    url: String,
    folder: [String],
    mimeType: String,
    description: {
        type: String,
        default: "",
    },
});
s3FileSchema.post("findOne", async function (s3File) {
    if (s3File) {
        s3File.url = s3Service.getPublicUrl(s3File.s3Filename, s3File.folder);
    }
});
s3FileSchema.post("find", async function (s3Files) {
    if (s3Files && s3Files.length) {
        s3Files.forEach((doc) => {
            doc.url = s3Service.getPublicUrl(doc.s3Filename, doc.folder);
        });
    }
});
