import { User } from "./user";

export interface Message {
	_id?: string;
	content: string;
	sender: string;
	createdAt?: Date;
	read?: boolean;
	readAt?: Date;
}

export interface Chat {
	_id?: string;
	participants: User[];
	messages: Message[];
	createdAt?: Date;
}
