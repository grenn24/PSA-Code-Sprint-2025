import { Project } from "@common/types/user.js";
export declare function generateProjects(count?: any): Project[];
export declare const generateUser: (email: string, password: string) => Promise<{
    name: string;
    organisation: string;
    email: string;
    position: string;
    department: string;
    unit: string;
    role: string;
    hireDate: Date;
    password: string;
    avatar: string;
    bio: string;
    mentorshipRequests: never[];
    skills: {
        name: string;
        level: any;
        functionArea: string;
        specialisation: string;
    }[];
    notifications: {
        message: string;
        read: boolean;
    }[];
    careerPath: any[];
    moods: {
        level: number;
        date: Date;
    }[];
    supervisor: null;
    activities: never[];
    isOnline: boolean;
    lastSeen: null;
    languages: {
        name: string;
        proficiency: string;
    }[];
    strengths: {
        name: string;
        level: string;
    }[];
    education: never[];
    projects: Project[];
    mentees: never[];
}>;
export declare const generateDefaultUser: () => Promise<{
    name: string;
    organisation: string;
    email: string;
    position: string;
    department: string;
    unit: string;
    role: string;
    hireDate: Date;
    password: string;
    avatar: string;
    bio: string;
    mentorshipRequests: never[];
    supervisor: null;
    skills: {
        name: string;
        level: any;
        functionArea: string;
        specialisation: string;
    }[];
    notifications: {
        message: string;
        read: boolean;
    }[];
    careerPath: ({
        name: string;
        focusAreas: string[];
        skills: {
            name: string;
            level: any;
            functionArea: string;
            specialisation: string;
        }[];
        startDate: Date;
        endDate: Date;
    } | {
        name: string;
        focusAreas: string[];
        skills: {
            name: string;
            level: any;
            functionArea: string;
            specialisation: string;
        }[];
        startDate: Date;
        endDate: null;
    })[];
    moods: {
        level: number;
        date: Date;
    }[];
    activities: never[];
    isOnline: boolean;
    lastSeen: null;
    languages: {
        name: string;
        proficiency: string;
    }[];
    strengths: {
        name: string;
        level: string;
    }[];
    education: never[];
    projects: Project[];
    mentees: never[];
}>;
export declare const generateUsers: (length: number, includeDefaultUser?: boolean) => Promise<{
    name: string;
    email: string;
    avatar: string;
    bio: string;
    position: string;
    role: string;
    password: string;
    department: string;
    unit: string;
    hireDate: Date;
    mentorshipRequests: never[];
    skills: {
        name: string;
        level: any;
        functionArea: string;
        specialisation: string;
    }[];
    notifications: {
        message: string;
        read: boolean;
    }[];
    careerPath: any[];
    moods: {
        level: number;
        date: Date;
    }[];
    strengths: {
        name: string;
        level: string;
    }[];
    supervisor: null;
}[]>;
export declare const generateUsersFromJSON: (employeeData: any[], includeDefaultUser?: boolean) => Promise<{
    name: any;
    email: any;
    organisation: any;
    position: any;
    department: any;
    unit: any;
    role: string;
    password: string;
    hireDate: Date;
    supervisor: null;
    avatar: string;
    bio: string;
    lastSeen: null;
    skills: any;
    languages: any;
    strengths: any;
    projects: any;
    education: any;
    careerPath: any;
    notifications: {
        message: string;
        read: boolean;
    }[];
    mentorshipRequests: never[];
    mentees: never[];
    moods: {
        level: number;
        date: Date;
    }[];
    activities: never[];
    isOnline: boolean;
}[]>;
export declare function generateSupervisors(): Promise<void>;
export declare function seedUsers(): Promise<void>;
