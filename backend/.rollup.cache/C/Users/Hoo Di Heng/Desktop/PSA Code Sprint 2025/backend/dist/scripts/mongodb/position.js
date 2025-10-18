import { Position } from "../../models/position.js";
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
const POSITION_NAMES = [
    "Junior Data Analyst",
    "Data Analyst",
    "Senior Data Analyst",
    "Lead Data Analyst",
    "Software Engineer",
    "Senior Software Engineer",
    "Team Lead Software Engineer",
    "Project Manager",
    "Senior Project Manager",
    "Product Manager",
    "Marketing Analyst",
    "Finance Analyst",
    "Cloud Solutions Engineer",
    "AI Specialist",
    "Machine Learning Engineer",
    "Operations Manager",
    "Logistics Manager",
    "HR Specialist",
    "Leadership Development Associate",
    "Business Analyst",
];
export async function seedPositions() {
    try {
        const positions = POSITION_NAMES.map((name) => {
            // Assign 3–5 random skills per position
            const skills = Array.from({ length: Math.floor(Math.random() * 3) + 3 }, () => {
                const skillName = SKILL_NAMES[Math.floor(Math.random() * SKILL_NAMES.length)];
                const functionArea = FUNCTION_AREAS[Math.floor(Math.random() * FUNCTION_AREAS.length)];
                const specialisation = SPECIALISATIONS[Math.floor(Math.random() * SPECIALISATIONS.length)];
                const level = Math.floor(Math.random() * 50) + 50; // typical proficiency required
                return {
                    name: skillName,
                    functionArea,
                    specialisation,
                    level,
                };
            });
            // Assign 1–2 focus areas
            const focusAreas = Array.from({ length: Math.floor(Math.random() * 2) + 1 }, () => FUNCTION_AREAS[Math.floor(Math.random() * FUNCTION_AREAS.length)]);
            return {
                name,
                focusAreas,
                skills,
                startDate: new Date(),
                endDate: null,
            };
        });
        await Position.insertMany(positions);
        console.log(`${positions.length} positions seeded successfully`);
    }
    catch (err) {
        console.error("Error inserting positions:", err);
    }
}
//# sourceMappingURL=position.js.map