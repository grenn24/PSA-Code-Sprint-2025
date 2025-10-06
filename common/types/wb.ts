export interface WBMessage {
	role: "user" | "assistant";
	text: string;
	timestamp: Date;
}

export interface WBConversation {
	userId: string;
	messages: WBMessage[];
	createdAt: Date;
	updatedAt: Date;
}
