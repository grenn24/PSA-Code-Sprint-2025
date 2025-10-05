import { User } from "./user";

export interface Message {
	_id?: string;
	content: string;
	sender: string;
	createdAt?: Date;
	read?: boolean;
	readAt?: Date;
	type:
		| "text"
		| "file"
		| "tip"
		| "quiz"
		| "poll"
		| "feedback"
		| "feedbackRequest"
		| "question"
		| "moodUpdate"
		| "wellbeingPrompt";
	metadata: Record<string, any>;
}

export interface Chat {
	_id?: string;
	participants: User[];
	messages: Message[];
	createdAt?: Date;
}
