import User from "../../models/user.js";
import Chat from "../../models/chat.js";

export async function generateChats(email: string, limit = 3) {
	try {
		const mentee = await User.findOne({ email });
		const mentors = await User.find({ email: { $ne: email } }).limit(limit);
		if (!mentee || mentors.length === 0) {
			console.error("No users found in DB. Create some users first.");
			return;
		}
		const chats: any = [];
		for (const mentor of mentors) {
			mentor.mentees = [...mentor.mentees, mentee._id];
			await mentor.save();
			const chat = { participants: [mentee._id, mentor._id] };
			chats.push(chat);
		}
		return chats;
	} catch (err) {
		console.error(err);
	}
}
export async function seedChats() {
	try {
		await Chat.insertMany(await generateChats("gren@gmail.com"));
		console.log("Chats seeded successfully");
	} catch (err) {
		console.error("Error inserting chats:", err);
	}
}
