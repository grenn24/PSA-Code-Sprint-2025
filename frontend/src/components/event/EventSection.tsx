import { Event } from "@common/types/event";
import EventCard from "./EventCard";

interface Prop {
	index: number;
	title: string;
	events: Event[];
	setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}
const EventSection: React.FC<Prop> = ({index, title, events, setEvents }) => {
	return (
		<div className="mb-15 relative">
			<h2 className="text-2xl font-semibold mb-2 text-gray-800">
				{title}
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{events.map((event, index) => (
					<EventCard
						index={index * events.length + index}
						key={event._id}
						event={event}
						setEvent={(newEvent) =>
							setEvents((oldEvents) =>
								oldEvents.map((e) =>
									e._id === newEvent._id ? newEvent : e
								)
							)
						}
					/>
				))}
			</div>
		</div>
	);
};

export default EventSection;
