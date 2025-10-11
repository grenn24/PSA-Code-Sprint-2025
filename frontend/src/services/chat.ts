import websocketService from "utilities/websocket";
import createApiClient from "../utilities/apiClient";
import { Chat, Message } from "@common/types/chat";

class ChatService {
	apiClient = createApiClient("/chat");

	peerConnection: RTCPeerConnection;
	localStream: MediaStream;

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

	async offerVideoCall(userID: string, targetUserID: string) {
		this.localStream = await navigator.mediaDevices.getUserMedia({
			video: true,
			audio: true,
		});

		this.peerConnection = new RTCPeerConnection();

		this.localStream
			.getTracks()
			.forEach((track) =>
				this.peerConnection.addTrack(track, this.localStream)
			);

		this.peerConnection.ontrack = (event) => {
			const remoteVideo = document.getElementById(
				"remoteVideo"
			) as HTMLVideoElement;
			if (remoteVideo) remoteVideo.srcObject = event.streams[0];
		};

		this.peerConnection.onicecandidate = (event) => {
			if (event.candidate) {
				websocketService.send({
					type: "establish_connection",
					data: event.candidate,
					userID,
					targetUserID,
					timestamp: new Date().toISOString(),
				});
			}
		};

		const offer = await this.peerConnection.createOffer();
		await this.peerConnection.setLocalDescription(offer);

		websocketService.send({
			type: "offer_video_call",
			data: offer,
			userID,
			targetUserID,
			timestamp: new Date().toISOString(),
		});
	}

	async answerVideoCall(userID:string, targetUserID: string, offer: RTCSessionDescriptionInit) {
		if (!this.peerConnection) {
			this.peerConnection = new RTCPeerConnection();

			const localStream = await navigator.mediaDevices.getUserMedia({
				video: true,
				audio: true,
			});
			localStream
				.getTracks()
				.forEach((track) =>
					this.peerConnection.addTrack(track, localStream)
				);

			this.peerConnection.ontrack = (event) => {
				const remoteVideo = document.getElementById(
					"remoteVideo"
				) as HTMLVideoElement;
				if (remoteVideo) remoteVideo.srcObject = event.streams[0];
			};

			this.peerConnection.onicecandidate = (event) => {
				if (event.candidate) {
					websocketService.send({
						type: "establish_connection",
						data: event.candidate,
						targetUserId: targetUserID,
						timestamp: new Date().toISOString(),
					});
				}
			};
		}

		await this.peerConnection.setRemoteDescription(
			new RTCSessionDescription(offer)
		);

		const answer = await this.peerConnection.createAnswer();
		await this.peerConnection.setLocalDescription(answer);

		websocketService.send({
			type: "answer_video_call",
			data: answer,
			userID,
			targetUserID,
			timestamp: new Date().toISOString(),
		});
	}
}

const chatService = new ChatService();
export default chatService;
