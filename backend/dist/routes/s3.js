import express from "express";
import s3Controller from "../controllers/s3.js";
const s3Router = express.Router();
s3Router.post("/upload-url", s3Controller.catchErrors(s3Controller.getUploadURL.bind(s3Controller)));
s3Router.post("/download-url", s3Controller.catchErrors(s3Controller.getDownloadURL.bind(s3Controller)));
s3Router.post("/remove-url", s3Controller.catchErrors(s3Controller.getRemoveURL.bind(s3Controller)));
s3Router.post("/public-url", s3Controller.catchErrors(s3Controller.getPublicURL.bind(s3Controller)));
export default s3Router;
