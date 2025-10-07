export interface WBMessage {
	role: "user" | "assistant";
	content: string;
	timestamp: Date;
}

export interface WBConversation {
	_id?: string;
	title: string;
	user: string;
	messages: WBMessage[];
	createdAt: Date;
	updatedAt: Date;
}
