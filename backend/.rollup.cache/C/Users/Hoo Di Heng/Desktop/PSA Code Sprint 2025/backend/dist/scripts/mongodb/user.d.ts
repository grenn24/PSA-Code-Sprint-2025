export declare const generateUser: () => Promise<{
    name: string;
    email: string;
    avatar: string;
    bio: string;
    position: string;
    role: string;
    password: string;
    subordinates: never[];
    experienceLevel: any;
    mentorshipRequests: never[];
    skills: {
        name: string;
        level: any;
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
}>;
export declare const generateUsers: (length: number, includeDefaultUser?: boolean) => Promise<{
    name: string;
    email: string;
    avatar: string;
    bio: string;
    position: string;
    role: string;
    password: string;
    subordinates: never[];
    experienceLevel: any;
    mentorshipRequests: never[];
    skills: {
        name: string;
        level: any;
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
}[]>;
export declare function seedUsers(): Promise<void>;
