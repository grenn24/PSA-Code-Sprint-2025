import * as tf from "@tensorflow/tfjs-node";
import { encodeUser } from "./feature-processing.js";
import { PCA } from "ml-pca";
import pcaData from "./pca.json";

async function loadModel() {
	const model = await tf.loadLayersModel(
		"file://./ml/leadership-model/model.json"
	);
	return model;
}

export async function predictLeadershipPotential(user: any) {
	const model = await loadModel();
	const X = await encodeUser(user);

	const pca = PCA.load(pcaData as any);
	const X_reduced = pca.predict([X], { nComponents: 85 }).to1DArray();

	const inputTensor = tf.tensor2d([X_reduced]);
	const prediction = model.predict(inputTensor) as tf.Tensor;

	const score = (await prediction.data())?.[0];

	return score;
}
