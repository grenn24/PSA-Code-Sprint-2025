import db from "../../startup/db";
import { seedPorts } from "./port";

async function seed() {
	try {
		const conn = await db();
		await seedPorts();
		conn?.close();
		console.log("Database seeded successfully");
	} catch (err) {
		console.error("Error during seeding:", err);
	}
}

seed();
