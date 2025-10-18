import * as faceapi from "face-api.js";

export interface Expression {
	neutral: number;
	happy: number;
	sad: number;
	angry: number;
	fearful: number;
}

async function loadModels() {
	// path to where your models are stored
	const MODEL_URL = "/models";
	await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
	await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
}

export async function startMoodDetection(
	video: HTMLVideoElement,
	onDetection: (expression: Expression) => void
) {
	await loadModels();
	let isRunning = true;
	async function loop() {
		if (!isRunning) return;
		console.log("looping");
		faceapi
			.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
			.withFaceExpressions()
			.then((detections) => {
				if (detections) {
					console.log(detections.expressions);
					onDetection(detections.expressions);
				}
				return detections;
			})
			.catch((err) => console.error("Detection error:", err));

		requestAnimationFrame(loop);
	}

	loop();


}

export async function stopMoodDetection(stopFunction: () => void) {
	stopFunction();
}
