import mongoose from "mongoose";
export declare const s3FileSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    s3Filename: string;
    filename: string;
    folder: string[];
    description: string;
    url?: string | null | undefined;
    mimeType?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    s3Filename: string;
    filename: string;
    folder: string[];
    description: string;
    url?: string | null | undefined;
    mimeType?: string | null | undefined;
}>> & mongoose.FlatRecord<{
    s3Filename: string;
    filename: string;
    folder: string[];
    description: string;
    url?: string | null | undefined;
    mimeType?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
