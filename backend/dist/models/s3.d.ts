import mongoose from "mongoose";
export declare const s3FileSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    filename: string;
    description: string;
    s3Filename: string;
    folder: string[];
    url?: string | null | undefined;
    mimeType?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    filename: string;
    description: string;
    s3Filename: string;
    folder: string[];
    url?: string | null | undefined;
    mimeType?: string | null | undefined;
}>> & mongoose.FlatRecord<{
    filename: string;
    description: string;
    s3Filename: string;
    folder: string[];
    url?: string | null | undefined;
    mimeType?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
