import { Event } from "@common/types/event";
interface Prop {
    index: number;
    title: string;
    events: Event[];
    setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}
declare const EventSection: React.FC<Prop>;
export default EventSection;
