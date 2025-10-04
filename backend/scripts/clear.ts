import db from "../startup/db.js";

async function clear() {
	try {
		const conn = await db();
		await conn?.dropDatabase();
		conn?.close();
		console.log("Database cleared successfully");
	} catch (err) {
		console.error("Error during clearing:", err);
	}
}

clear();
