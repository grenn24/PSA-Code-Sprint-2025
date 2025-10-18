import "dotenv/config";
import User from "../models/user.js";
import db from "../startup/db.js";
import tf from "@tensorflow/tfjs-node";
import { encodeUser } from "./feature-processing.js";

async function trainLeadershipModel() {
	const conn = await db();
	const users = await User.find().lean();

	console.log(`Fetched ${users.length} users`);

	const X = [];
	const y = [];

	const encodedPromises = users.map(async (user) => {
		const encoded = await encodeUser(user);
		return { encoded, label: Math.random() };
	});

	const results = await Promise.all(encodedPromises);
	for (const result of results) {
		X.push(result.encoded);
		y.push(result.label);
	}

	const inputDim = X[0]?.length;
	console.log("Input dimension:", inputDim);

	const xs = tf.tensor2d(X);
	const ys = tf.tensor2d(y, [y.length, 1]);

	const model = tf.sequential();
	model.add(
		tf.layers.dense({
			inputShape: [inputDim],
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
