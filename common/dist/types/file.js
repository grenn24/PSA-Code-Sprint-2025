"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArrayBufferObject = exports.isPromise = exports.isFile = exports.isS3File = void 0;
const isS3File = (file) => {
    return (file &&
        typeof file === "object" &&
        "s3Filename" in file &&
        "filename" in file &&
        Array.isArray(file.folder));
};
exports.isS3File = isS3File;
const isFile = (file) => {
    return file && typeof file === "object" && file instanceof File;
};
exports.isFile = isFile;
const isPromise = (value) => {
    return (typeof value === "object" &&
        value !== null &&
        typeof value.then === "function");
};
exports.isPromise = isPromise;
const isArrayBufferObject = (value) => {
    return (value !== null &&
        typeof value === "object" &&
        value.type === "Buffer" &&
        Array.isArray(value.data) &&
        value.data.every((item) => typeof item === "number"));
};
exports.isArrayBufferObject = isArrayBufferObject;
