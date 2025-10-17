import mongoose from "mongoose";
export declare const Course: mongoose.Model<{
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
}, {}, {}, {}, mongoose.Document<unknown, {}, {
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
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
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
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
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
}>> & mongoose.FlatRecord<{
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
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
