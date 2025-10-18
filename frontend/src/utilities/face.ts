import * as faceapi from "face-api.js";

async function loadModels() {
	// path to where your models are stored
	const MODEL_URL = "/models";
	await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
	await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
}

await loadModels();

export function analyseMood(video: HTMLVideoElement) {
	faceapi
		.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
		.withFaceExpressions()
		.then((detections) => {
			if (detections) {
				console.log("facial expressions", detections.expressions);
			}
			return detections;
		});

	requestAnimationFrame(() => analyseMood(video));
}
