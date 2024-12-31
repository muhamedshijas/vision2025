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
    job: { field: string; value: string }[];

    @Prop({ type: Array, default: [] }) // Change to array of objects for passwords
    passwords: { field: string; value: string }[];

    @Prop({ type: Array, default: [] }) // Change to array of objects for dates
    dates: { field: string; value: string }[];
}

export const UserSchema = SchemaFactory.createForClass(User);
