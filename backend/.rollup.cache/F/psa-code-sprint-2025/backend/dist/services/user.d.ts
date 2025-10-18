import mongoose from "mongoose";
import { Position as PositionType, Skill } from "@common/types/user.js";
declare class UserService {
    getAllUsers(): Promise<(mongoose.Document<unknown, {}, {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        name: string;
        email: string;
        organisation: string;
        position: string;
        department: string;
        unit: string;
        role: "user" | "admin";
        hireDate: NativeDate;
        password: string;
        mentorshipRequests: mongoose.Types.DocumentArray<{
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }> & {
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }>;
        mentees: mongoose.Types.ObjectId[];
        notifications: mongoose.Types.DocumentArray<{
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }> & {
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }>;
        careerPath: mongoose.Types.DocumentArray<{
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }> & {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }>;
        skills: mongoose.Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }> & {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }>;
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
        activities: mongoose.Types.DocumentArray<{
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }> & {
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }>;
        languages: mongoose.Types.DocumentArray<{
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }> & {
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }>;
        strengths: mongoose.Types.DocumentArray<{
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }> & {
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }>;
        education: mongoose.Types.DocumentArray<{
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }> & {
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }>;
        projects: mongoose.Types.DocumentArray<{
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }> & {
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }>;
        aspirations: mongoose.Types.DocumentArray<{
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }> & {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }>;
        leadershipReviews: mongoose.Types.DocumentArray<{
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
        }> & {
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
        }>;
        lastSeen: NativeDate;
        isOnline: boolean;
        bio?: string | null | undefined;
        supervisor?: mongoose.Types.ObjectId | null | undefined;
        avatar?: string | null | undefined;
    }> & {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        name: string;
        email: string;
        organisation: string;
        position: string;
        department: string;
        unit: string;
        role: "user" | "admin";
        hireDate: NativeDate;
        password: string;
        mentorshipRequests: mongoose.Types.DocumentArray<{
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }> & {
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }>;
        mentees: mongoose.Types.ObjectId[];
        notifications: mongoose.Types.DocumentArray<{
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }> & {
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }>;
        careerPath: mongoose.Types.DocumentArray<{
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }> & {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }>;
        skills: mongoose.Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }> & {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }>;
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
        activities: mongoose.Types.DocumentArray<{
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }> & {
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }>;
        languages: mongoose.Types.DocumentArray<{
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }> & {
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }>;
        strengths: mongoose.Types.DocumentArray<{
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }> & {
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }>;
        education: mongoose.Types.DocumentArray<{
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }> & {
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }>;
        projects: mongoose.Types.DocumentArray<{
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }> & {
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }>;
        aspirations: mongoose.Types.DocumentArray<{
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }> & {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }>;
        leadershipReviews: mongoose.Types.DocumentArray<{
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
        }> & {
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
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
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        name: string;
        email: string;
        organisation: string;
        position: string;
        department: string;
        unit: string;
        role: "user" | "admin";
        hireDate: NativeDate;
        password: string;
        mentorshipRequests: mongoose.Types.DocumentArray<{
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }> & {
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }>;
        mentees: mongoose.Types.ObjectId[];
        notifications: mongoose.Types.DocumentArray<{
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }> & {
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }>;
        careerPath: mongoose.Types.DocumentArray<{
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }> & {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }>;
        skills: mongoose.Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }> & {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }>;
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
        activities: mongoose.Types.DocumentArray<{
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }> & {
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }>;
        languages: mongoose.Types.DocumentArray<{
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }> & {
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }>;
        strengths: mongoose.Types.DocumentArray<{
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }> & {
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }>;
        education: mongoose.Types.DocumentArray<{
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }> & {
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }>;
        projects: mongoose.Types.DocumentArray<{
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }> & {
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }>;
        aspirations: mongoose.Types.DocumentArray<{
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }> & {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }>;
        leadershipReviews: mongoose.Types.DocumentArray<{
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
        }> & {
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
        }>;
        lastSeen: NativeDate;
        isOnline: boolean;
        bio?: string | null | undefined;
        supervisor?: mongoose.Types.ObjectId | null | undefined;
        avatar?: string | null | undefined;
    }> & {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        name: string;
        email: string;
        organisation: string;
        position: string;
        department: string;
        unit: string;
        role: "user" | "admin";
        hireDate: NativeDate;
        password: string;
        mentorshipRequests: mongoose.Types.DocumentArray<{
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }> & {
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }>;
        mentees: mongoose.Types.ObjectId[];
        notifications: mongoose.Types.DocumentArray<{
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }> & {
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }>;
        careerPath: mongoose.Types.DocumentArray<{
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }> & {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }>;
        skills: mongoose.Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }> & {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }>;
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
        activities: mongoose.Types.DocumentArray<{
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }> & {
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }>;
        languages: mongoose.Types.DocumentArray<{
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }> & {
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }>;
        strengths: mongoose.Types.DocumentArray<{
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }> & {
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }>;
        education: mongoose.Types.DocumentArray<{
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }> & {
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }>;
        projects: mongoose.Types.DocumentArray<{
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }> & {
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }>;
        aspirations: mongoose.Types.DocumentArray<{
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }> & {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }>;
        leadershipReviews: mongoose.Types.DocumentArray<{
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
        }> & {
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
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
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        name: string;
        email: string;
        organisation: string;
        position: string;
        department: string;
        unit: string;
        role: "user" | "admin";
        hireDate: NativeDate;
        password: string;
        mentorshipRequests: mongoose.Types.DocumentArray<{
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }> & {
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }>;
        mentees: mongoose.Types.ObjectId[];
        notifications: mongoose.Types.DocumentArray<{
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }> & {
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }>;
        careerPath: mongoose.Types.DocumentArray<{
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }> & {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }>;
        skills: mongoose.Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }> & {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }>;
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
        activities: mongoose.Types.DocumentArray<{
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }> & {
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }>;
        languages: mongoose.Types.DocumentArray<{
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }> & {
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }>;
        strengths: mongoose.Types.DocumentArray<{
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }> & {
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }>;
        education: mongoose.Types.DocumentArray<{
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }> & {
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }>;
        projects: mongoose.Types.DocumentArray<{
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }> & {
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }>;
        aspirations: mongoose.Types.DocumentArray<{
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }> & {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }>;
        leadershipReviews: mongoose.Types.DocumentArray<{
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
        }> & {
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
        }>;
        lastSeen: NativeDate;
        isOnline: boolean;
        bio?: string | null | undefined;
        supervisor?: mongoose.Types.ObjectId | null | undefined;
        avatar?: string | null | undefined;
    }> & {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        name: string;
        email: string;
        organisation: string;
        position: string;
        department: string;
        unit: string;
        role: "user" | "admin";
        hireDate: NativeDate;
        password: string;
        mentorshipRequests: mongoose.Types.DocumentArray<{
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }> & {
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }>;
        mentees: mongoose.Types.ObjectId[];
        notifications: mongoose.Types.DocumentArray<{
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }> & {
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }>;
        careerPath: mongoose.Types.DocumentArray<{
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }> & {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }>;
        skills: mongoose.Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }> & {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }>;
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
        activities: mongoose.Types.DocumentArray<{
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }> & {
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }>;
        languages: mongoose.Types.DocumentArray<{
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }> & {
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }>;
        strengths: mongoose.Types.DocumentArray<{
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }> & {
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }>;
        education: mongoose.Types.DocumentArray<{
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }> & {
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }>;
        projects: mongoose.Types.DocumentArray<{
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }> & {
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }>;
        aspirations: mongoose.Types.DocumentArray<{
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }> & {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }>;
        leadershipReviews: mongoose.Types.DocumentArray<{
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
        }> & {
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
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
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        name: string;
        email: string;
        organisation: string;
        position: string;
        department: string;
        unit: string;
        role: "user" | "admin";
        hireDate: NativeDate;
        password: string;
        mentorshipRequests: mongoose.Types.DocumentArray<{
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }> & {
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }>;
        mentees: mongoose.Types.ObjectId[];
        notifications: mongoose.Types.DocumentArray<{
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }> & {
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }>;
        careerPath: mongoose.Types.DocumentArray<{
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }> & {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }>;
        skills: mongoose.Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }> & {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }>;
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
        activities: mongoose.Types.DocumentArray<{
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }> & {
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }>;
        languages: mongoose.Types.DocumentArray<{
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }> & {
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }>;
        strengths: mongoose.Types.DocumentArray<{
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }> & {
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }>;
        education: mongoose.Types.DocumentArray<{
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }> & {
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }>;
        projects: mongoose.Types.DocumentArray<{
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }> & {
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }>;
        aspirations: mongoose.Types.DocumentArray<{
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }> & {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }>;
        leadershipReviews: mongoose.Types.DocumentArray<{
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
        }> & {
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
        }>;
        lastSeen: NativeDate;
        isOnline: boolean;
        bio?: string | null | undefined;
        supervisor?: mongoose.Types.ObjectId | null | undefined;
        avatar?: string | null | undefined;
    }> & {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        name: string;
        email: string;
        organisation: string;
        position: string;
        department: string;
        unit: string;
        role: "user" | "admin";
        hireDate: NativeDate;
        password: string;
        mentorshipRequests: mongoose.Types.DocumentArray<{
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }> & {
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }>;
        mentees: mongoose.Types.ObjectId[];
        notifications: mongoose.Types.DocumentArray<{
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }> & {
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }>;
        careerPath: mongoose.Types.DocumentArray<{
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }> & {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }>;
        skills: mongoose.Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }> & {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }>;
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
        activities: mongoose.Types.DocumentArray<{
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }> & {
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }>;
        languages: mongoose.Types.DocumentArray<{
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }> & {
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }>;
        strengths: mongoose.Types.DocumentArray<{
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }> & {
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }>;
        education: mongoose.Types.DocumentArray<{
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }> & {
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }>;
        projects: mongoose.Types.DocumentArray<{
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }> & {
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }>;
        aspirations: mongoose.Types.DocumentArray<{
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }> & {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }>;
        leadershipReviews: mongoose.Types.DocumentArray<{
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
        }> & {
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
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
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        name: string;
        email: string;
        organisation: string;
        position: string;
        department: string;
        unit: string;
        role: "user" | "admin";
        hireDate: NativeDate;
        password: string;
        mentorshipRequests: mongoose.Types.DocumentArray<{
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }> & {
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }>;
        mentees: mongoose.Types.ObjectId[];
        notifications: mongoose.Types.DocumentArray<{
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }> & {
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }>;
        careerPath: mongoose.Types.DocumentArray<{
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }> & {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }>;
        skills: mongoose.Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }> & {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }>;
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
        activities: mongoose.Types.DocumentArray<{
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }> & {
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }>;
        languages: mongoose.Types.DocumentArray<{
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }> & {
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }>;
        strengths: mongoose.Types.DocumentArray<{
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }> & {
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }>;
        education: mongoose.Types.DocumentArray<{
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }> & {
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }>;
        projects: mongoose.Types.DocumentArray<{
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }> & {
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }>;
        aspirations: mongoose.Types.DocumentArray<{
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }> & {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }>;
        leadershipReviews: mongoose.Types.DocumentArray<{
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
        }> & {
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
        }>;
        lastSeen: NativeDate;
        isOnline: boolean;
        bio?: string | null | undefined;
        supervisor?: mongoose.Types.ObjectId | null | undefined;
        avatar?: string | null | undefined;
    }> & {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        name: string;
        email: string;
        organisation: string;
        position: string;
        department: string;
        unit: string;
        role: "user" | "admin";
        hireDate: NativeDate;
        password: string;
        mentorshipRequests: mongoose.Types.DocumentArray<{
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }> & {
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }>;
        mentees: mongoose.Types.ObjectId[];
        notifications: mongoose.Types.DocumentArray<{
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }> & {
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }>;
        careerPath: mongoose.Types.DocumentArray<{
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }> & {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }>;
        skills: mongoose.Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }> & {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }>;
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
        activities: mongoose.Types.DocumentArray<{
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }> & {
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }>;
        languages: mongoose.Types.DocumentArray<{
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }> & {
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }>;
        strengths: mongoose.Types.DocumentArray<{
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }> & {
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }>;
        education: mongoose.Types.DocumentArray<{
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }> & {
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }>;
        projects: mongoose.Types.DocumentArray<{
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }> & {
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }>;
        aspirations: mongoose.Types.DocumentArray<{
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }> & {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }>;
        leadershipReviews: mongoose.Types.DocumentArray<{
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
        }> & {
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
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
    addActivity(userID: string, activity: any): Promise<mongoose.Document<unknown, {}, {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        name: string;
        email: string;
        organisation: string;
        position: string;
        department: string;
        unit: string;
        role: "user" | "admin";
        hireDate: NativeDate;
        password: string;
        mentorshipRequests: mongoose.Types.DocumentArray<{
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }> & {
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }>;
        mentees: mongoose.Types.ObjectId[];
        notifications: mongoose.Types.DocumentArray<{
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }> & {
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }>;
        careerPath: mongoose.Types.DocumentArray<{
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }> & {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }>;
        skills: mongoose.Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }> & {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }>;
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
        activities: mongoose.Types.DocumentArray<{
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }> & {
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }>;
        languages: mongoose.Types.DocumentArray<{
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }> & {
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }>;
        strengths: mongoose.Types.DocumentArray<{
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }> & {
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }>;
        education: mongoose.Types.DocumentArray<{
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }> & {
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }>;
        projects: mongoose.Types.DocumentArray<{
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }> & {
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }>;
        aspirations: mongoose.Types.DocumentArray<{
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }> & {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }>;
        leadershipReviews: mongoose.Types.DocumentArray<{
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
        }> & {
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
        }>;
        lastSeen: NativeDate;
        isOnline: boolean;
        bio?: string | null | undefined;
        supervisor?: mongoose.Types.ObjectId | null | undefined;
        avatar?: string | null | undefined;
    }> & {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        name: string;
        email: string;
        organisation: string;
        position: string;
        department: string;
        unit: string;
        role: "user" | "admin";
        hireDate: NativeDate;
        password: string;
        mentorshipRequests: mongoose.Types.DocumentArray<{
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }> & {
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }>;
        mentees: mongoose.Types.ObjectId[];
        notifications: mongoose.Types.DocumentArray<{
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }> & {
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }>;
        careerPath: mongoose.Types.DocumentArray<{
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }> & {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }>;
        skills: mongoose.Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }> & {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }>;
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
        activities: mongoose.Types.DocumentArray<{
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }> & {
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }>;
        languages: mongoose.Types.DocumentArray<{
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }> & {
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }>;
        strengths: mongoose.Types.DocumentArray<{
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }> & {
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }>;
        education: mongoose.Types.DocumentArray<{
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }> & {
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }>;
        projects: mongoose.Types.DocumentArray<{
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }> & {
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }>;
        aspirations: mongoose.Types.DocumentArray<{
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }> & {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }>;
        leadershipReviews: mongoose.Types.DocumentArray<{
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
        }> & {
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
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
    getChats(userID: string): Promise<(mongoose.Document<unknown, {}, {
        createdAt: NativeDate;
        participants: mongoose.Types.ObjectId[];
        messages: mongoose.Types.DocumentArray<{
            type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
            sender: mongoose.Types.ObjectId;
            read: boolean;
            createdAt: NativeDate;
            content: string;
            metadata: any;
            readAt?: NativeDate | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
            sender: mongoose.Types.ObjectId;
            read: boolean;
            createdAt: NativeDate;
            content: string;
            metadata: any;
            readAt?: NativeDate | null | undefined;
        }> & {
            type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
            sender: mongoose.Types.ObjectId;
            read: boolean;
            createdAt: NativeDate;
            content: string;
            metadata: any;
            readAt?: NativeDate | null | undefined;
        }>;
    }> & {
        createdAt: NativeDate;
        participants: mongoose.Types.ObjectId[];
        messages: mongoose.Types.DocumentArray<{
            type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
            sender: mongoose.Types.ObjectId;
            read: boolean;
            createdAt: NativeDate;
            content: string;
            metadata: any;
            readAt?: NativeDate | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
            sender: mongoose.Types.ObjectId;
            read: boolean;
            createdAt: NativeDate;
            content: string;
            metadata: any;
            readAt?: NativeDate | null | undefined;
        }> & {
            type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
            sender: mongoose.Types.ObjectId;
            read: boolean;
            createdAt: NativeDate;
            content: string;
            metadata: any;
            readAt?: NativeDate | null | undefined;
        }>;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getNotifications(userID: string): Promise<mongoose.Types.DocumentArray<{
        message: string;
        read: boolean;
        createdAt: NativeDate;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        message: string;
        read: boolean;
        createdAt: NativeDate;
    }> & {
        message: string;
        read: boolean;
        createdAt: NativeDate;
    }>>;
    getWBConversations(userID: string): Promise<(mongoose.Document<unknown, {}, {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        user: mongoose.Types.ObjectId;
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
        title: string;
    }> & {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        user: mongoose.Types.ObjectId;
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
        title: string;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getTopMatchedMentors(userId: string, limit?: number, page?: number): Promise<any[]>;
    private countOverlappingSkills;
    private calculateCareerPathSimilarity;
    deleteAllUsers(): Promise<mongoose.mongo.DeleteResult>;
    updateTodayMood(userId: string, level: number, notes?: string[]): Promise<mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        date: NativeDate;
        level: number;
        notes: string[];
    }> & {
        date: NativeDate;
        level: number;
        notes: string[];
    }>;
    getRecommendedCourses(userID: string): Promise<(mongoose.Document<unknown, {}, {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        name: string;
        skillsTaught: mongoose.Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }> & {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }>;
        durationHours: number;
        description?: string | null | undefined;
    }> & {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        name: string;
        skillsTaught: mongoose.Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }> & {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }>;
        durationHours: number;
        description?: string | null | undefined;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getPotentialPositions(userID: string): Promise<{
        position: PositionType;
        missingSkills: Skill[];
        recommendedCourses: any[];
        relevance: number;
    }[]>;
    getCurrentPosition(userID: string): Promise<(mongoose.Types.Subdocument<string | mongoose.Types.ObjectId, any, mongoose.FlattenMaps<{
        name: string;
        focusAreas: string[];
        skills: mongoose.Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }> & {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }>;
        startDate: NativeDate;
        endDate: NativeDate;
    } | {
        name: string;
        focusAreas: string[];
        skills: mongoose.Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }> & {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }>;
        startDate: NativeDate;
        endDate: NativeDate;
        _id: string;
        __v: number;
    } | {
        name: string;
        focusAreas: string[];
        skills: mongoose.Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }> & {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }>;
        startDate: NativeDate;
        endDate: NativeDate;
        _id: string;
        __v: number;
    }>> & mongoose.FlattenMaps<{
        name: string;
        focusAreas: string[];
        skills: mongoose.Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }> & {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }>;
        startDate: NativeDate;
        endDate: NativeDate;
    } | {
        name: string;
        focusAreas: string[];
        skills: mongoose.Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }> & {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }>;
        startDate: NativeDate;
        endDate: NativeDate;
        _id: string;
        __v: number;
    } | {
        name: string;
        focusAreas: string[];
        skills: mongoose.Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }> & {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }>;
        startDate: NativeDate;
        endDate: NativeDate;
        _id: string;
        __v: number;
    }>) | undefined>;
    getRecommendedEvents: (userID: string) => Promise<(mongoose.FlattenMaps<{
        startDate: NativeDate;
        endDate: NativeDate;
        description: string;
        comments: mongoose.Types.DocumentArray<{
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
        } | {
            createdAt: NativeDate;
            content: string;
            author: string;
            _id: string;
            __v: number;
        }, mongoose.Types.Subdocument<string | mongoose.Types.ObjectId, any, {
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
        } | {
            createdAt: NativeDate;
            content: string;
            author: string;
            _id: string;
            __v: number;
        }> & ({
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
        } | {
            createdAt: NativeDate;
            content: string;
            author: string;
            _id: string;
            __v: number;
        })>;
        participants: mongoose.Types.ObjectId[];
        title: string;
        categories: string[];
        mode: "online" | "offline";
        creator: mongoose.Types.ObjectId;
        location?: string | null | undefined;
        coverImage?: {
            description: string;
            s3Filename: string;
            filename: string;
            folder: string[];
            url?: string | null | undefined;
            mimeType?: string | null | undefined;
        } | null | undefined;
    }> & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    predictLeadershipPotential(userID: string): Promise<number>;
    submitLeadershipReview(userID: string, reviewerID: string, review: any): Promise<mongoose.Document<unknown, {}, {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        name: string;
        email: string;
        organisation: string;
        position: string;
        department: string;
        unit: string;
        role: "user" | "admin";
        hireDate: NativeDate;
        password: string;
        mentorshipRequests: mongoose.Types.DocumentArray<{
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }> & {
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }>;
        mentees: mongoose.Types.ObjectId[];
        notifications: mongoose.Types.DocumentArray<{
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }> & {
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }>;
        careerPath: mongoose.Types.DocumentArray<{
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }> & {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }>;
        skills: mongoose.Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }> & {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }>;
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
        activities: mongoose.Types.DocumentArray<{
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }> & {
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }>;
        languages: mongoose.Types.DocumentArray<{
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }> & {
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }>;
        strengths: mongoose.Types.DocumentArray<{
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }> & {
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }>;
        education: mongoose.Types.DocumentArray<{
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }> & {
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }>;
        projects: mongoose.Types.DocumentArray<{
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }> & {
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }>;
        aspirations: mongoose.Types.DocumentArray<{
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }> & {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }>;
        leadershipReviews: mongoose.Types.DocumentArray<{
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
        }> & {
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
        }>;
        lastSeen: NativeDate;
        isOnline: boolean;
        bio?: string | null | undefined;
        supervisor?: mongoose.Types.ObjectId | null | undefined;
        avatar?: string | null | undefined;
    }> & {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        name: string;
        email: string;
        organisation: string;
        position: string;
        department: string;
        unit: string;
        role: "user" | "admin";
        hireDate: NativeDate;
        password: string;
        mentorshipRequests: mongoose.Types.DocumentArray<{
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }> & {
            sender: mongoose.Types.ObjectId;
            message?: string | null | undefined;
        }>;
        mentees: mongoose.Types.ObjectId[];
        notifications: mongoose.Types.DocumentArray<{
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }> & {
            message: string;
            read: boolean;
            createdAt: NativeDate;
        }>;
        careerPath: mongoose.Types.DocumentArray<{
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }> & {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }>;
        skills: mongoose.Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }> & {
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }>;
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
        activities: mongoose.Types.DocumentArray<{
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }> & {
            date: NativeDate;
            type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
        }>;
        languages: mongoose.Types.DocumentArray<{
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }> & {
            name: string;
            proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
        }>;
        strengths: mongoose.Types.DocumentArray<{
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }> & {
            name: string;
            level: "Intermediate" | "Beginner" | "Advanced";
        }>;
        education: mongoose.Types.DocumentArray<{
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }> & {
            startDate: NativeDate;
            endDate: NativeDate;
            institution: string;
            degree: string;
        }>;
        projects: mongoose.Types.DocumentArray<{
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }> & {
            name: string;
            role: string;
            startDate: NativeDate;
            endDate: NativeDate;
            description: string;
            outcomes: string[];
        }>;
        aspirations: mongoose.Types.DocumentArray<{
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }> & {
            name: string;
            focusAreas: string[];
            skills: mongoose.Types.DocumentArray<{
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }> & {
                name: string;
                functionArea: string;
                specialisation: string;
                level?: number | null | undefined;
            }>;
            startDate: NativeDate;
            endDate: NativeDate;
        }>;
        leadershipReviews: mongoose.Types.DocumentArray<{
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
        }> & {
            date: NativeDate;
            reviewer: mongoose.Types.ObjectId;
            ratings: {
                communication: number;
                decisionMaking: number;
                strategicThinking: number;
                teamwork: number;
                adaptability: number;
            };
            comments: string;
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
}
declare const userService: UserService;
export default userService;
