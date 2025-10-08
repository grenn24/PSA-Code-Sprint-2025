import { JSX, useEffect, useRef } from "react";

interface Prop {
	children?: JSX.Element;
	onFileSubmit: (files: FileList) => void;
	acceptedFileTypes?: string;
	multiple?: boolean;
	openInput: boolean; // controlled prop
	setOpenInput: (value: boolean) => void; // controlled callback
}

export default function FileInput({
	children,
	onFileSubmit,
	multiple,
	acceptedFileTypes = "*/*",
	openInput,
	setOpenInput,
}: Prop) {
	const fileInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (openInput) {
			fileInputRef.current?.click();
			setOpenInput(false);
		}
	}, [openInput, setOpenInput]);

	return (
		<>
			<input
				type="file"
				ref={fileInputRef}
				onChange={(event) => {
					if (!event.target.files) return;
					onFileSubmit(event.target.files);
					event.target.value = ""; // reset input
				}}
				accept={acceptedFileTypes}
				multiple={multiple}
				className="absolute bottom-0 left-0 w-px h-px overflow-hidden whitespace-nowrap clip-[rect(0,0,0,0)] [clip-path:inset(50%)]"
			/>
			<div onClick={() => setOpenInput(true)} className="cursor-pointer">
				{children}
			</div>
		</>
	);
}
