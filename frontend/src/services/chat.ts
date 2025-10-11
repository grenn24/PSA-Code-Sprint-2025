import websocketService from "utilities/websocket";
import createApiClient from "../utilities/apiClient";
import { Chat, Message } from "@common/types/chat";
import { WebsocketMessage } from "@common/types/http";

class ChatService {
	apiClient = createApiClient("/chat");

	public peerConnection: RTCPeerConnection | null = null;
	public localStream: MediaStream | null = null;
	public remoteStream: MediaStream | null = null;
	private pendingCandidates: RTCIceCandidateInit[] = [];
	onLocalStream?: (stream: MediaStream | null) => void;
	onRemoteStream?: (stream: MediaStream | null) => void;

	async createChat(participantIDs: string[]) {
		const response = await this.apiClient.post<any, Chat>("", {
			participants: participantIDs,
		});
		return response.data;
	}

	async postMessage(
		chatID: string,
		{
			sender: senderID,
			content,
			type = "text",
			metadata = {},
			createdAt,
		}: {
			sender: string;
			content: string;
			type?: Message["type"];
			metadata?: Record<string, any>;
			createdAt?: Date;
		}
	) {
		const data = {
			sender: senderID,
			content,
			createdAt,
			type,
			metadata,
		};
		const response = await this.apiClient.post<Message, Message>(
			`/${chatID}/message`,
			data
		);
		return response.data;
	}

	async updateMessage(
		messageID: string,
		chatID: string,
		data: {
			content: string;
			type?: Message["type"];
			metadata?: Record<string, any>;
		}
	) {
		const response = await this.apiClient.put<any, Message>(
			`/${chatID}/message/${messageID}`,
			data
		);
		return response.data;
	}

	async markMessagesAsRead(chatID: string) {
		const response = await this.apiClient.post<any, Chat>(
			`/${chatID}/read`,
			{}
		);
		return response.data;
	}

	async addICECandidate(candidate: RTCIceCandidateInit) {
		if (!this.peerConnection || !this.peerConnection.remoteDescription) {
			this.pendingCandidates.push(candidate);
			return;
		}
		await this.peerConnection.addIceCandidate(
			new RTCIceCandidate(candidate)
		);
	}

	async offerVideoCall(targetUserID: string, chatID: string) {
		const localStream = await navigator.mediaDevices.getUserMedia({
			video: true,
			audio: true,
		});
		if (!this.localStream) {
			this.localStream = localStream;
			this.onLocalStream?.(localStream);
		}

		this.peerConnection = new RTCPeerConnection();

		this.localStream.getTracks().forEach((track) => {
			if (!this.peerConnection) return;
			this.peerConnection.addTrack(track, localStream);
		});

		this.peerConnection.ontrack = (event) => {
			this.remoteStream = event.streams?.[0];
			this.onRemoteStream?.(this.remoteStream);
		};

		this.peerConnection.onicecandidate = (event) => {
			if (event.candidate) {
				websocketService.send({
					type: "establish_connection",
					data: event.candidate,
					targetUserID,
					chatID,
					timestamp: new Date().toISOString(),
				});
			}
		};

		const offer = await this.peerConnection.createOffer();
		await this.peerConnection.setLocalDescription(offer);

		websocketService.send({
			type: "offer_video_call",
			data: offer,
			targetUserID,
			chatID,
			timestamp: new Date().toISOString(),
		});

		const handleVideoCallAnswered = async (message: WebsocketMessage) => {
			if (message.type !== "answer_video_call" || !this.peerConnection)
				return;
			await this.peerConnection?.setRemoteDescription(
				new RTCSessionDescription(message.data)
			);
			for (const candidate of this.pendingCandidates) {
				await this.peerConnection.addIceCandidate(
					new RTCIceCandidate(candidate)
				);
			}
			this.pendingCandidates = [];
			websocketService.removeListener(handleVideoCallAnswered);
		};
		const endVideoCall = async (message: WebsocketMessage) => {
			if (message.type !== "end_video_call") return;
			if (this.peerConnection) {
				this.peerConnection.close();
				this.peerConnection = null;
			}
			if (this.localStream) {
				this.localStream.getTracks().forEach((track) => track.stop());
				this.localStream = null;
				this.onLocalStream?.(null);
			}
			if (this.remoteStream) {
				this.remoteStream.getTracks().forEach((track) => track.stop());
				this.remoteStream = null;
				this.onRemoteStream?.(null);
			}
		};
		websocketService.addListeners([handleVideoCallAnswered, endVideoCall]);
	}

	async answerVideoCall(
		targetUserID: string,
		chatID: string,
		offer: RTCSessionDescriptionInit
	) {
		const localStream = await navigator.mediaDevices.getUserMedia({
			video: true,
			audio: true,
		});
		if (!this.localStream) {
			this.localStream = localStream;
			this.onLocalStream?.(localStream);
		}

		this.peerConnection = new RTCPeerConnection();

		this.localStream.getTracks().forEach((track) => {
			if (!this.peerConnection) return;
			this.peerConnection.addTrack(track, localStream);
		});

		this.peerConnection.ontrack = (event) => {
			this.remoteStream = event.streams?.[0];
			this.onRemoteStream?.(this.remoteStream);
		};

		this.peerConnection.onicecandidate = (event) => {
			if (event.candidate) {
				websocketService.send({
					type: "establish_connection",
					data: event.candidate,
					targetUserID,
					chatID,
					timestamp: new Date().toISOString(),
				});
			}
		};

		await this.peerConnection.setRemoteDescription(
			new RTCSessionDescription(offer)
		);

		const answer = await this.peerConnection.createAnswer();
		await this.peerConnection.setLocalDescription(answer);
		for (const candidate of this.pendingCandidates) {
			await this.peerConnection.addIceCandidate(
				new RTCIceCandidate(candidate)
			);
		}
		this.pendingCandidates = [];
		websocketService.send({
			type: "answer_video_call",
			data: answer,
			targetUserID,
			chatID,
			timestamp: new Date().toISOString(),
		});
		const endVideoCall = async (message: WebsocketMessage) => {
			if (message.type !== "end_video_call") return;
			if (this.peerConnection) {
				this.peerConnection.close();
				this.peerConnection = null;
			}
			if (this.localStream) {
				this.localStream.getTracks().forEach((track) => track.stop());
				this.localStream = null;
				this.onLocalStream?.(null);
			}
			if (this.remoteStream) {
				this.remoteStream.getTracks().forEach((track) => track.stop());
				this.remoteStream = null;
				this.onRemoteStream?.(null);
			}
		};
		websocketService.addListener(endVideoCall);
	}

	async endVideoCall(targetUserID: string) {
		websocketService.send({
			type: "end_video_call",
			targetUserID,
			timestamp: new Date().toISOString(),
		});
		if (this.peerConnection) {
			this.peerConnection.close();
			this.peerConnection = null;
		}
		if (this.localStream) {
			this.localStream.getTracks().forEach((track) => track.stop());
			this.localStream = null;
			this.onLocalStream?.(null);
		}
		if (this.remoteStream) {
			this.remoteStream.getTracks().forEach((track) => track.stop());
			this.remoteStream = null;
			this.onRemoteStream?.(null);
		}
	}
}

const chatService = new ChatService();
export default chatService;
