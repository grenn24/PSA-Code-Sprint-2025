import "dotenv/config";
import User from "../models/user.js";
import db from "../startup/db.js";
import tf from "@tensorflow/tfjs-node";
import { PCA } from "ml-pca";
import { encodeUser } from "./feature-processing.js";
import fs from "fs"

const EPS = 1e-8;
async function trainLeadershipModel() {
	const conn = await db();
	const users = await User.find().lean();

	const X = [];
	const y = [];

	const encodedPromises = users.map(async (user) => {
		const encoded = await encodeUser(user);
		return { encoded, label: Math.random() }; // replace with actual labels
	});

	const results = await Promise.all(encodedPromises);
	for (const result of results) {
		X.push(result.encoded);
		y.push(result.label);
	}

	console.log("Original input dimension:", X[0]?.length);


	for (let j = 0; j < X[0].length; j++) {
		let allSame = true;
		const first = X[0][j];
		for (let i = 1; i < X.length; i++) {
			if (X[i][j] !== first) {
				allSame = false;
				break;
			}
		}
		if (allSame) {
			for (let i = 0; i < X.length; i++) {
				X[i][j] = first + EPS;
			}
		}
	}

	// Apply PCA
	const pca = new PCA(X, { center: true, scale: true });
	const explained = pca.getExplainedVariance();

	let cumulative = 0;
	let numComponents = 0;
	for (let i = 0; i < explained.length; i++) {
		cumulative += explained[i];
		if (cumulative >= 0.95) { // keep 95% of variance
			numComponents = i + 1;
			break;
		}
	}
	console.log(`cumulative: ${cumulative}\nnumComponents: ${numComponents}`);
	const X_reduced = pca.predict(X, { nComponents: numComponents }).to2DArray();

	console.log("Reduced input dimension:", X_reduced[0].length);

	const pcaJSON = pca.toJSON();
	fs.writeFileSync('./ml/pca.json', JSON.stringify(pcaJSON));

	const xs = tf.tensor2d(X_reduced);
	const ys = tf.tensor2d(y, [y.length, 1]);

	const model = tf.sequential();
	model.add(
		tf.layers.dense({
			inputShape: [X_reduced[0].length],
			units: 128,
			activation: "relu",
		})
	);
	model.add(tf.layers.dropout({ rate: 0.3 }));
	model.add(tf.layers.dense({ units: 64, activation: "relu" }));
	model.add(tf.layers.dense({ units: 1, activation: "sigmoid" }));

	model.compile({
		optimizer: tf.train.adam(0.001),
		loss: "meanSquaredError",
	});

	const earlyStopping = tf.callbacks.earlyStopping({
		monitor: "loss",
		minDelta: 0.001,       // minimum change in loss to qualify as improvement
		patience: 5,           // stop after 5 epochs without improvement
	});

	await model.fit(xs, ys, {
		epochs: 50,           // max epochs
		batchSize: 8,
		verbose: 1,
		callbacks: [earlyStopping],
	});

	await model.save("file://./ml/leadership-model");
	conn?.close();
	console.log("Model trained and saved to ./ml/leadership-model");
}

trainLeadershipModel();
