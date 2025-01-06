import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    phoneNumber: number;

    @Prop({ type: Object, default: null }) // Default is null
    personal: Record<string, any>;

    @Prop({ type: Array, default: [] }) // Change to array of objects for job
    job: { jobTitle: string; company: string, place: string, package: string, timePeriod: string, projects: string[] }[];

    @Prop({ type: Array, default: [] }) // Array of account-password objects
    passwords: { account: string; encrypted: string; iv: string }[];

    @Prop({ type: Array, default: [] }) // Change to array of objects for dates
    dates: { dates: string; description: string }[];
}

export const UserSchema = SchemaFactory.createForClass(User);
