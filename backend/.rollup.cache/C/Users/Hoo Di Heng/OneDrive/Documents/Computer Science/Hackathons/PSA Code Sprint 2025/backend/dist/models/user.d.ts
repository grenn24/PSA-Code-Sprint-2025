import mongoose from "mongoose";
declare const User: mongoose.Model<{
    name: string;
    email: string;
    position: string;
    role: "user" | "admin";
    password: string;
    subordinates: mongoose.Types.ObjectId[];
    createdAt: NativeDate;
    experienceLevel: number;
    skills: mongoose.Types.DocumentArray<{
        level: number;
        name?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        level: number;
        name?: string | null | undefined;
    }> & {
        level: number;
        name?: string | null | undefined;
    }>;
    mentorshipRequests: mongoose.Types.DocumentArray<{
        message?: string | null | undefined;
        sender?: mongoose.Types.ObjectId | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        message?: string | null | undefined;
        sender?: mongoose.Types.ObjectId | null | undefined;
    }> & {
        message?: string | null | undefined;
        sender?: mongoose.Types.ObjectId | null | undefined;
    }>;
    mentees: mongoose.Types.ObjectId[];
    notifications: mongoose.Types.DocumentArray<{
        createdAt: NativeDate;
        message: string;
        read: boolean;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        createdAt: NativeDate;
        message: string;
        read: boolean;
    }> & {
        createdAt: NativeDate;
        message: string;
        read: boolean;
    }>;
    careerPath: mongoose.Types.DocumentArray<{
        position: string;
        progress: number;
        skillsRequired: string[];
        startedAt?: NativeDate | null | undefined;
        endedAt?: NativeDate | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
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
    bio?: string | null | undefined;
    supervisor?: mongoose.Types.ObjectId | null | undefined;
    avatar?: string | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    name: string;
    email: string;
    position: string;
    role: "user" | "admin";
    password: string;
    subordinates: mongoose.Types.ObjectId[];
    createdAt: NativeDate;
    experienceLevel: number;
    skills: mongoose.Types.DocumentArray<{
        level: number;
        name?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        level: number;
        name?: string | null | undefined;
    }> & {
        level: number;
        name?: string | null | undefined;
    }>;
    mentorshipRequests: mongoose.Types.DocumentArray<{
        message?: string | null | undefined;
        sender?: mongoose.Types.ObjectId | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        message?: string | null | undefined;
        sender?: mongoose.Types.ObjectId | null | undefined;
    }> & {
        message?: string | null | undefined;
        sender?: mongoose.Types.ObjectId | null | undefined;
    }>;
    mentees: mongoose.Types.ObjectId[];
    notifications: mongoose.Types.DocumentArray<{
        createdAt: NativeDate;
        message: string;
        read: boolean;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        createdAt: NativeDate;
        message: string;
        read: boolean;
    }> & {
        createdAt: NativeDate;
        message: string;
        read: boolean;
    }>;
    careerPath: mongoose.Types.DocumentArray<{
        position: string;
        progress: number;
        skillsRequired: string[];
        startedAt?: NativeDate | null | undefined;
        endedAt?: NativeDate | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
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
    bio?: string | null | undefined;
    supervisor?: mongoose.Types.ObjectId | null | undefined;
    avatar?: string | null | undefined;
}> & {
    name: string;
    email: string;
    position: string;
    role: "user" | "admin";
    password: string;
    subordinates: mongoose.Types.ObjectId[];
    createdAt: NativeDate;
    experienceLevel: number;
    skills: mongoose.Types.DocumentArray<{
        level: number;
        name?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        level: number;
        name?: string | null | undefined;
    }> & {
        level: number;
        name?: string | null | undefined;
    }>;
    mentorshipRequests: mongoose.Types.DocumentArray<{
        message?: string | null | undefined;
        sender?: mongoose.Types.ObjectId | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        message?: string | null | undefined;
        sender?: mongoose.Types.ObjectId | null | undefined;
    }> & {
        message?: string | null | undefined;
        sender?: mongoose.Types.ObjectId | null | undefined;
    }>;
    mentees: mongoose.Types.ObjectId[];
    notifications: mongoose.Types.DocumentArray<{
        createdAt: NativeDate;
        message: string;
        read: boolean;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        createdAt: NativeDate;
        message: string;
        read: boolean;
    }> & {
        createdAt: NativeDate;
        message: string;
        read: boolean;
    }>;
    careerPath: mongoose.Types.DocumentArray<{
        position: string;
        progress: number;
        skillsRequired: string[];
        startedAt?: NativeDate | null | undefined;
        endedAt?: NativeDate | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
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
    bio?: string | null | undefined;
    supervisor?: mongoose.Types.ObjectId | null | undefined;
    avatar?: string | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    email: string;
    position: string;
    role: "user" | "admin";
    password: string;
    subordinates: mongoose.Types.ObjectId[];
    createdAt: NativeDate;
    experienceLevel: number;
    skills: mongoose.Types.DocumentArray<{
        level: number;
        name?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        level: number;
        name?: string | null | undefined;
    }> & {
        level: number;
        name?: string | null | undefined;
    }>;
    mentorshipRequests: mongoose.Types.DocumentArray<{
        message?: string | null | undefined;
        sender?: mongoose.Types.ObjectId | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        message?: string | null | undefined;
        sender?: mongoose.Types.ObjectId | null | undefined;
    }> & {
        message?: string | null | undefined;
        sender?: mongoose.Types.ObjectId | null | undefined;
    }>;
    mentees: mongoose.Types.ObjectId[];
    notifications: mongoose.Types.DocumentArray<{
        createdAt: NativeDate;
        message: string;
        read: boolean;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        createdAt: NativeDate;
        message: string;
        read: boolean;
    }> & {
        createdAt: NativeDate;
        message: string;
        read: boolean;
    }>;
    careerPath: mongoose.Types.DocumentArray<{
        position: string;
        progress: number;
        skillsRequired: string[];
        startedAt?: NativeDate | null | undefined;
        endedAt?: NativeDate | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
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
    bio?: string | null | undefined;
    supervisor?: mongoose.Types.ObjectId | null | undefined;
    avatar?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    email: string;
    position: string;
    role: "user" | "admin";
    password: string;
    subordinates: mongoose.Types.ObjectId[];
    createdAt: NativeDate;
    experienceLevel: number;
    skills: mongoose.Types.DocumentArray<{
        level: number;
        name?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        level: number;
        name?: string | null | undefined;
    }> & {
        level: number;
        name?: string | null | undefined;
    }>;
    mentorshipRequests: mongoose.Types.DocumentArray<{
        message?: string | null | undefined;
        sender?: mongoose.Types.ObjectId | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        message?: string | null | undefined;
        sender?: mongoose.Types.ObjectId | null | undefined;
    }> & {
        message?: string | null | undefined;
        sender?: mongoose.Types.ObjectId | null | undefined;
    }>;
    mentees: mongoose.Types.ObjectId[];
    notifications: mongoose.Types.DocumentArray<{
        createdAt: NativeDate;
        message: string;
        read: boolean;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        createdAt: NativeDate;
        message: string;
        read: boolean;
    }> & {
        createdAt: NativeDate;
        message: string;
        read: boolean;
    }>;
    careerPath: mongoose.Types.DocumentArray<{
        position: string;
        progress: number;
        skillsRequired: string[];
        startedAt?: NativeDate | null | undefined;
        endedAt?: NativeDate | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
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
    bio?: string | null | undefined;
    supervisor?: mongoose.Types.ObjectId | null | undefined;
    avatar?: string | null | undefined;
}>> & mongoose.FlatRecord<{
    name: string;
    email: string;
    position: string;
    role: "user" | "admin";
    password: string;
    subordinates: mongoose.Types.ObjectId[];
    createdAt: NativeDate;
    experienceLevel: number;
    skills: mongoose.Types.DocumentArray<{
        level: number;
        name?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        level: number;
        name?: string | null | undefined;
    }> & {
        level: number;
        name?: string | null | undefined;
    }>;
    mentorshipRequests: mongoose.Types.DocumentArray<{
        message?: string | null | undefined;
        sender?: mongoose.Types.ObjectId | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        message?: string | null | undefined;
        sender?: mongoose.Types.ObjectId | null | undefined;
    }> & {
        message?: string | null | undefined;
        sender?: mongoose.Types.ObjectId | null | undefined;
    }>;
    mentees: mongoose.Types.ObjectId[];
    notifications: mongoose.Types.DocumentArray<{
        createdAt: NativeDate;
        message: string;
        read: boolean;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        createdAt: NativeDate;
        message: string;
        read: boolean;
    }> & {
        createdAt: NativeDate;
        message: string;
        read: boolean;
    }>;
    careerPath: mongoose.Types.DocumentArray<{
        position: string;
        progress: number;
        skillsRequired: string[];
        startedAt?: NativeDate | null | undefined;
        endedAt?: NativeDate | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
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
    bio?: string | null | undefined;
    supervisor?: mongoose.Types.ObjectId | null | undefined;
    avatar?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default User;
