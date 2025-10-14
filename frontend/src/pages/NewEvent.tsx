import React, { useState } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { Calendar, MapPin, Image } from "lucide-react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import eventService from "services/event";
import { useAppSelector } from "redux/store";

const defaultCategories = ["Workshop", "Wellness", "Tech", "Training"];

const NewEvent: React.FC = () => {
	const navigate = useNavigate();
	const { user } = useAppSelector((state) => state.user);

	// Form state
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [startDate, setStartDate] = useState(
		dayjs().format("YYYY-MM-DDTHH:mm")
	);
	const [endDate, setEndDate] = useState(
		dayjs().add(1, "hour").format("YYYY-MM-DDTHH:mm")
	);
	const [categories, setCategories] = useState<string[]>([]);
	const [customCategory, setCustomCategory] = useState("");
	const [allCategories, setAllCategories] = useState(defaultCategories);
	const [mode, setMode] = useState<"online" | "offline">("online");
	const [location, setLocation] = useState("");
	const [coverImage, setCoverImage] = useState<File | null>(null);

	// Validation errors
	const [errors, setErrors] = useState<{
		title?: string;
		description?: string;
		startDate?: string;
		endDate?: string;
		mode?: string;
	}>({});

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.[0]) setCoverImage(e.target.files[0]);
	};

	const toggleCategory = (cat: string) => {
		if (categories.includes(cat))
			setCategories(categories.filter((c) => c !== cat));
		else setCategories([...categories, cat]);
	};

	const addCustomCategory = () => {
		if (customCategory && !allCategories.includes(customCategory)) {
			setAllCategories([...allCategories, customCategory]);
			setCategories([...categories, customCategory]);
			setCustomCategory("");
		}
	};

	const handleSubmit = async () => {
		// Validate required fields
		const newErrors: typeof errors = {};
		if (!title.trim()) newErrors.title = "Title is required";
		if (!description.trim())
			newErrors.description = "Description is required";
		if (!startDate) newErrors.startDate = "Start date is required";
		if (!endDate) newErrors.endDate = "End date is required";
		if (!mode) newErrors.mode = "Mode is required";

		setErrors(newErrors);

		if (Object.keys(newErrors).length > 0) return; // Stop if errors

		const newEvent = {
			title,
			description,
			startDate,
			endDate,
			categories,
			location,
			mode,
			coverImage,
			creator: user?._id,
		};

		try {
			await eventService.createEvent(newEvent);
			navigate("/events-hub");
		} catch (err) {
			console.error("Error creating event:", err);
		}
	};

	return (
		<div className="w-full h-full min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 overflow-auto p-6">
			{/* Header */}
			<div className="flex items-center justify-between mb-6">
				<button
					onClick={() => navigate("/events-hub")}
					className="flex items-center gap-2 text-blue-500 hover:text-blue-600 font-semibold"
				>
					<IoArrowBack size={20} />
					Back
				</button>
			</div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="w-full"
			>
				{/* Title & Mode */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
					<div className="relative">
						<label className="block text-gray-700 font-medium mb-1">
							Title <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Event Title"
							className={`w-full border px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 backdrop-blur-sm rounded-2xl bg-white/60 ${
								errors.title
									? "border-red-500 focus:ring-red-400"
									: "border-white/30 focus:ring-indigo-400"
							}`}
						/>
						{errors.title && (
							<p className="text-red-500 text-sm mt-1">
								{errors.title}
							</p>
						)}
					</div>

					<div className="relative">
						<label className="block text-gray-700 font-medium mb-1">
							Mode <span className="text-red-500">*</span>
						</label>
						<select
							value={mode}
							onChange={(e) =>
								setMode(e.target.value as "online" | "offline")
							}
							className={`w-full border px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 backdrop-blur-sm rounded-2xl bg-white/60 ${
								errors.mode
									? "border-red-500 focus:ring-red-400"
									: "border-white/30 focus:ring-indigo-400"
							}`}
						>
							<option value="online">Online</option>
							<option value="offline">Offline</option>
						</select>
						{errors.mode && (
							<p className="text-red-500 text-sm mt-1">
								{errors.mode}
							</p>
						)}
					</div>
				</div>
				{/* Description */}
				<div className="mt-3">
					<label className="block text-gray-700 font-medium mb-1">
						Description <span className="text-red-500">*</span>
					</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Event Description"
						rows={4}
						className={`w-full border px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 backdrop-blur-sm rounded-2xl bg-white/60 ${
							errors.description
								? "border-red-500 focus:ring-red-400"
								: "border-white/30 focus:ring-indigo-400"
						}`}
					/>
					{errors.description && (
						<p className="text-red-500 text-sm mt-1">
							{errors.description}
						</p>
					)}
				</div>
				{/* Dates */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
					<div className="relative">
						<label className="block text-gray-700 font-medium mb-1">
							Start Date <span className="text-red-500">*</span>
						</label>
						<input
							type="datetime-local"
							value={startDate}
							onChange={(e) => setStartDate(e.target.value)}
							className={`w-full border pl-3 py-3 text-gray-900 focus:outline-none focus:ring-2 backdrop-blur-sm rounded-2xl bg-white/60 ${
								errors.startDate
									? "border-red-500 focus:ring-red-400"
									: "border-white/30 focus:ring-indigo-400"
							}`}
						/>
						{errors.startDate && (
							<p className="text-red-500 text-sm mt-1">
								{errors.startDate}
							</p>
						)}
					</div>

					<div className="relative">
						<label className="block text-gray-700 font-medium mb-1">
							End Date <span className="text-red-500">*</span>
						</label>
						<input
							type="datetime-local"
							value={endDate}
							onChange={(e) => setEndDate(e.target.value)}
							className={`w-full border pl-3 py-3 text-gray-900 focus:outline-none focus:ring-2 backdrop-blur-sm rounded-2xl bg-white/60 ${
								errors.endDate
									? "border-red-500 focus:ring-red-400"
									: "border-white/30 focus:ring-indigo-400"
							}`}
						/>
						{errors.endDate && (
							<p className="text-red-500 text-sm mt-1">
								{errors.endDate}
							</p>
						)}
					</div>
				</div>
				{/* Categories */}
				<div className="mt-8">
					<label className="text-gray-700 font-medium mb-2 block">
						Categories
					</label>
					<div className="flex flex-wrap gap-2">
						{allCategories.map((cat) => (
							<button
								key={cat}
								type="button"
								onClick={() => toggleCategory(cat)}
								className={`px-3 py-1 rounded-full transition ${
									categories.includes(cat)
										? "bg-indigo-600 text-white"
										: "bg-white/60 text-gray-700 hover:bg-indigo-50/30"
								}`}
							>
								{cat}
							</button>
						))}
					</div>
					{/* Add custom category */}
					<div className="flex gap-2 mt-2">
						<input
							type="text"
							value={customCategory}
							onChange={(e) => setCustomCategory(e.target.value)}
							placeholder="Add category"
							className="flex-1 rounded-3xl bg-white/60 px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 backdrop-blur-sm"
						/>
						<button
							onClick={addCustomCategory}
							className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-500 transition"
						>
							Add
						</button>
					</div>
				</div>
				{/* Location */}
				{mode === "offline" && (
					<div className="mt-8">
						<label className="text-gray-700 font-medium mb-2 block">
							Location
						</label>
						<div className="relative mt-4">
							<MapPin
								className="absolute left-3 top-3.5 text-gray-900 z-1"
								size={20}
							/>
							<input
								type="text"
								value={location}
								onChange={(e) => setLocation(e.target.value)}
								placeholder="Location"
								className="w-full border border-white/30 rounded-2xl bg-white/60 pl-10 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 backdrop-blur-sm"
							/>
						</div>
					</div>
				)}
				{/* Cover Image */}
				<div className="mt-8">
					<label className="flex items-center gap-2 mb-2 font-medium text-gray-700">
						<Image size={20} className="text-gray-400" /> Cover
						Image
					</label>
					<div
						onDragOver={(e) => e.preventDefault()}
						onDrop={(e) => {
							e.preventDefault();
							if (
								e.dataTransfer.files &&
								e.dataTransfer.files[0]
							) {
								handleFileChange({
									target: { files: e.dataTransfer.files },
								} as any);
							}
						}}
						className="w-full h-40 rounded-xl border-2 border-dashed border-gray-300 bg-white/30 backdrop-blur-sm p-6 flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:border-indigo-500 hover:text-indigo-500 transition"
					>
						<p className="mb-2">Drag & drop an image here</p>
					</div>
					{coverImage && (
						<p className="mt-2 text-sm text-gray-600">
							{coverImage.name}
						</p>
					)}
				</div>
				{/* Submit */}
				<motion.button
					whileHover={{ scale: 1.02 }}
					onClick={handleSubmit}
					className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-full font-medium hover:bg-indigo-500 transition"
				>
					Create Event
				</motion.button>
			</motion.div>
		</div>
	);
};

export default NewEvent;
