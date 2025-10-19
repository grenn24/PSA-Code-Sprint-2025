import { S3File } from "./file";
import { User } from "./user";
export interface Event {
    _id?: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    categories: string[];
    mode: "online" | "offline";
    location?: string;
    creator: User;
    participants: User[] | string[];
    coverImage?: S3File;
    comments: {
        _id?: string;
        content: string;
        author: User;
        createdAt: Date;
    }[];
}
//# sourceMappingURL=event.d.ts.map