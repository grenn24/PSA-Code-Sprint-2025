import * as tf from "@tensorflow/tfjs-node";
import { encodeUser } from "./feature-processing.js";
async function loadModel() {
    const model = await tf.loadLayersModel("file://./ml/leadership-model/model.json");
    return model;
}
export async function predictLeadershipPotential(user) {
    const model = await loadModel();
    const features = await encodeUser(user);
    const inputTensor = tf.tensor2d([features]);
    const prediction = model.predict(inputTensor);
    const score = (await prediction.data())?.[0];
    return score;
}
//# sourceMappingURL=predict-leadership.js.map