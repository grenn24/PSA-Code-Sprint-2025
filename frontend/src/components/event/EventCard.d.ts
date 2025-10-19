import { Event } from "@common/types/event";
interface Prop {
    index: number;
    event: Event;
    setEvent: (event: Event) => void;
}
declare const EventCard: React.FC<Prop>;
export default EventCard;
