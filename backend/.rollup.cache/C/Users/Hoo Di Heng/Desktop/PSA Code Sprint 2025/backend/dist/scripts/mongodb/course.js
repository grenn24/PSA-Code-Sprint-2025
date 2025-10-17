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
    "Time Management",
    "Public Speaking",
    "Problem Solving",
    "C++",
    "TypeScript",
    "Docker",
    "Kubernetes",
    "Critical Thinking",
    "Presentation Skills",
    "Negotiation",
    "Business Strategy",
    "Excel",
    "Data Engineering",
    "Cybersecurity",
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
    "Operations Management",
    "Risk Analysis",
    "Product Management",
    "Artificial Intelligence",
    "Customer Insights",
    "Quality Assurance",
    "DevOps",
    "Cybersecurity",
    "UI/UX Design",
    "Research & Development",
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
    "Deep Learning",
    "Natural Language Processing",
    "Cloud Architecture",
    "Database Design",
    "Agile Coaching",
    "Business Intelligence",
    "Sustainability Strategy",
    "Risk Mitigation",
    "UI Prototyping",
    "System Integration",
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
            const skillsTaught = Array.from({ length: Math.floor(Math.random() * 3) + 2 }, () => {
                const skillName = SKILL_NAMES[Math.floor(Math.random() * SKILL_NAMES.length)];
                const functionArea = FUNCTION_AREAS[Math.floor(Math.random() * FUNCTION_AREAS.length)];
                const specialisation = SPECIALISATIONS[Math.floor(Math.random() * SPECIALISATIONS.length)];
                const level = Math.floor(Math.random() * 50) + 50; // random level 50–100
                return {
                    name: skillName,
                    functionArea,
                    specialisation,
                    level,
                };
            });
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
        console.log(`${courses.length} courses seededsuccessfully`);
    }
    catch (err) {
        console.error("Error inserting courses:", err);
    }
}
//# sourceMappingURL=course.js.map