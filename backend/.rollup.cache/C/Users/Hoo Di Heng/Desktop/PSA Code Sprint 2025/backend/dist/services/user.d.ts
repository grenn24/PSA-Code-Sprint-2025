import mongoose from "mongoose";
declare class UserService {
    getAllUsers(): Promise<(mongoose.Document<unknown, {}, {
        name: string;
        createdAt: NativeDate;
        position: string;
        email: string;
        role: "user" | "admin";
        password: string;
        subordinates: mongoose.Types.ObjectId[];
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
            sender?: mongoose.Types.ObjectId | null | undefined;
            message?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            sender?: mongoose.Types.ObjectId | null | undefined;
            message?: string | null | undefined;
        }> & {
            sender?: mongoose.Types.ObjectId | null | undefined;
            message?: string | null | undefined;
        }>;
        mentees: mongoose.Types.ObjectId[];
        notifications: mongoose.Types.DocumentArray<{
            createdAt: NativeDate;
            read: boolean;
            message: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            createdAt: NativeDate;
            read: boolean;
            message: string;
        }> & {
            createdAt: NativeDate;
            read: boolean;
            message: string;
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
        lastSeen: NativeDate;
        isOnline: boolean;
        moods: mongoose.Types.DocumentArray<{
            date: NativeDate;
            level: number;
            notes: string[];
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            level: number;
            notes: string[];
        }> & {
            date: NativeDate;
            level: number;
            notes: string[];
        }>;
        bio?: string | null | undefined;
        supervisor?: mongoose.Types.ObjectId | null | undefined;
        avatar?: string | null | undefined;
    }> & {
        name: string;
        createdAt: NativeDate;
        position: string;
        email: string;
        role: "user" | "admin";
        password: string;
        subordinates: mongoose.Types.ObjectId[];
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
            sender?: mongoose.Types.ObjectId | null | undefined;
            message?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            sender?: mongoose.Types.ObjectId | null | undefined;
            message?: string | null | undefined;
        }> & {
            sender?: mongoose.Types.ObjectId | null | undefined;
            message?: string | null | undefined;
        }>;
        mentees: mongoose.Types.ObjectId[];
        notifications: mongoose.Types.DocumentArray<{
            createdAt: NativeDate;
            read: boolean;
            message: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            createdAt: NativeDate;
            read: boolean;
            message: string;
        }> & {
            createdAt: NativeDate;
            read: boolean;
            message: string;
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
        lastSeen: NativeDate;
        isOnline: boolean;
        moods: mongoose.Types.DocumentArray<{
            date: NativeDate;
            level: number;
            notes: string[];
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            level: number;
            notes: string[];
        }> & {
            date: NativeDate;
            level: number;
            notes: string[];
        }>;
        bio?: string | null | undefined;
        supervisor?: mongoose.Types.ObjectId | null | undefined;
        avatar?: string | null | undefined;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    createUser(userData: any): Promise<mongoose.Document<unknown, {}, {
        name: string;
        createdAt: NativeDate;
        position: string;
        email: string;
        role: "user" | "admin";
        password: string;
        subordinates: mongoose.Types.ObjectId[];
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
            sender?: mongoose.Types.ObjectId | null | undefined;
            message?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            sender?: mongoose.Types.ObjectId | null | undefined;
            message?: string | null | undefined;
        }> & {
            sender?: mongoose.Types.ObjectId | null | undefined;
            message?: string | null | undefined;
        }>;
        mentees: mongoose.Types.ObjectId[];
        notifications: mongoose.Types.DocumentArray<{
            createdAt: NativeDate;
            read: boolean;
            message: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            createdAt: NativeDate;
            read: boolean;
            message: string;
        }> & {
            createdAt: NativeDate;
            read: boolean;
            message: string;
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
        lastSeen: NativeDate;
        isOnline: boolean;
        moods: mongoose.Types.DocumentArray<{
            date: NativeDate;
            level: number;
            notes: string[];
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            level: number;
            notes: string[];
        }> & {
            date: NativeDate;
            level: number;
            notes: string[];
        }>;
        bio?: string | null | undefined;
        supervisor?: mongoose.Types.ObjectId | null | undefined;
        avatar?: string | null | undefined;
    }> & {
        name: string;
        createdAt: NativeDate;
        position: string;
        email: string;
        role: "user" | "admin";
        password: string;
        subordinates: mongoose.Types.ObjectId[];
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
            sender?: mongoose.Types.ObjectId | null | undefined;
            message?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            sender?: mongoose.Types.ObjectId | null | undefined;
            message?: string | null | undefined;
        }> & {
            sender?: mongoose.Types.ObjectId | null | undefined;
            message?: string | null | undefined;
        }>;
        mentees: mongoose.Types.ObjectId[];
        notifications: mongoose.Types.DocumentArray<{
            createdAt: NativeDate;
            read: boolean;
            message: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            createdAt: NativeDate;
            read: boolean;
            message: string;
        }> & {
            createdAt: NativeDate;
            read: boolean;
            message: string;
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
        lastSeen: NativeDate;
        isOnline: boolean;
        moods: mongoose.Types.DocumentArray<{
            date: NativeDate;
            level: number;
            notes: string[];
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            level: number;
            notes: string[];
        }> & {
            date: NativeDate;
            level: number;
            notes: string[];
        }>;
        bio?: string | null | undefined;
        supervisor?: mongoose.Types.ObjectId | null | undefined;
        avatar?: string | null | undefined;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    getUserByID(userId: any): Promise<mongoose.Document<unknown, {}, {
        name: string;
        createdAt: NativeDate;
        position: string;
        email: string;
        role: "user" | "admin";
        password: string;
        subordinates: mongoose.Types.ObjectId[];
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
            sender?: mongoose.Types.ObjectId | null | undefined;
            message?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            sender?: mongoose.Types.ObjectId | null | undefined;
            message?: string | null | undefined;
        }> & {
            sender?: mongoose.Types.ObjectId | null | undefined;
            message?: string | null | undefined;
        }>;
        mentees: mongoose.Types.ObjectId[];
        notifications: mongoose.Types.DocumentArray<{
            createdAt: NativeDate;
            read: boolean;
            message: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            createdAt: NativeDate;
            read: boolean;
            message: string;
        }> & {
            createdAt: NativeDate;
            read: boolean;
            message: string;
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
        lastSeen: NativeDate;
        isOnline: boolean;
        moods: mongoose.Types.DocumentArray<{
            date: NativeDate;
            level: number;
            notes: string[];
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            level: number;
            notes: string[];
        }> & {
            date: NativeDate;
            level: number;
            notes: string[];
        }>;
        bio?: string | null | undefined;
        supervisor?: mongoose.Types.ObjectId | null | undefined;
        avatar?: string | null | undefined;
    }> & {
        name: string;
        createdAt: NativeDate;
        position: string;
        email: string;
        role: "user" | "admin";
        password: string;
        subordinates: mongoose.Types.ObjectId[];
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
            sender?: mongoose.Types.ObjectId | null | undefined;
            message?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            sender?: mongoose.Types.ObjectId | null | undefined;
            message?: string | null | undefined;
        }> & {
            sender?: mongoose.Types.ObjectId | null | undefined;
            message?: string | null | undefined;
        }>;
        mentees: mongoose.Types.ObjectId[];
        notifications: mongoose.Types.DocumentArray<{
            createdAt: NativeDate;
            read: boolean;
            message: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            createdAt: NativeDate;
            read: boolean;
            message: string;
        }> & {
            createdAt: NativeDate;
            read: boolean;
            message: string;
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
        lastSeen: NativeDate;
        isOnline: boolean;
        moods: mongoose.Types.DocumentArray<{
            date: NativeDate;
            level: number;
            notes: string[];
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            level: number;
            notes: string[];
        }> & {
            date: NativeDate;
            level: number;
            notes: string[];
        }>;
        bio?: string | null | undefined;
        supervisor?: mongoose.Types.ObjectId | null | undefined;
        avatar?: string | null | undefined;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateUser(userId: any, userData: any): Promise<(mongoose.Document<unknown, {}, {
        name: string;
        createdAt: NativeDate;
        position: string;
        email: string;
        role: "user" | "admin";
        password: string;
        subordinates: mongoose.Types.ObjectId[];
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
            sender?: mongoose.Types.ObjectId | null | undefined;
            message?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            sender?: mongoose.Types.ObjectId | null | undefined;
            message?: string | null | undefined;
        }> & {
            sender?: mongoose.Types.ObjectId | null | undefined;
            message?: string | null | undefined;
        }>;
        mentees: mongoose.Types.ObjectId[];
        notifications: mongoose.Types.DocumentArray<{
            createdAt: NativeDate;
            read: boolean;
            message: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            createdAt: NativeDate;
            read: boolean;
            message: string;
        }> & {
            createdAt: NativeDate;
            read: boolean;
            message: string;
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
        lastSeen: NativeDate;
        isOnline: boolean;
        moods: mongoose.Types.DocumentArray<{
            date: NativeDate;
            level: number;
            notes: string[];
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            level: number;
            notes: string[];
        }> & {
            date: NativeDate;
            level: number;
            notes: string[];
        }>;
        bio?: string | null | undefined;
        supervisor?: mongoose.Types.ObjectId | null | undefined;
        avatar?: string | null | undefined;
    }> & {
        name: string;
        createdAt: NativeDate;
        position: string;
        email: string;
        role: "user" | "admin";
        password: string;
        subordinates: mongoose.Types.ObjectId[];
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
            sender?: mongoose.Types.ObjectId | null | undefined;
            message?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            sender?: mongoose.Types.ObjectId | null | undefined;
            message?: string | null | undefined;
        }> & {
            sender?: mongoose.Types.ObjectId | null | undefined;
            message?: string | null | undefined;
        }>;
        mentees: mongoose.Types.ObjectId[];
        notifications: mongoose.Types.DocumentArray<{
            createdAt: NativeDate;
            read: boolean;
            message: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            createdAt: NativeDate;
            read: boolean;
            message: string;
        }> & {
            createdAt: NativeDate;
            read: boolean;
            message: string;
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
        lastSeen: NativeDate;
        isOnline: boolean;
        moods: mongoose.Types.DocumentArray<{
            date: NativeDate;
            level: number;
            notes: string[];
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            level: number;
            notes: string[];
        }> & {
            date: NativeDate;
            level: number;
            notes: string[];
        }>;
        bio?: string | null | undefined;
        supervisor?: mongoose.Types.ObjectId | null | undefined;
        avatar?: string | null | undefined;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    addNotification(userId: string, message: string): Promise<mongoose.Document<unknown, {}, {
        name: string;
        createdAt: NativeDate;
        position: string;
        email: string;
        role: "user" | "admin";
        password: string;
        subordinates: mongoose.Types.ObjectId[];
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
            sender?: mongoose.Types.ObjectId | null | undefined;
            message?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            sender?: mongoose.Types.ObjectId | null | undefined;
            message?: string | null | undefined;
        }> & {
            sender?: mongoose.Types.ObjectId | null | undefined;
            message?: string | null | undefined;
        }>;
        mentees: mongoose.Types.ObjectId[];
        notifications: mongoose.Types.DocumentArray<{
            createdAt: NativeDate;
            read: boolean;
            message: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            createdAt: NativeDate;
            read: boolean;
            message: string;
        }> & {
            createdAt: NativeDate;
            read: boolean;
            message: string;
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
        lastSeen: NativeDate;
        isOnline: boolean;
        moods: mongoose.Types.DocumentArray<{
            date: NativeDate;
            level: number;
            notes: string[];
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            level: number;
            notes: string[];
        }> & {
            date: NativeDate;
            level: number;
            notes: string[];
        }>;
        bio?: string | null | undefined;
        supervisor?: mongoose.Types.ObjectId | null | undefined;
        avatar?: string | null | undefined;
    }> & {
        name: string;
        createdAt: NativeDate;
        position: string;
        email: string;
        role: "user" | "admin";
        password: string;
        subordinates: mongoose.Types.ObjectId[];
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
            sender?: mongoose.Types.ObjectId | null | undefined;
            message?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            sender?: mongoose.Types.ObjectId | null | undefined;
            message?: string | null | undefined;
        }> & {
            sender?: mongoose.Types.ObjectId | null | undefined;
            message?: string | null | undefined;
        }>;
        mentees: mongoose.Types.ObjectId[];
        notifications: mongoose.Types.DocumentArray<{
            createdAt: NativeDate;
            read: boolean;
            message: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            createdAt: NativeDate;
            read: boolean;
            message: string;
        }> & {
            createdAt: NativeDate;
            read: boolean;
            message: string;
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
        lastSeen: NativeDate;
        isOnline: boolean;
        moods: mongoose.Types.DocumentArray<{
            date: NativeDate;
            level: number;
            notes: string[];
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            level: number;
            notes: string[];
        }> & {
            date: NativeDate;
            level: number;
            notes: string[];
        }>;
        bio?: string | null | undefined;
        supervisor?: mongoose.Types.ObjectId | null | undefined;
        avatar?: string | null | undefined;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    sendMentorshipRequest(senderID: string, mentorID: string, message?: string): Promise<void>;
    getChats(userID: string): Promise<(mongoose.Document<unknown, {}, {
        participants: mongoose.Types.ObjectId[];
        messages: mongoose.Types.DocumentArray<{
            type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
            content: string;
            sender: mongoose.Types.ObjectId;
            createdAt: NativeDate;
            read: boolean;
            metadata: any;
            readAt?: NativeDate | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
            content: string;
            sender: mongoose.Types.ObjectId;
            createdAt: NativeDate;
            read: boolean;
            metadata: any;
            readAt?: NativeDate | null | undefined;
        }> & {
            type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
            content: string;
            sender: mongoose.Types.ObjectId;
            createdAt: NativeDate;
            read: boolean;
            metadata: any;
            readAt?: NativeDate | null | undefined;
        }>;
        createdAt: NativeDate;
    }> & {
        participants: mongoose.Types.ObjectId[];
        messages: mongoose.Types.DocumentArray<{
            type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
            content: string;
            sender: mongoose.Types.ObjectId;
            createdAt: NativeDate;
            read: boolean;
            metadata: any;
            readAt?: NativeDate | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
            content: string;
            sender: mongoose.Types.ObjectId;
            createdAt: NativeDate;
            read: boolean;
            metadata: any;
            readAt?: NativeDate | null | undefined;
        }> & {
            type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
            content: string;
            sender: mongoose.Types.ObjectId;
            createdAt: NativeDate;
            read: boolean;
            metadata: any;
            readAt?: NativeDate | null | undefined;
        }>;
        createdAt: NativeDate;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getNotifications(userID: string): Promise<mongoose.Types.DocumentArray<{
        createdAt: NativeDate;
        read: boolean;
        message: string;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        createdAt: NativeDate;
        read: boolean;
        message: string;
    }> & {
        createdAt: NativeDate;
        read: boolean;
        message: string;
    }>>;
    getWBConversations(userID: string): Promise<(mongoose.Document<unknown, {}, {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        messages: mongoose.Types.DocumentArray<{
            content: string;
            role: "user" | "assistant";
            timestamp: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            content: string;
            role: "user" | "assistant";
            timestamp: NativeDate;
        }> & {
            content: string;
            role: "user" | "assistant";
            timestamp: NativeDate;
        }>;
        user: mongoose.Types.ObjectId;
        title: string;
    }> & {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        messages: mongoose.Types.DocumentArray<{
            content: string;
            role: "user" | "assistant";
            timestamp: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            content: string;
            role: "user" | "assistant";
            timestamp: NativeDate;
        }> & {
            content: string;
            role: "user" | "assistant";
            timestamp: NativeDate;
        }>;
        user: mongoose.Types.ObjectId;
        title: string;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getTopMatchedMentors(userId: string, limit?: number, page?: number): Promise<(mongoose.Document<unknown, {}, {
        name: string;
        createdAt: NativeDate;
        position: string;
        email: string;
        role: "user" | "admin";
        password: string;
        subordinates: mongoose.Types.ObjectId[];
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
            sender?: mongoose.Types.ObjectId | null | undefined;
            message?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            sender?: mongoose.Types.ObjectId | null | undefined;
            message?: string | null | undefined;
        }> & {
            sender?: mongoose.Types.ObjectId | null | undefined;
            message?: string | null | undefined;
        }>;
        mentees: mongoose.Types.ObjectId[];
        notifications: mongoose.Types.DocumentArray<{
            createdAt: NativeDate;
            read: boolean;
            message: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            createdAt: NativeDate;
            read: boolean;
            message: string;
        }> & {
            createdAt: NativeDate;
            read: boolean;
            message: string;
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
        lastSeen: NativeDate;
        isOnline: boolean;
        moods: mongoose.Types.DocumentArray<{
            date: NativeDate;
            level: number;
            notes: string[];
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            level: number;
            notes: string[];
        }> & {
            date: NativeDate;
            level: number;
            notes: string[];
        }>;
        bio?: string | null | undefined;
        supervisor?: mongoose.Types.ObjectId | null | undefined;
        avatar?: string | null | undefined;
    }> & {
        name: string;
        createdAt: NativeDate;
        position: string;
        email: string;
        role: "user" | "admin";
        password: string;
        subordinates: mongoose.Types.ObjectId[];
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
            sender?: mongoose.Types.ObjectId | null | undefined;
            message?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            sender?: mongoose.Types.ObjectId | null | undefined;
            message?: string | null | undefined;
        }> & {
            sender?: mongoose.Types.ObjectId | null | undefined;
            message?: string | null | undefined;
        }>;
        mentees: mongoose.Types.ObjectId[];
        notifications: mongoose.Types.DocumentArray<{
            createdAt: NativeDate;
            read: boolean;
            message: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            createdAt: NativeDate;
            read: boolean;
            message: string;
        }> & {
            createdAt: NativeDate;
            read: boolean;
            message: string;
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
        lastSeen: NativeDate;
        isOnline: boolean;
        moods: mongoose.Types.DocumentArray<{
            date: NativeDate;
            level: number;
            notes: string[];
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            level: number;
            notes: string[];
        }> & {
            date: NativeDate;
            level: number;
            notes: string[];
        }>;
        bio?: string | null | undefined;
        supervisor?: mongoose.Types.ObjectId | null | undefined;
        avatar?: string | null | undefined;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    private calculateSkillAlignment;
    private calculateCareerPathSimilarity;
    deleteAllUsers(): Promise<mongoose.mongo.DeleteResult>;
}
declare const userService: UserService;
export default userService;
