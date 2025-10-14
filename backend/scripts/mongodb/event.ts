import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import User from "../../models/user.js";
import Event from "../../models/event.js";

const CATEGORIES = [
	"Workshop",
	"Wellness",
	"Tech",
	"Training",
	"Talk",
	"Networking",
	"Meeting",
	"Yoga",
	"Brunch",
	"Conference",
];
async function generateEvents(n: number) {
	try {
		const users = await User.find();
		if (!users.length) {
			console.error("No users found in DB. Create some users first.");
			return;
		}

		const events: any[] = [];

		for (let i = 0; i < n; i++) {
			const isPast = Math.random() < 0.5;

			const baseDate = isPast
				? faker.date.recent({ days: 30 })
				: faker.date.soon({ days: 30 });

			const start = dayjs(baseDate).toDate();
			const end = dayjs(start)
				.add(faker.number.int({ min: 1, max: 4 }), "hour")
				.toDate();

			const creator = faker.helpers.arrayElement(users);
			const participants = faker.helpers.arrayElements(
				users,
				faker.number.int({ min: 0, max: users.length })
			);

			events.push({
				title: faker.lorem.sentence(3),
				description: faker.lorem.paragraph(),
				startDate: start,
				endDate: end,
				categories: faker.helpers.arrayElements(
					CATEGORIES,
					faker.number.int({ min: 1, max: 2 })
				),
				mode: faker.helpers.arrayElement(["online", "offline"]),
				location: faker.location.city(),
				creator: creator._id.toString(),
				participants: participants.map((u) => u._id.toString()),
				comments: [],
			});
		}

		return events;
	} catch (err) {
		console.error(err);
	}
}
export async function seedEvents() {
	try {
		await Event.insertMany(await generateEvents(100));
		console.log("Events seeded successfully");
	} catch (err) {
		console.error("Error inserting events:", err);
	}
}
