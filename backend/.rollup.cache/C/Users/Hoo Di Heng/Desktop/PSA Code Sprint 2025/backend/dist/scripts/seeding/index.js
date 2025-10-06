import db from "../../startup/db.js";
import { seedUsers } from "./user.js";
import "dotenv/config";
async function seed() {
    try {
        const conn = await db();
        await seedUsers();
        conn?.close();
        console.log("Database seeded successfully");
    }
    catch (err) {
        console.error("Error during seeding:", err);
    }
}
seed();
//# sourceMappingURL=index.js.map