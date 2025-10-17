import { Skill } from "./user";

export interface Course {
	name: string;
	skillsTaught: Skill[];
	durationHours: number;
	description?: string;
}
