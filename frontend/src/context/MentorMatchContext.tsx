import { Chat } from "@common/types/chat";
import {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
} from "react";

interface MentorMatchContextProps {
	chats: Chat[];
	setChats: Dispatch<SetStateAction<Chat[]>>;
}

export const MentorMatchContext = createContext<MentorMatchContextProps>({
	chats: [],
	setChats: () => {},
});

export const useMentorMatchContext = () => useContext(MentorMatchContext);
