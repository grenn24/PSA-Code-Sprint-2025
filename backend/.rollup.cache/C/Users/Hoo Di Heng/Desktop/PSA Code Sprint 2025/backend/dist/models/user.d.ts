import { Schema } from "mongoose";
export declare const skillSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    name: string;
    functionArea: string;
    specialisation: string;
    level?: number | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    name: string;
    functionArea: string;
    specialisation: string;
    level?: number | null | undefined;
}>> & import("mongoose").FlatRecord<{
    name: string;
    functionArea: string;
    specialisation: string;
    level?: number | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
declare const User: import("mongoose").Model<{
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
    mentorshipRequests: import("mongoose").Types.DocumentArray<{
        sender: import("mongoose").Types.ObjectId;
        message?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        sender: import("mongoose").Types.ObjectId;
        message?: string | null | undefined;
    }> & {
        sender: import("mongoose").Types.ObjectId;
        message?: string | null | undefined;
    }>;
    mentees: import("mongoose").Types.ObjectId[];
    notifications: import("mongoose").Types.DocumentArray<{
        message: string;
        read: boolean;
        createdAt: NativeDate;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        message: string;
        read: boolean;
        createdAt: NativeDate;
    }> & {
        message: string;
        read: boolean;
        createdAt: NativeDate;
    }>;
    careerPath: import("mongoose").Types.DocumentArray<{
        name: string;
        focusAreas: string[];
        skills: import("mongoose").Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name: string;
        focusAreas: string[];
        skills: import("mongoose").Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
        skills: import("mongoose").Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    skills: import("mongoose").Types.DocumentArray<{
        name: string;
        functionArea: string;
        specialisation: string;
        level?: number | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    activities: import("mongoose").Types.DocumentArray<{
        date: NativeDate;
        type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        date: NativeDate;
        type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
    }> & {
        date: NativeDate;
        type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
    }>;
    languages: import("mongoose").Types.DocumentArray<{
        name: string;
        proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name: string;
        proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
    }> & {
        name: string;
        proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
    }>;
    strengths: import("mongoose").Types.DocumentArray<{
        name: string;
        level: "Intermediate" | "Beginner" | "Advanced";
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name: string;
        level: "Intermediate" | "Beginner" | "Advanced";
    }> & {
        name: string;
        level: "Intermediate" | "Beginner" | "Advanced";
    }>;
    education: import("mongoose").Types.DocumentArray<{
        startDate: NativeDate;
        endDate: NativeDate;
        institution: string;
        degree: string;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    projects: import("mongoose").Types.DocumentArray<{
        name: string;
        role: string;
        startDate: NativeDate;
        endDate: NativeDate;
        description: string;
        outcomes: string[];
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    aspirations: import("mongoose").Types.DocumentArray<{
        name: string;
        focusAreas: string[];
        skills: import("mongoose").Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name: string;
        focusAreas: string[];
        skills: import("mongoose").Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
        skills: import("mongoose").Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    lastSeen: NativeDate;
    isOnline: boolean;
    bio?: string | null | undefined;
    supervisor?: import("mongoose").Types.ObjectId | null | undefined;
    avatar?: string | null | undefined;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
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
    mentorshipRequests: import("mongoose").Types.DocumentArray<{
        sender: import("mongoose").Types.ObjectId;
        message?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        sender: import("mongoose").Types.ObjectId;
        message?: string | null | undefined;
    }> & {
        sender: import("mongoose").Types.ObjectId;
        message?: string | null | undefined;
    }>;
    mentees: import("mongoose").Types.ObjectId[];
    notifications: import("mongoose").Types.DocumentArray<{
        message: string;
        read: boolean;
        createdAt: NativeDate;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        message: string;
        read: boolean;
        createdAt: NativeDate;
    }> & {
        message: string;
        read: boolean;
        createdAt: NativeDate;
    }>;
    careerPath: import("mongoose").Types.DocumentArray<{
        name: string;
        focusAreas: string[];
        skills: import("mongoose").Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name: string;
        focusAreas: string[];
        skills: import("mongoose").Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
        skills: import("mongoose").Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    skills: import("mongoose").Types.DocumentArray<{
        name: string;
        functionArea: string;
        specialisation: string;
        level?: number | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    activities: import("mongoose").Types.DocumentArray<{
        date: NativeDate;
        type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        date: NativeDate;
        type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
    }> & {
        date: NativeDate;
        type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
    }>;
    languages: import("mongoose").Types.DocumentArray<{
        name: string;
        proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name: string;
        proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
    }> & {
        name: string;
        proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
    }>;
    strengths: import("mongoose").Types.DocumentArray<{
        name: string;
        level: "Intermediate" | "Beginner" | "Advanced";
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name: string;
        level: "Intermediate" | "Beginner" | "Advanced";
    }> & {
        name: string;
        level: "Intermediate" | "Beginner" | "Advanced";
    }>;
    education: import("mongoose").Types.DocumentArray<{
        startDate: NativeDate;
        endDate: NativeDate;
        institution: string;
        degree: string;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    projects: import("mongoose").Types.DocumentArray<{
        name: string;
        role: string;
        startDate: NativeDate;
        endDate: NativeDate;
        description: string;
        outcomes: string[];
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    aspirations: import("mongoose").Types.DocumentArray<{
        name: string;
        focusAreas: string[];
        skills: import("mongoose").Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name: string;
        focusAreas: string[];
        skills: import("mongoose").Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
        skills: import("mongoose").Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    lastSeen: NativeDate;
    isOnline: boolean;
    bio?: string | null | undefined;
    supervisor?: import("mongoose").Types.ObjectId | null | undefined;
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
    mentorshipRequests: import("mongoose").Types.DocumentArray<{
        sender: import("mongoose").Types.ObjectId;
        message?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        sender: import("mongoose").Types.ObjectId;
        message?: string | null | undefined;
    }> & {
        sender: import("mongoose").Types.ObjectId;
        message?: string | null | undefined;
    }>;
    mentees: import("mongoose").Types.ObjectId[];
    notifications: import("mongoose").Types.DocumentArray<{
        message: string;
        read: boolean;
        createdAt: NativeDate;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        message: string;
        read: boolean;
        createdAt: NativeDate;
    }> & {
        message: string;
        read: boolean;
        createdAt: NativeDate;
    }>;
    careerPath: import("mongoose").Types.DocumentArray<{
        name: string;
        focusAreas: string[];
        skills: import("mongoose").Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name: string;
        focusAreas: string[];
        skills: import("mongoose").Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
        skills: import("mongoose").Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    skills: import("mongoose").Types.DocumentArray<{
        name: string;
        functionArea: string;
        specialisation: string;
        level?: number | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    activities: import("mongoose").Types.DocumentArray<{
        date: NativeDate;
        type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        date: NativeDate;
        type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
    }> & {
        date: NativeDate;
        type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
    }>;
    languages: import("mongoose").Types.DocumentArray<{
        name: string;
        proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name: string;
        proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
    }> & {
        name: string;
        proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
    }>;
    strengths: import("mongoose").Types.DocumentArray<{
        name: string;
        level: "Intermediate" | "Beginner" | "Advanced";
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name: string;
        level: "Intermediate" | "Beginner" | "Advanced";
    }> & {
        name: string;
        level: "Intermediate" | "Beginner" | "Advanced";
    }>;
    education: import("mongoose").Types.DocumentArray<{
        startDate: NativeDate;
        endDate: NativeDate;
        institution: string;
        degree: string;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    projects: import("mongoose").Types.DocumentArray<{
        name: string;
        role: string;
        startDate: NativeDate;
        endDate: NativeDate;
        description: string;
        outcomes: string[];
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    aspirations: import("mongoose").Types.DocumentArray<{
        name: string;
        focusAreas: string[];
        skills: import("mongoose").Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name: string;
        focusAreas: string[];
        skills: import("mongoose").Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
        skills: import("mongoose").Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    lastSeen: NativeDate;
    isOnline: boolean;
    bio?: string | null | undefined;
    supervisor?: import("mongoose").Types.ObjectId | null | undefined;
    avatar?: string | null | undefined;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
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
    mentorshipRequests: import("mongoose").Types.DocumentArray<{
        sender: import("mongoose").Types.ObjectId;
        message?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        sender: import("mongoose").Types.ObjectId;
        message?: string | null | undefined;
    }> & {
        sender: import("mongoose").Types.ObjectId;
        message?: string | null | undefined;
    }>;
    mentees: import("mongoose").Types.ObjectId[];
    notifications: import("mongoose").Types.DocumentArray<{
        message: string;
        read: boolean;
        createdAt: NativeDate;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        message: string;
        read: boolean;
        createdAt: NativeDate;
    }> & {
        message: string;
        read: boolean;
        createdAt: NativeDate;
    }>;
    careerPath: import("mongoose").Types.DocumentArray<{
        name: string;
        focusAreas: string[];
        skills: import("mongoose").Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name: string;
        focusAreas: string[];
        skills: import("mongoose").Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
        skills: import("mongoose").Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    skills: import("mongoose").Types.DocumentArray<{
        name: string;
        functionArea: string;
        specialisation: string;
        level?: number | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    activities: import("mongoose").Types.DocumentArray<{
        date: NativeDate;
        type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        date: NativeDate;
        type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
    }> & {
        date: NativeDate;
        type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
    }>;
    languages: import("mongoose").Types.DocumentArray<{
        name: string;
        proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name: string;
        proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
    }> & {
        name: string;
        proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
    }>;
    strengths: import("mongoose").Types.DocumentArray<{
        name: string;
        level: "Intermediate" | "Beginner" | "Advanced";
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name: string;
        level: "Intermediate" | "Beginner" | "Advanced";
    }> & {
        name: string;
        level: "Intermediate" | "Beginner" | "Advanced";
    }>;
    education: import("mongoose").Types.DocumentArray<{
        startDate: NativeDate;
        endDate: NativeDate;
        institution: string;
        degree: string;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    projects: import("mongoose").Types.DocumentArray<{
        name: string;
        role: string;
        startDate: NativeDate;
        endDate: NativeDate;
        description: string;
        outcomes: string[];
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    aspirations: import("mongoose").Types.DocumentArray<{
        name: string;
        focusAreas: string[];
        skills: import("mongoose").Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name: string;
        focusAreas: string[];
        skills: import("mongoose").Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
        skills: import("mongoose").Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    lastSeen: NativeDate;
    isOnline: boolean;
    bio?: string | null | undefined;
    supervisor?: import("mongoose").Types.ObjectId | null | undefined;
    avatar?: string | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
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
    mentorshipRequests: import("mongoose").Types.DocumentArray<{
        sender: import("mongoose").Types.ObjectId;
        message?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        sender: import("mongoose").Types.ObjectId;
        message?: string | null | undefined;
    }> & {
        sender: import("mongoose").Types.ObjectId;
        message?: string | null | undefined;
    }>;
    mentees: import("mongoose").Types.ObjectId[];
    notifications: import("mongoose").Types.DocumentArray<{
        message: string;
        read: boolean;
        createdAt: NativeDate;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        message: string;
        read: boolean;
        createdAt: NativeDate;
    }> & {
        message: string;
        read: boolean;
        createdAt: NativeDate;
    }>;
    careerPath: import("mongoose").Types.DocumentArray<{
        name: string;
        focusAreas: string[];
        skills: import("mongoose").Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name: string;
        focusAreas: string[];
        skills: import("mongoose").Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
        skills: import("mongoose").Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    skills: import("mongoose").Types.DocumentArray<{
        name: string;
        functionArea: string;
        specialisation: string;
        level?: number | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    activities: import("mongoose").Types.DocumentArray<{
        date: NativeDate;
        type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        date: NativeDate;
        type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
    }> & {
        date: NativeDate;
        type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
    }>;
    languages: import("mongoose").Types.DocumentArray<{
        name: string;
        proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name: string;
        proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
    }> & {
        name: string;
        proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
    }>;
    strengths: import("mongoose").Types.DocumentArray<{
        name: string;
        level: "Intermediate" | "Beginner" | "Advanced";
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name: string;
        level: "Intermediate" | "Beginner" | "Advanced";
    }> & {
        name: string;
        level: "Intermediate" | "Beginner" | "Advanced";
    }>;
    education: import("mongoose").Types.DocumentArray<{
        startDate: NativeDate;
        endDate: NativeDate;
        institution: string;
        degree: string;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    projects: import("mongoose").Types.DocumentArray<{
        name: string;
        role: string;
        startDate: NativeDate;
        endDate: NativeDate;
        description: string;
        outcomes: string[];
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    aspirations: import("mongoose").Types.DocumentArray<{
        name: string;
        focusAreas: string[];
        skills: import("mongoose").Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name: string;
        focusAreas: string[];
        skills: import("mongoose").Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
        skills: import("mongoose").Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    lastSeen: NativeDate;
    isOnline: boolean;
    bio?: string | null | undefined;
    supervisor?: import("mongoose").Types.ObjectId | null | undefined;
    avatar?: string | null | undefined;
}>> & import("mongoose").FlatRecord<{
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
    mentorshipRequests: import("mongoose").Types.DocumentArray<{
        sender: import("mongoose").Types.ObjectId;
        message?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        sender: import("mongoose").Types.ObjectId;
        message?: string | null | undefined;
    }> & {
        sender: import("mongoose").Types.ObjectId;
        message?: string | null | undefined;
    }>;
    mentees: import("mongoose").Types.ObjectId[];
    notifications: import("mongoose").Types.DocumentArray<{
        message: string;
        read: boolean;
        createdAt: NativeDate;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        message: string;
        read: boolean;
        createdAt: NativeDate;
    }> & {
        message: string;
        read: boolean;
        createdAt: NativeDate;
    }>;
    careerPath: import("mongoose").Types.DocumentArray<{
        name: string;
        focusAreas: string[];
        skills: import("mongoose").Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name: string;
        focusAreas: string[];
        skills: import("mongoose").Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
        skills: import("mongoose").Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    skills: import("mongoose").Types.DocumentArray<{
        name: string;
        functionArea: string;
        specialisation: string;
        level?: number | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    activities: import("mongoose").Types.DocumentArray<{
        date: NativeDate;
        type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        date: NativeDate;
        type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
    }> & {
        date: NativeDate;
        type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
    }>;
    languages: import("mongoose").Types.DocumentArray<{
        name: string;
        proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name: string;
        proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
    }> & {
        name: string;
        proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
    }>;
    strengths: import("mongoose").Types.DocumentArray<{
        name: string;
        level: "Intermediate" | "Beginner" | "Advanced";
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name: string;
        level: "Intermediate" | "Beginner" | "Advanced";
    }> & {
        name: string;
        level: "Intermediate" | "Beginner" | "Advanced";
    }>;
    education: import("mongoose").Types.DocumentArray<{
        startDate: NativeDate;
        endDate: NativeDate;
        institution: string;
        degree: string;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    projects: import("mongoose").Types.DocumentArray<{
        name: string;
        role: string;
        startDate: NativeDate;
        endDate: NativeDate;
        description: string;
        outcomes: string[];
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    aspirations: import("mongoose").Types.DocumentArray<{
        name: string;
        focusAreas: string[];
        skills: import("mongoose").Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        name: string;
        focusAreas: string[];
        skills: import("mongoose").Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
        skills: import("mongoose").Types.DocumentArray<{
            name: string;
            functionArea: string;
            specialisation: string;
            level?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
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
    lastSeen: NativeDate;
    isOnline: boolean;
    bio?: string | null | undefined;
    supervisor?: import("mongoose").Types.ObjectId | null | undefined;
    avatar?: string | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
export default User;
