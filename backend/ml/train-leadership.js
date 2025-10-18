import "dotenv/config";
import User from "../models/user.js";
import db from "../startup/db.js";
import tf from "@tensorflow/tfjs-node";
import PCA from "ml-pca";
import { encodeUser } from "./feature-processing.js";

async function trainLeadershipModel() {
	const conn = await db();
	const users = await User.find().lean();

	console.log(`Fetched ${users.length} users`);

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

	// Apply PCA
	const pca = new PCA(X);
	const numComponents = Math.min(50, X[0].length); // or choose based on explained variance
	const X_reduced = pca.predict(X, { nComponents: numComponents }).to2DArray();

	console.log("Reduced input dimension after PCA:", X_reduced[0].length);

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

	await model.fit(xs, ys, {
		epochs: 10,
		batchSize: 8,
		verbose: 1,
	});

	await model.save("file://./ml/leadership-model");
	conn?.close();
	console.log("Model trained and saved to ./ml/leadership-model");
}

trainLeadershipModel();
