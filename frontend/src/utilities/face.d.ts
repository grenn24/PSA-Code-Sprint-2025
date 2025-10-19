import * as faceapi from "face-api.js";
export declare function startMoodDetection(video: HTMLVideoElement, onDetection: (expression: faceapi.FaceExpressions) => void, skipRef?: React.RefObject<boolean>, intervalMs?: number): Promise<void>;
export declare function stopMoodDetection(stopFunction: () => void): Promise<void>;
