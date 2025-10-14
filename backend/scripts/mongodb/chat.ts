import User from "../../models/user.js";
import Chat from "../../models/chat.js";

async function generateChats() {
	try {
		const gren = await User.findOne({ email: "gren@gmail.com" });
		const user = await User.findOne({ email: { $ne: "gren@gmail.com" } });
		if (!gren || !user) {
			console.error("No users found in DB. Create some users first.");
			return;
		}
		const chat = { participants: [gren._id, user._id] };
		return [chat];
	} catch (err) {
		console.error(err);
	}
}
export async function seedChats() {
	try {
		await Chat.insertMany(await generateChats());
		console.log("Chats seeded successfully");
	} catch (err) {
		console.error("Error inserting chats:", err);
	}
}
