import mongoose from "mongoose";
declare class UserService {
    getAllUsers(): Promise<(mongoose.Document<unknown, {}, {
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
            message: string;
            createdAt: NativeDate;
            read: boolean;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            message: string;
            createdAt: NativeDate;
            read: boolean;
        }> & {
            message: string;
            createdAt: NativeDate;
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
        lastSeen: NativeDate;
        isOnline: boolean;
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
            message: string;
            createdAt: NativeDate;
            read: boolean;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            message: string;
            createdAt: NativeDate;
            read: boolean;
        }> & {
            message: string;
            createdAt: NativeDate;
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
        lastSeen: NativeDate;
        isOnline: boolean;
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
            message: string;
            createdAt: NativeDate;
            read: boolean;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            message: string;
            createdAt: NativeDate;
            read: boolean;
        }> & {
            message: string;
            createdAt: NativeDate;
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
        lastSeen: NativeDate;
        isOnline: boolean;
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
            message: string;
            createdAt: NativeDate;
            read: boolean;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            message: string;
            createdAt: NativeDate;
            read: boolean;
        }> & {
            message: string;
            createdAt: NativeDate;
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
        lastSeen: NativeDate;
        isOnline: boolean;
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
            message: string;
            createdAt: NativeDate;
            read: boolean;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            message: string;
            createdAt: NativeDate;
            read: boolean;
        }> & {
            message: string;
            createdAt: NativeDate;
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
        lastSeen: NativeDate;
        isOnline: boolean;
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
            message: string;
            createdAt: NativeDate;
            read: boolean;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            message: string;
            createdAt: NativeDate;
            read: boolean;
        }> & {
            message: string;
            createdAt: NativeDate;
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
        lastSeen: NativeDate;
        isOnline: boolean;
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
            message: string;
            createdAt: NativeDate;
            read: boolean;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            message: string;
            createdAt: NativeDate;
            read: boolean;
        }> & {
            message: string;
            createdAt: NativeDate;
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
        lastSeen: NativeDate;
        isOnline: boolean;
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
            message: string;
            createdAt: NativeDate;
            read: boolean;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            message: string;
            createdAt: NativeDate;
            read: boolean;
        }> & {
            message: string;
            createdAt: NativeDate;
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
        lastSeen: NativeDate;
        isOnline: boolean;
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
            message: string;
            createdAt: NativeDate;
            read: boolean;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            message: string;
            createdAt: NativeDate;
            read: boolean;
        }> & {
            message: string;
            createdAt: NativeDate;
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
        lastSeen: NativeDate;
        isOnline: boolean;
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
            message: string;
            createdAt: NativeDate;
            read: boolean;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            message: string;
            createdAt: NativeDate;
            read: boolean;
        }> & {
            message: string;
            createdAt: NativeDate;
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
        lastSeen: NativeDate;
        isOnline: boolean;
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
        createdAt: NativeDate;
        messages: mongoose.Types.DocumentArray<{
            type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
            metadata: any;
            createdAt: NativeDate;
            sender: mongoose.Types.ObjectId;
            read: boolean;
            content: string;
            readAt?: NativeDate | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
            metadata: any;
            createdAt: NativeDate;
            sender: mongoose.Types.ObjectId;
            read: boolean;
            content: string;
            readAt?: NativeDate | null | undefined;
        }> & {
            type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
            metadata: any;
            createdAt: NativeDate;
            sender: mongoose.Types.ObjectId;
            read: boolean;
            content: string;
            readAt?: NativeDate | null | undefined;
        }>;
        participants: mongoose.Types.ObjectId[];
    }> & {
        createdAt: NativeDate;
        messages: mongoose.Types.DocumentArray<{
            type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
            metadata: any;
            createdAt: NativeDate;
            sender: mongoose.Types.ObjectId;
            read: boolean;
            content: string;
            readAt?: NativeDate | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
            metadata: any;
            createdAt: NativeDate;
            sender: mongoose.Types.ObjectId;
            read: boolean;
            content: string;
            readAt?: NativeDate | null | undefined;
        }> & {
            type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
            metadata: any;
            createdAt: NativeDate;
            sender: mongoose.Types.ObjectId;
            read: boolean;
            content: string;
            readAt?: NativeDate | null | undefined;
        }>;
        participants: mongoose.Types.ObjectId[];
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getNotifications(userID: string): Promise<mongoose.Types.DocumentArray<{
        message: string;
        createdAt: NativeDate;
        read: boolean;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        message: string;
        createdAt: NativeDate;
        read: boolean;
    }> & {
        message: string;
        createdAt: NativeDate;
        read: boolean;
    }>>;
    getWBConversations(userID: string): Promise<(mongoose.Document<unknown, {}, {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        user: mongoose.Types.ObjectId;
        title: string;
        messages: mongoose.Types.DocumentArray<{
            role: "user" | "assistant";
            content: string;
            timestamp: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            role: "user" | "assistant";
            content: string;
            timestamp: NativeDate;
        }> & {
            role: "user" | "assistant";
            content: string;
            timestamp: NativeDate;
        }>;
    }> & {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        user: mongoose.Types.ObjectId;
        title: string;
        messages: mongoose.Types.DocumentArray<{
            role: "user" | "assistant";
            content: string;
            timestamp: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            role: "user" | "assistant";
            content: string;
            timestamp: NativeDate;
        }> & {
            role: "user" | "assistant";
            content: string;
            timestamp: NativeDate;
        }>;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getTopMatchedMentors(userId: string, limit?: number, page?: number): Promise<(mongoose.Document<unknown, {}, {
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
            message: string;
            createdAt: NativeDate;
            read: boolean;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            message: string;
            createdAt: NativeDate;
            read: boolean;
        }> & {
            message: string;
            createdAt: NativeDate;
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
        lastSeen: NativeDate;
        isOnline: boolean;
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
            message: string;
            createdAt: NativeDate;
            read: boolean;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            message: string;
            createdAt: NativeDate;
            read: boolean;
        }> & {
            message: string;
            createdAt: NativeDate;
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
        lastSeen: NativeDate;
        isOnline: boolean;
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
