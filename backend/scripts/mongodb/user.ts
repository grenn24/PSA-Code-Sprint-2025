import { faker } from "@faker-js/faker";
import User from "../../models/user.js";
import dayjs from "dayjs";

const skillsPool = [
	"Data Analytics",
	"Data Management",
	"Excel",
	"Process Optimization",
	"Leadership",
	"Inventory Management",
	"Supply Chain Management",
	"Advanced Data Analysis",
	"Team Management",
];

const notificationsPool = [
	"Welcome to PSA Horizon!",
	"New course available: Advanced Analytics",
	"Reminder: Update your skills profile",
];

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomSkills() {
	const shuffled = skillsPool.sort(() => 0.5 - Math.random());
	return shuffled.slice(0, getRandomInt(1, 3)).map((skill) => ({
		name: skill,
		level: getRandomInt(40, 80),
	}));
}

function generateCareerPath() {
	const pathLength = 3;
	const path: any[] = [];
	for (let i = 0; i < pathLength; i++) {
		const progress =
			i === 0 ? 100 : i === pathLength - 1 ? 0 : getRandomInt(30, 80);
		path.push({
			position: faker.person.jobTitle(),
			progress,
			startedAt: `202${i + 3}-01-01T00:00:00.000Z`,
			endedAt: i === 0 ? `202${i + 3}-12-31T00:00:00.000Z` : undefined,
			skillsRequired: generateRandomSkills().map((s) => s.name),
		});
	}
	return path;
}

function generateMoodData(start: Date, skipProbability = 0.3) {
	const data: { level: number; date: Date }[] = [];
	const today = new Date();

	for (let d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
		if (Math.random() > skipProbability) {
			data.push({
				date: new Date(d),
				level: Math.floor(Math.random() * 10) + 1,
				
			});
		}
	}

	return data;
}

function generateNotifications() {
	const count = getRandomInt(1, 3);
	return Array.from({ length: count }).map(() => ({
		message:
			notificationsPool[getRandomInt(0, notificationsPool.length - 1)],
		read: Math.random() > 0.5,
	}));
}

const generateUsers = () => {
	const users = Array.from({ length: 500 }).map(() => ({
		name: faker.person.fullName(),
		email: faker.internet.email(),
		avatar: faker.image.avatar(),
		bio: faker.person.bio(),
		position: faker.person.jobTitle(),
		role: "user",
		password:
			"$2b$10$TS8eBH1GUf7F3haX1WnX9uqVCzYW9f4ig5abjp4fEMUVkdrqrh91a",
		subordinates: [],
		experienceLevel: getRandomInt(0, 25),
		mentorshipRequests: [],
		skills: generateRandomSkills(),
		notifications: generateNotifications(),
		careerPath: generateCareerPath(),
		moods: generateMoodData(dayjs().subtract(12, "month").toDate()),
	}));
	users.push({
		name: "Di Heng",
		email: "gren@gmail.com",
		position: "Software Engineer",
		role: "user",
		bio: faker.person.bio(),
		password:
			"$2b$10$TS8eBH1GUf7F3haX1WnX9uqVCzYW9f4ig5abjp4fEMUVkdrqrh91a",
		subordinates: [],
		experienceLevel: 2,
		mentorshipRequests: [],
		avatar: "https://avatars.githubusercontent.com/u/126308058?v=4",
		skills: [
			{
				name: "Software Engineer",
				level: 60,
			},
			{
				name: "AI Engineer",
				level: 50,
			},
		],
		notifications: [
			{
				message: "Welcome to PSA Horizon!",
				read: false,
			},
		],
		careerPath: [
			{
				position: "Junior Software Engineer",
				progress: 100,
				startedAt: "2023-01-01T00:00:00.000Z",
				endedAt: "2023-12-31T00:00:00.000Z",
				skillsRequired: ["Data Analysis", "Excel", "Basic Logistics"],
				_id: "68e0fa5fb8980e66e106acae",
			},
			{
				position: "Software Engineer",
				progress: 65,
				startedAt: "2024-01-01T00:00:00.000Z",
				skillsRequired: [
					"Advanced Data Analysis",
					"Process Optimization",
				],
				_id: "68e0fa5fb8980e66e106acaf",
			},
			{
				position: "Senior Software Engineer",
				progress: 0,
				skillsRequired: ["Leadership", "Supply Chain Management"],
				_id: "68e0fa5fb8980e66e106acb0",
			},
		],
		moods: generateMoodData(dayjs().subtract(12, "month").toDate()),
	});
	return users;
};

export async function seedUsers() {
	try {
		await User.insertMany(generateUsers());
		console.log("Users seeded successfully");
	} catch (err) {
		console.error("Error inserting users:", err);
	}
}
