import { Course } from "../../models/course.js";

const SKILL_NAMES = [
	"Python",
	"Java",
	"SQL",
	"React",
	"Machine Learning",
	"Leadership",
	"Project Management",
	"Communication",
	"Data Analysis",
	"Finance",
	"Marketing",
	"Cloud Computing",
	"Data Visualization",
	"AI Ethics",
];


const FUNCTION_AREAS = [
	"Data Analytics",
	"Machine Learning",
	"Leadership",
	"Supply Chain",
	"Project Management",
	"Software Development",
	"Communication",
	"Finance",
	"Marketing",
	"Cloud Computing",
];

const SPECIALISATIONS = [
	"Predictive Modelling",
	"Statistical Analysis",
	"Team Management",
	"Inventory Control",
	"Process Optimization",
	"Web Development",
	"Data Visualization",
	"AI Ethics",
	"Financial Modelling",
	"Negotiation",
];

const COURSE_NAMES = [
	"Advanced Data Analytics",
	"Leadership Fundamentals",
	"Supply Chain Optimization",
	"Effective Communication",
	"Python for Data Science",
	"Machine Learning Basics",
	"Project Management Essentials",
	"React Development Bootcamp",
	"SQL for Analysts",
	"AI & Ethics",
	"Finance for Non-Finance",
	"Marketing Analytics",
	"Time Management Mastery",
	"Team Collaboration Strategies",
	"Negotiation Skills",
	"Cloud Computing Fundamentals",
	"Data Visualization with Tableau",
	"Advanced Python Programming",
	"Machine Learning Advanced",
	"Leadership in Practice",
	"Operations Management",
	"Logistics & Distribution",
	"Agile Project Management",
	"Critical Thinking",
	"Data Engineering Basics",
	"Effective Presentation Skills",
	"AI in Business",
	"Advanced React Patterns",
	"SQL Optimization",
	"Python Automation",
	"Decision Making Skills",
	"Customer Success Management",
	"Product Management Essentials",
	"Marketing Strategy",
	"Business Analytics",
	"Leadership Communication",
	"Team Motivation Techniques",
	"Cloud Deployment",
	"Advanced Machine Learning",
	"Data Science Capstone",
	"Project Risk Management",
	"Innovation & Creativity",
	"Negotiation Tactics",
	"Supply Chain Analytics",
	"Financial Modelling",
	"AI Project Management",
	"Leadership Coaching",
	"Python for Web Development",
	"Big Data Fundamentals",
	"Data-Driven Decision Making",
];

export async function seedCourses() {
	try {
		const courses = COURSE_NAMES.map((name) => {
			// Pick 2-4 random skills per course
			const skillsTaught = Array.from(
				{ length: Math.floor(Math.random() * 3) + 2 },
				() => {
					const skillName =
						SKILL_NAMES[
							Math.floor(Math.random() * SKILL_NAMES.length)
						];
					const functionArea =
						FUNCTION_AREAS[
							Math.floor(Math.random() * FUNCTION_AREAS.length)
						];
					const specialisation =
						SPECIALISATIONS[
							Math.floor(Math.random() * SPECIALISATIONS.length)
						];
					const level = Math.floor(Math.random() * 50) + 50; // random level 50–100
					return {
						name: skillName,
						functionArea,
						specialisation,
						level,
					};
				}
			);

			const durationHours = Math.floor(Math.random() * 20) + 5;

			return {
				name,
				skillsTaught,
				durationHours,
				description: `Learn ${skillsTaught
					.map((s) => s.name)
					.join(", ")} in this course`,
			};
		});

		await Course.insertMany(courses);
		console.log(`${courses.length} courses seeded successfully`);
	} catch (err) {
		console.error("Error inserting courses:", err);
	}
}
