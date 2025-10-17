import { faker } from "@faker-js/faker";
import User from "../../models/user.js";
import dayjs from "dayjs";
import fs from "fs/promises";
import { Project } from "@common/types/user.js";

const SKILLS = [
	"Data Analysis",
	"Database Management",
	"Excel Modeling",
	"Process Optimization",
	"Leadership",
	"Inventory Control",
	"Supply Chain Planning",
	"Advanced Analytics",
	"Team Leadership",
	"Statistical Modelling",
];
const FUNCTION_AREA = [
	"Operations Management",
	"Strategic Decision Making",
	"Process Improvement",
	"Project Coordination",
	"Business Planning",
	"Inventory Optimization",
	"Performance Monitoring",
	"Resource Allocation",
	"Workflow Automation",
	"Risk Mitigation",
];
const SPECIALISATIONS = [
	"Predictive Modelling",
	"Operational Strategy",
	"Business Intelligence",
	"Risk Assessment",
	"Quality Assurance",
	"Process Engineering",
	"Change Management",
	"Sustainability Planning",
	"Technology Integration",
	"Machine Learning",
];
const NOTIFICATIONS = [
	"Welcome to PSA Horizon!",
	"New course available: Advanced Analytics",
	"Reminder: Update your skills profile",
];
const PROJECT_NAMES = [
	"Treasury Management System Enhancement",
	"Customer Insights Dashboard",
	"Port Operations Optimization",
	"Predictive Maintenance AI Platform",
	"Smart Inventory Control System",
	"Logistics Route Optimizer",
	"Data Governance Framework",
	"Supplier Performance Tracker",
	"Workforce Scheduling Application",
	"Risk Analytics Engine",
];
const ROLES = [
	"Analyst",
	"Engineer",
	"Data Scientist",
	"Consultant",
	"Developer",
	"Project Lead",
];
const DESCRIPTIONS = [
	"Developed automated workflows to streamline manual processes.",
	"Enhanced data accuracy through rule-based validation and integration.",
	"Built interactive dashboards for real-time performance tracking.",
	"Optimized predictive algorithms to improve operational efficiency.",
	"Implemented API integrations for seamless data exchange across systems.",
	"Redesigned the system architecture for better scalability and reliability.",
	"Introduced analytics-driven insights for strategic decision making.",
	"Collaborated with cross-functional teams to improve delivery speed.",
];
const OUTCOMES = [
	"Reduced processing time by 40%",
	"Increased data accuracy by 25%",
	"Enhanced operational visibility",
	"Improved reporting turnaround time",
	"Achieved 99.9% system uptime",
	"Reduced manual work by 60%",
	"Improved user satisfaction scores",
	"Enabled faster executive decision making",
];

const HASHED_PASSWORD =
	"$2b$10$TS8eBH1GUf7F3haX1WnX9uqVCzYW9f4ig5abjp4fEMUVkdrqrh91a";

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDate(start, end) {
	const date = new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime())
	);
	return date;
}

function generateStrengths() {
	const shuffled = [...SKILLS].sort(() => 0.5 - Math.random());
	const selected = shuffled.slice(0, getRandomInt(3, 6));

	return selected.map((skill) => ({
		name: skill,
		level: ["Beginner", "Intermediate", "Advanced"][getRandomInt(0, 2)],
	}));
}

function generateRandomSkills() {
	const shuffledSkills = [...SKILLS].sort(() => 0.5 - Math.random());
	const shuffledFocus = [...FUNCTION_AREA].sort(() => 0.5 - Math.random());
	const shuffledSpecialisations = [...SPECIALISATIONS].sort(
		() => 0.5 - Math.random()
	);

	return shuffledSkills.slice(0, getRandomInt(1, 3)).map((skill, index) => ({
		name: skill,
		level: getRandomInt(40, 80),
		functionArea: shuffledFocus[index],
		specialisation: shuffledSpecialisations[index],
	}));
}
function generateCareerPath() {
	const pathLength = 3;
	const path: any[] = [];

	for (let i = 0; i < pathLength; i++) {
		const startDate = getRandomDate(
			new Date(2018, 0, 1),
			new Date(2023, 0, 1)
		);
		const endDate =
			i === pathLength - 1
				? null
				: getRandomDate(new Date(startDate), new Date(2025, 0, 1));

		const focusAreas = [...FUNCTION_AREA]
			.sort(() => 0.5 - Math.random())
			.slice(0, getRandomInt(1, 2));

		path.push({
			name: faker.person.jobTitle(),
			focusAreas,
			skills: generateRandomSkills().map((s) => s.name),
			startDate,
			endDate,
		});
	}

	return path;
}

function generateMoodData(start: Date, skipProbability = 0.3) {
	const data: { level: number; date: Date }[] = [];
	const today = new Date();

	const startOfCurrentWeek = new Date(today);
	startOfCurrentWeek.setHours(0, 0, 0, 0);
	startOfCurrentWeek.setDate(today.getDate() - today.getDay());

	for (let d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
		const isCurrentWeek = d >= startOfCurrentWeek;
		const include = isCurrentWeek || Math.random() > skipProbability;

		if (include) {
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
		message: NOTIFICATIONS[getRandomInt(0, NOTIFICATIONS.length - 1)],
		read: Math.random() > 0.5,
	}));
}

export function generateProjects(count = getRandomInt(3, 5)) {
	const projects: Project[] = [];
	for (let i = 0; i < count; i++) {
		const projectName =
			PROJECT_NAMES[getRandomInt(0, PROJECT_NAMES.length - 1)];
		const role = ROLES[getRandomInt(0, ROLES.length - 1)];
		const start = getRandomDate(
			new Date(2022, 0, 1),
			new Date(2024, 11, 31)
		);
		const end = getRandomDate(new Date(start), new Date(2025, 11, 31));

		const description =
			DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length - 1)];
		const outcomesCount = getRandomInt(1, 2);
		const projectOutcomes = Array.from(
			{ length: outcomesCount },
			() => OUTCOMES[getRandomInt(0, OUTCOMES.length - 1)]
		);

		projects.push({
			name: projectName,
			role,
			startDate: start,
			endDate: end,
			description,
			outcomes: projectOutcomes,
		});
	}
	return projects;
}

export const generateUser = async (email: string, password: string) => {
	return {
		name: faker.person.fullName(),
		organisation: "PSA Singapore",
		email,
		position: faker.person.jobTitle(),
		department: "Engineering",
		unit: "Software Development",
		role: "user",
		hireDate: new Date("2023-01-01"),
		password,
		subordinates: [],
		avatar: faker.image.avatar(),
		bio: faker.person.bio(),
		mentorshipRequests: [],
		skills: generateRandomSkills(),
		notifications: generateNotifications(),
		careerPath: generateCareerPath(),
		moods: generateMoodData(dayjs().subtract(12, "month").toDate()),
		activities: [],
		isOnline: false,
		lastSeen: null,
		languages: [
			{
				name: "English",
				proficiency: "Professional",
			},
			{
				name: "Chinese",
				proficiency: "Professional",
			},
		],
		strengths: generateStrengths(),
		education: [],
		projects: generateProjects(),
		mentees: [],
		supervisor: undefined,
	};
};

export const generateDefaultUser = () => {
	return {
		name: "Di Heng",
		organisation: "PSA Singapore",
		email: "gren@gmail.com",
		position: "Software Engineer",
		department: "Engineering",
		unit: "Software Development",
		role: "user",
		hireDate: new Date("2023-01-01"),
		password: HASHED_PASSWORD,
		subordinates: [],
		avatar: faker.image.avatar(),
		bio: faker.person.bio(),
		mentorshipRequests: [],
		skills: [
			{
				name: "Software Engineer",
				functionArea: "Software",
				specialisation: "Full Stack",
				level: 60,
			},
			{
				name: "AI Engineer",
				functionArea: "AI",
				specialisation: "Machine Learning",
				level: 50,
			},
		],
		notifications: [{ message: "Welcome to PSA Horizon!", read: false }],
		careerPath: [
			{
				name: "Junior Software Engineer",
				focusAreas: ["Software Engineering"],
				skills: ["UI/UX Design", "Backend APIs"],
				startDate: new Date("2023-01-01"),
				endDate: new Date("2023-12-31"),
			},
			{
				name: "Senior Software Engineer",
				focusAreas: ["Software Engineering"],
				skills: ["Full Stack Development", "Microservices"],
				startDate: new Date("2024-01-01"),
				endDate: null,
			},
		],
		moods: generateMoodData(dayjs().subtract(12, "month").toDate()),
		activities: [],
		isOnline: false,
		lastSeen: null,
		languages: [
			{
				name: "English",
				proficiency: "Professional",
			},
			{
				name: "Chinese",
				proficiency: "Professional",
			},
		],
		strengths: generateStrengths(),
		education: [],
		projects: generateProjects(),
		mentees: [],
		supervisor: undefined,
	};
};

export const generateUsers = async (
	length: number,
	includeDefaultUser = true
) => {
	const users = await Promise.all(
		Array.from({ length }).map(async () => {
			return {
				name: faker.person.fullName(),
				email: faker.internet.email(),
				avatar: faker.image.avatar(),
				bio: faker.person.bio(),
				position: faker.person.jobTitle(),
				role: "user",
				password: HASHED_PASSWORD,
				department: faker.person.jobArea(),
				unit: faker.person.jobDescriptor(),
				hireDate: faker.date.past({ years: 5 }),
				subordinates: [],
				mentorshipRequests: [],
				skills: generateRandomSkills(),
				notifications: generateNotifications(),
				careerPath: generateCareerPath(),
				moods: generateMoodData(dayjs().subtract(12, "month").toDate()),
			};
		})
	);
	if (includeDefaultUser) {
		users.push(generateDefaultUser());
	}
	return users;
};

export const generateUsersFromJSON = async (
	employeeData: any[],
	includeDefaultUser = true
) => {
	const users = await Promise.all(
		employeeData.map(async (emp) => {
			const personal = emp.personal_info ?? {};
			const employment = emp.employment_info ?? {};

			const user = {
				name: personal.name ?? faker.person.fullName(),
				email: personal.email ?? faker.internet.email(),
				organisation: personal.office_location ?? "PSA Singapore",
				position: employment.job_title ?? faker.person.jobTitle(),
				department: employment.department ?? "General Department",
				unit: employment.unit ?? "General Unit",
				role: "user",
				password: HASHED_PASSWORD,
				hireDate: employment.hire_date
					? new Date(employment.hire_date)
					: faker.date.past({ years: 5 }),
				supervisor: undefined,
				subordinates: [],
				avatar: faker.image.avatar(),
				bio: faker.person.bio(),
				lastSeen: null,
				skills: (emp.skills ?? []).map((s: any) => ({
					name: s.skill_name,
					functionArea: s.function_area,
					specialisation: s.specialization,
					level: getRandomInt(40, 100),
				})),
				languages: (personal.languages ?? []).map((l: any) => ({
					name: l.language,
					proficiency: l.proficiency,
				})),
				strengths: (emp.competencies ?? []).map((c: any) => ({
					name: c.name,
					level: c.level,
				})),
				projects: (emp.projects ?? []).map((p: any) => ({
					name: p.project_name,
					role: p.role,
					description: p.description,
					outcomes: p.outcomes ?? [],
					startDate: new Date(p.period.start),
					endDate: p.period.end ? new Date(p.period.end) : new Date(),
				})),
				education: (emp.education ?? []).map((e: any) => ({
					institution: e.institution,
					degree: e.degree,
					startDate: new Date(e.period.start),
					endDate: new Date(e.period.end),
				})),
				careerPath: (emp.positions_history ?? []).map((p: any) => ({
					name: p.role_title,
					focusAreas: p.focus_areas ?? [],
					skills: p.key_skills_used ?? [],
					startDate: new Date(p.period.start),
					endDate: p.period.end ? new Date(p.period.end) : null,
				})),
				notifications: generateNotifications(),
				mentorshipRequests: [],
				mentees: [],
				moods: generateMoodData(dayjs().subtract(12, "month").toDate()),
				activities: [],
				isOnline: false,
			};

			return user;
		})
	);

	if (includeDefaultUser) {
		users.push(generateDefaultUser());
	}

	return users;
};

export async function seedUsers() {
	try {
		const data = await fs.readFile(
			"./scripts/mongodb/Employee_Profiles.json",
			"utf-8"
		);
		const jsonData = JSON.parse(data);
		const totalUsers = 500;

		const jsonUsers = await generateUsersFromJSON(jsonData, true);
		const mockUsers = await generateUsers(totalUsers - jsonUsers.length);
		const usersToInsert = [...jsonUsers, ...mockUsers];

		await User.insertMany(usersToInsert);

		console.log(`Seeded ${usersToInsert.length} users successfully`);
	} catch (err) {
		console.error("Error inserting users:", err);
	}
}
