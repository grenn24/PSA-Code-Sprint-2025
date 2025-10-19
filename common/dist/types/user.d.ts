export interface Mood {
    level: number;
    date: Date;
    notes: string[];
}
export interface Activity {
    type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
    date: Date;
}
export interface Skill {
    name: string;
    functionArea: string;
    specialisation: string;
    level: number;
}
export interface Position {
    name: string;
    focusAreas: string[];
    skills: Skill[];
    startDate: Date;
    endDate: Date | null;
}
export interface InterestedPosition {
    name: string;
    focusAreas: string[];
    skills: Skill[];
}
export interface Education {
    institution: string;
    degree: string;
    startDate: Date;
    endDate: Date;
}
export interface Project {
    name: string;
    role: string;
    description: string;
    outcomes: string[];
    startDate: Date;
    endDate: Date;
}
export interface Language {
    name: string;
    proficiency: "Fluent" | "Professional" | "Conversational" | "Intermediate";
}
export interface Strength {
    name: string;
    level: "Beginner" | "Intermediate" | "Advanced";
}
export interface MentorshipRequest {
    _id?: string;
    sender: User | string;
    message?: string;
}
export interface Notification {
    message: string;
    read: boolean;
    createdAt: Date;
}
export interface LeadershipReviewRatings {
    communication: number;
    decisionMaking: number;
    strategicThinking: number;
    teamwork: number;
    adaptability: number;
}
export interface LeadershipReview {
    reviewer: User;
    ratings: LeadershipReviewRatings;
    comments?: string;
    date: Date;
}
export interface User {
    _id?: string;
    name: string;
    email: string;
    organisation: string;
    position: string;
    department: string;
    unit: string;
    role?: "user" | "admin";
    hireDate: Date;
    password: string;
    supervisor?: User;
    subordinates: User[];
    avatar?: string;
    bio?: string;
    skills: Skill[];
    mentorshipRequests: MentorshipRequest[];
    mentors: User[];
    mentees: User[];
    notifications: Notification[];
    careerPath: Position[];
    aspirations: Position[];
    leadershipReviews: LeadershipReview[];
    lastSeen?: Date | null;
    isOnline: boolean;
    moods: Mood[];
    activities: Activity[];
    languages: Language[];
    strengths: Strength[];
    education: Education[];
    projects: Project[];
    interestedPositions: InterestedPosition[];
    createdAt?: Date;
    updatedAt: Date;
}
//# sourceMappingURL=user.d.ts.map