import * as faceapi from "face-api.js";

async function loadModels() {
	// path to where your models are stored
	const MODEL_URL = "/models";
	await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
	await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
}

export async function analyseMood(video: HTMLVideoElement) {
    await loadModels();
	async function loop() {
		const detections = await faceapi
			.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
			.withFaceExpressions();
        console.log("looping")
		if (detections) {
			console.log("facial expressions", detections.expressions);
		}

		requestAnimationFrame(loop);
	}

	loop();
}