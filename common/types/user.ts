export interface Mood {
	level: number;
	date: Date;
	notes: string[];
}

export interface Activity {
	type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
	date: Date;
}

export interface Skill {
	name: string;
	functionArea: string;
	specialisation: string;
	level: number; // 0–100
}

export interface Position {
	name: string;
	focusAreas: string[];
	skills: Skill[];
	startDate: Date;
	endDate: Date | null;
}

export interface Education {
	institution: string;
	degree: string;
	startDate: Date;
	endDate: Date;
}

export interface Project {
	name: string;
	role: string;
	description: string;
	outcomes: string[];
	startDate: Date;
	endDate: Date;
}

export interface Language {
	name: string;
	proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
}

export interface Strength {
	name: string;
	level: "Beginner" | "Intermediate" | "Advanced";
}

export interface MentorshipRequest {
	_id?: string;
	sender: User | string;
	message?: string;
}

export interface Notification {
	message: string;
	read: boolean;
	createdAt: Date;
}

export interface User {
	_id?: string;
	name: string;
	email: string;
	organisation: string; // default: "PSA Singapore"
	position: string;
	department: string;
	unit: string;
	role?: "user" | "admin";
	hireDate: Date;
	password: string;
	supervisor?: User | string;
	subordinates?: (User | string)[];
	avatar?: string;
	bio?: string;

	skills: Skill[];
	mentorshipRequests: MentorshipRequest[];
	mentors: User[];
	mentees: User[];

	notifications: Notification[];
	careerPath: Position[];

	lastSeen?: Date | null;
	isOnline: boolean;
	moods: Mood[];
	activities: Activity[];

	languages: Language[];
	strengths: Strength[];
	education: Education[];
	projects: Project[];

	createdAt?: Date;
	updatedAt: Date;
}
