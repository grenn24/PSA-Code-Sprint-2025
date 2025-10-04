export interface User {
	_id?: string;
	name: string;
	email: string;
	position: string;
	role?: "user" | "admin";
	password: string;
	supervisor?: string;
	subordinates?: string[];
	avatar?: string;
	createdAt?: Date;
	experienceLevel: number;
	bio?: string;
	skills: {
		name: string;
		level?: number;
	}[];
	mentorshipRequests: { _id?: string; sender: User; message?: string }[];
	mentors: User[];
	mentees: User[];
	notifications?: {
		message: string;
		read?: boolean;
		createdAt?: Date;
	}[];
	careerPath?: {
		_id?: string;
		position: string;
		progress: number;
		startedAt?: Date;
		endedAt?: Date;
		skillsRequired: string[];
	}[];
}
