import { Schema } from "mongoose";
declare const User: import("mongoose").Model<{
    role: "user" | "admin";
    name: string;
    createdAt: NativeDate;
    position: string;
    email: string;
    password: string;
    subordinates: import("mongoose").Types.ObjectId[];
    experienceLevel: number;
    skills: import("mongoose").Types.DocumentArray<{
        level: number;
        name?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        level: number;
        name?: string | null | undefined;
    }> & {
        level: number;
        name?: string | null | undefined;
    }>;
    mentorshipRequests: import("mongoose").Types.DocumentArray<{
        message?: string | null | undefined;
        sender?: import("mongoose").Types.ObjectId | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        message?: string | null | undefined;
        sender?: import("mongoose").Types.ObjectId | null | undefined;
    }> & {
        message?: string | null | undefined;
        sender?: import("mongoose").Types.ObjectId | null | undefined;
    }>;
    mentees: import("mongoose").Types.ObjectId[];
    notifications: import("mongoose").Types.DocumentArray<{
        message: string;
        createdAt: NativeDate;
        read: boolean;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        message: string;
        createdAt: NativeDate;
        read: boolean;
    }> & {
        message: string;
        createdAt: NativeDate;
        read: boolean;
    }>;
    careerPath: import("mongoose").Types.DocumentArray<{
        position: string;
        progress: number;
        skillsRequired: string[];
        startedAt?: NativeDate | null | undefined;
        endedAt?: NativeDate | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        position: string;
        progress: number;
        skillsRequired: string[];
        startedAt?: NativeDate | null | undefined;
        endedAt?: NativeDate | null | undefined;
    }> & {
        position: string;
        progress: number;
        skillsRequired: string[];
        startedAt?: NativeDate | null | undefined;
        endedAt?: NativeDate | null | undefined;
    }>;
    lastSeen: NativeDate;
    isOnline: boolean;
    moods: import("mongoose").Types.DocumentArray<{
        date: NativeDate;
        level: number;
        notes: string[];
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        date: NativeDate;
        level: number;
        notes: string[];
    }> & {
        date: NativeDate;
        level: number;
        notes: string[];
    }>;
    bio?: string | null | undefined;
    supervisor?: import("mongoose").Types.ObjectId | null | undefined;
    avatar?: string | null | undefined;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    role: "user" | "admin";
    name: string;
    createdAt: NativeDate;
    position: string;
    email: string;
    password: string;
    subordinates: import("mongoose").Types.ObjectId[];
    experienceLevel: number;
    skills: import("mongoose").Types.DocumentArray<{
        level: number;
        name?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        level: number;
        name?: string | null | undefined;
    }> & {
        level: number;
        name?: string | null | undefined;
    }>;
    mentorshipRequests: import("mongoose").Types.DocumentArray<{
        message?: string | null | undefined;
        sender?: import("mongoose").Types.ObjectId | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        message?: string | null | undefined;
        sender?: import("mongoose").Types.ObjectId | null | undefined;
    }> & {
        message?: string | null | undefined;
        sender?: import("mongoose").Types.ObjectId | null | undefined;
    }>;
    mentees: import("mongoose").Types.ObjectId[];
    notifications: import("mongoose").Types.DocumentArray<{
        message: string;
        createdAt: NativeDate;
        read: boolean;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        message: string;
        createdAt: NativeDate;
        read: boolean;
    }> & {
        message: string;
        createdAt: NativeDate;
        read: boolean;
    }>;
    careerPath: import("mongoose").Types.DocumentArray<{
        position: string;
        progress: number;
        skillsRequired: string[];
        startedAt?: NativeDate | null | undefined;
        endedAt?: NativeDate | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        position: string;
        progress: number;
        skillsRequired: string[];
        startedAt?: NativeDate | null | undefined;
        endedAt?: NativeDate | null | undefined;
    }> & {
        position: string;
        progress: number;
        skillsRequired: string[];
        startedAt?: NativeDate | null | undefined;
        endedAt?: NativeDate | null | undefined;
    }>;
    lastSeen: NativeDate;
    isOnline: boolean;
    moods: import("mongoose").Types.DocumentArray<{
        date: NativeDate;
        level: number;
        notes: string[];
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        date: NativeDate;
        level: number;
        notes: string[];
    }> & {
        date: NativeDate;
        level: number;
        notes: string[];
    }>;
    bio?: string | null | undefined;
    supervisor?: import("mongoose").Types.ObjectId | null | undefined;
    avatar?: string | null | undefined;
}> & {
    role: "user" | "admin";
    name: string;
    createdAt: NativeDate;
    position: string;
    email: string;
    password: string;
    subordinates: import("mongoose").Types.ObjectId[];
    experienceLevel: number;
    skills: import("mongoose").Types.DocumentArray<{
        level: number;
        name?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        level: number;
        name?: string | null | undefined;
    }> & {
        level: number;
        name?: string | null | undefined;
    }>;
    mentorshipRequests: import("mongoose").Types.DocumentArray<{
        message?: string | null | undefined;
        sender?: import("mongoose").Types.ObjectId | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        message?: string | null | undefined;
        sender?: import("mongoose").Types.ObjectId | null | undefined;
    }> & {
        message?: string | null | undefined;
        sender?: import("mongoose").Types.ObjectId | null | undefined;
    }>;
    mentees: import("mongoose").Types.ObjectId[];
    notifications: import("mongoose").Types.DocumentArray<{
        message: string;
        createdAt: NativeDate;
        read: boolean;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        message: string;
        createdAt: NativeDate;
        read: boolean;
    }> & {
        message: string;
        createdAt: NativeDate;
        read: boolean;
    }>;
    careerPath: import("mongoose").Types.DocumentArray<{
        position: string;
        progress: number;
        skillsRequired: string[];
        startedAt?: NativeDate | null | undefined;
        endedAt?: NativeDate | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        position: string;
        progress: number;
        skillsRequired: string[];
        startedAt?: NativeDate | null | undefined;
        endedAt?: NativeDate | null | undefined;
    }> & {
        position: string;
        progress: number;
        skillsRequired: string[];
        startedAt?: NativeDate | null | undefined;
        endedAt?: NativeDate | null | undefined;
    }>;
    lastSeen: NativeDate;
    isOnline: boolean;
    moods: import("mongoose").Types.DocumentArray<{
        date: NativeDate;
        level: number;
        notes: string[];
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        date: NativeDate;
        level: number;
        notes: string[];
    }> & {
        date: NativeDate;
        level: number;
        notes: string[];
    }>;
    bio?: string | null | undefined;
    supervisor?: import("mongoose").Types.ObjectId | null | undefined;
    avatar?: string | null | undefined;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    role: "user" | "admin";
    name: string;
    createdAt: NativeDate;
    position: string;
    email: string;
    password: string;
    subordinates: import("mongoose").Types.ObjectId[];
    experienceLevel: number;
    skills: import("mongoose").Types.DocumentArray<{
        level: number;
        name?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        level: number;
        name?: string | null | undefined;
    }> & {
        level: number;
        name?: string | null | undefined;
    }>;
    mentorshipRequests: import("mongoose").Types.DocumentArray<{
        message?: string | null | undefined;
        sender?: import("mongoose").Types.ObjectId | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        message?: string | null | undefined;
        sender?: import("mongoose").Types.ObjectId | null | undefined;
    }> & {
        message?: string | null | undefined;
        sender?: import("mongoose").Types.ObjectId | null | undefined;
    }>;
    mentees: import("mongoose").Types.ObjectId[];
    notifications: import("mongoose").Types.DocumentArray<{
        message: string;
        createdAt: NativeDate;
        read: boolean;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        message: string;
        createdAt: NativeDate;
        read: boolean;
    }> & {
        message: string;
        createdAt: NativeDate;
        read: boolean;
    }>;
    careerPath: import("mongoose").Types.DocumentArray<{
        position: string;
        progress: number;
        skillsRequired: string[];
        startedAt?: NativeDate | null | undefined;
        endedAt?: NativeDate | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        position: string;
        progress: number;
        skillsRequired: string[];
        startedAt?: NativeDate | null | undefined;
        endedAt?: NativeDate | null | undefined;
    }> & {
        position: string;
        progress: number;
        skillsRequired: string[];
        startedAt?: NativeDate | null | undefined;
        endedAt?: NativeDate | null | undefined;
    }>;
    lastSeen: NativeDate;
    isOnline: boolean;
    moods: import("mongoose").Types.DocumentArray<{
        date: NativeDate;
        level: number;
        notes: string[];
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        date: NativeDate;
        level: number;
        notes: string[];
    }> & {
        date: NativeDate;
        level: number;
        notes: string[];
    }>;
    bio?: string | null | undefined;
    supervisor?: import("mongoose").Types.ObjectId | null | undefined;
    avatar?: string | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    role: "user" | "admin";
    name: string;
    createdAt: NativeDate;
    position: string;
    email: string;
    password: string;
    subordinates: import("mongoose").Types.ObjectId[];
    experienceLevel: number;
    skills: import("mongoose").Types.DocumentArray<{
        level: number;
        name?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        level: number;
        name?: string | null | undefined;
    }> & {
        level: number;
        name?: string | null | undefined;
    }>;
    mentorshipRequests: import("mongoose").Types.DocumentArray<{
        message?: string | null | undefined;
        sender?: import("mongoose").Types.ObjectId | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        message?: string | null | undefined;
        sender?: import("mongoose").Types.ObjectId | null | undefined;
    }> & {
        message?: string | null | undefined;
        sender?: import("mongoose").Types.ObjectId | null | undefined;
    }>;
    mentees: import("mongoose").Types.ObjectId[];
    notifications: import("mongoose").Types.DocumentArray<{
        message: string;
        createdAt: NativeDate;
        read: boolean;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        message: string;
        createdAt: NativeDate;
        read: boolean;
    }> & {
        message: string;
        createdAt: NativeDate;
        read: boolean;
    }>;
    careerPath: import("mongoose").Types.DocumentArray<{
        position: string;
        progress: number;
        skillsRequired: string[];
        startedAt?: NativeDate | null | undefined;
        endedAt?: NativeDate | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        position: string;
        progress: number;
        skillsRequired: string[];
        startedAt?: NativeDate | null | undefined;
        endedAt?: NativeDate | null | undefined;
    }> & {
        position: string;
        progress: number;
        skillsRequired: string[];
        startedAt?: NativeDate | null | undefined;
        endedAt?: NativeDate | null | undefined;
    }>;
    lastSeen: NativeDate;
    isOnline: boolean;
    moods: import("mongoose").Types.DocumentArray<{
        date: NativeDate;
        level: number;
        notes: string[];
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        date: NativeDate;
        level: number;
        notes: string[];
    }> & {
        date: NativeDate;
        level: number;
        notes: string[];
    }>;
    bio?: string | null | undefined;
    supervisor?: import("mongoose").Types.ObjectId | null | undefined;
    avatar?: string | null | undefined;
}>> & import("mongoose").FlatRecord<{
    role: "user" | "admin";
    name: string;
    createdAt: NativeDate;
    position: string;
    email: string;
    password: string;
    subordinates: import("mongoose").Types.ObjectId[];
    experienceLevel: number;
    skills: import("mongoose").Types.DocumentArray<{
        level: number;
        name?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        level: number;
        name?: string | null | undefined;
    }> & {
        level: number;
        name?: string | null | undefined;
    }>;
    mentorshipRequests: import("mongoose").Types.DocumentArray<{
        message?: string | null | undefined;
        sender?: import("mongoose").Types.ObjectId | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        message?: string | null | undefined;
        sender?: import("mongoose").Types.ObjectId | null | undefined;
    }> & {
        message?: string | null | undefined;
        sender?: import("mongoose").Types.ObjectId | null | undefined;
    }>;
    mentees: import("mongoose").Types.ObjectId[];
    notifications: import("mongoose").Types.DocumentArray<{
        message: string;
        createdAt: NativeDate;
        read: boolean;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        message: string;
        createdAt: NativeDate;
        read: boolean;
    }> & {
        message: string;
        createdAt: NativeDate;
        read: boolean;
    }>;
    careerPath: import("mongoose").Types.DocumentArray<{
        position: string;
        progress: number;
        skillsRequired: string[];
        startedAt?: NativeDate | null | undefined;
        endedAt?: NativeDate | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        position: string;
        progress: number;
        skillsRequired: string[];
        startedAt?: NativeDate | null | undefined;
        endedAt?: NativeDate | null | undefined;
    }> & {
        position: string;
        progress: number;
        skillsRequired: string[];
        startedAt?: NativeDate | null | undefined;
        endedAt?: NativeDate | null | undefined;
    }>;
    lastSeen: NativeDate;
    isOnline: boolean;
    moods: import("mongoose").Types.DocumentArray<{
        date: NativeDate;
        level: number;
        notes: string[];
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        date: NativeDate;
        level: number;
        notes: string[];
    }> & {
        date: NativeDate;
        level: number;
        notes: string[];
    }>;
    bio?: string | null | undefined;
    supervisor?: import("mongoose").Types.ObjectId | null | undefined;
    avatar?: string | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
export default User;
