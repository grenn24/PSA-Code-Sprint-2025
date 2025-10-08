import { Schema } from "mongoose";
declare const User: import("mongoose").Model<{
    name: string;
    email: string;
    position: string;
    role: "user" | "admin";
    password: string;
    subordinates: import("mongoose").Types.ObjectId[];
    createdAt: NativeDate;
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
        createdAt: NativeDate;
        message: string;
        read: boolean;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        createdAt: NativeDate;
        message: string;
        read: boolean;
    }> & {
        createdAt: NativeDate;
        message: string;
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
    name: string;
    email: string;
    position: string;
    role: "user" | "admin";
    password: string;
    subordinates: import("mongoose").Types.ObjectId[];
    createdAt: NativeDate;
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
        createdAt: NativeDate;
        message: string;
        read: boolean;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        createdAt: NativeDate;
        message: string;
        read: boolean;
    }> & {
        createdAt: NativeDate;
        message: string;
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
    name: string;
    email: string;
    position: string;
    role: "user" | "admin";
    password: string;
    subordinates: import("mongoose").Types.ObjectId[];
    createdAt: NativeDate;
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
        createdAt: NativeDate;
        message: string;
        read: boolean;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        createdAt: NativeDate;
        message: string;
        read: boolean;
    }> & {
        createdAt: NativeDate;
        message: string;
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
    name: string;
    email: string;
    position: string;
    role: "user" | "admin";
    password: string;
    subordinates: import("mongoose").Types.ObjectId[];
    createdAt: NativeDate;
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
        createdAt: NativeDate;
        message: string;
        read: boolean;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        createdAt: NativeDate;
        message: string;
        read: boolean;
    }> & {
        createdAt: NativeDate;
        message: string;
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
    name: string;
    email: string;
    position: string;
    role: "user" | "admin";
    password: string;
    subordinates: import("mongoose").Types.ObjectId[];
    createdAt: NativeDate;
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
        createdAt: NativeDate;
        message: string;
        read: boolean;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        createdAt: NativeDate;
        message: string;
        read: boolean;
    }> & {
        createdAt: NativeDate;
        message: string;
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
    name: string;
    email: string;
    position: string;
    role: "user" | "admin";
    password: string;
    subordinates: import("mongoose").Types.ObjectId[];
    createdAt: NativeDate;
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
        createdAt: NativeDate;
        message: string;
        read: boolean;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        createdAt: NativeDate;
        message: string;
        read: boolean;
    }> & {
        createdAt: NativeDate;
        message: string;
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
