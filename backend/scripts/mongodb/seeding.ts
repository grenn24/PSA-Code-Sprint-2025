import "dotenv/config";
import db from "../../startup/db.js";
import { seedEvents } from "./event.js";
import { seedUsers } from "./user.js";
import { seedChats } from "./chat.js";
import { seedCourses } from "./course.js";
import { seedPositions } from "./position.js";

async function seed() {
	try {
		const conn = await db();
		await seedUsers();
		await seedEvents();
		await seedChats();
		await seedCourses();
		await seedPositions();
		conn?.close();
		console.log("Database seeded successfully");
	} catch (err) {
		console.error("Error during seeding:", err);
	}
}

seed();
