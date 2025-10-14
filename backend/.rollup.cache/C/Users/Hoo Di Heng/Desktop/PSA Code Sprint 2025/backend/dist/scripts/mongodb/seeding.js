import "dotenv/config";
import db from "../../startup/db.js";
import { seedEvents } from "./event.js";
import { seedUsers } from "./user.js";
async function seed() {
    try {
        const conn = await db();
        await seedUsers();
        await seedEvents();
        conn?.close();
        console.log("Database seeded successfully");
    }
    catch (err) {
        console.error("Error during seeding:", err);
    }
}
seed();
//# sourceMappingURL=seeding.js.map