import mongoose from "mongoose";
export declare const positionSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
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
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
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
}>> & mongoose.FlatRecord<{
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
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare const Position: mongoose.Model<{
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
}, {}, {}, {}, mongoose.Document<unknown, {}, {
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
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
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
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
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
}>> & mongoose.FlatRecord<{
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
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
