import React, { useState } from "react";
import { PaperClipIcon } from "@heroicons/react/24/solid";
import FileInput from "components/FileInput";
import s3Service from "utilities/s3";

interface Prop {
	sendMessage: (
		content: string,
		type?:
			| "text"
			| "file"
			| "tip"
			| "quiz"
			| "poll"
			| "feedback"
			| "feedbackRequest"
			| "question"
			| "moodUpdate"
			| "wellbeingPrompt",
		metadata?: Record<string, any>
	) => Promise<void>;
	setOpenMenuModal: React.Dispatch<React.SetStateAction<string | null>>;
}

const ShareFileModalContent = ({ sendMessage, setOpenMenuModal }: Prop) => {
	const [file, setFile] = useState<File | null>(null);
	const [caption, setCaption] = useState("");
	const [openFileInput, setOpenFileInput] = useState(true);

	const handleFileSubmit = (files: FileList) => {
		console.log(files);
		const uploadedFile = files?.[0];
		if (uploadedFile) {
			setFile(uploadedFile);
		}
	};

	const handleShare = async () => {
		if (!file) return;
		const s3File = await s3Service.uploadFileWithHashing(file, [
			"shared-files",
		]);
		console.log(s3File);
		await sendMessage(caption, "file", s3File);
		setOpenMenuModal(null);
	};

	return (
		<div>
			{!file ? (
				<div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-8 cursor-pointer hover:border-indigo-400 transition">
					<PaperClipIcon className="w-12 h-12 text-gray-400 mb-2" />
					<p className="text-gray-600 font-medium">
						Click to upload file
					</p>
					<p className="text-sm text-gray-400">
						PDF, images, documents, etc.
					</p>
				</div>
			) : (
				<div className="w-full flex flex-col gap-4">
					{/* File Preview */}
					<div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 border border-gray-200">
						<div className="flex-shrink-0">
							<PaperClipIcon className="w-10 h-10 text-indigo-600" />
						</div>
						<div className="flex flex-col overflow-hidden">
							<span className="font-semibold text-gray-800 truncate max-w-xs">
								{file.name}
							</span>
							<span className="text-sm text-gray-500 whitespace-pre-wrap">
								{(file.size / 1024).toFixed(1)} KB • {file.type}
							</span>
						</div>
					</div>

					{/* Caption input */}
					<input
						type="text"
						value={caption}
						onChange={(e) => setCaption(e.target.value)}
						placeholder="Add a caption (optional)"
						className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
					/>

					{/* Share button */}
					<button
						onClick={handleShare}
						className="w-full bg-indigo-600 text-white hover:bg-indigo-700 font-semibold py-2 rounded-lg shadow hover:opacity-90 transition"
					>
						Share File
					</button>
				</div>
			)}
			<FileInput
				openInput={openFileInput}
				setOpenInput={setOpenFileInput}
				onFileSubmit={handleFileSubmit}
			/>
		</div>
	);
};

export default ShareFileModalContent;
