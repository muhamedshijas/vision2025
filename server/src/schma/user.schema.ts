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

    @Prop({ type: Object, default: null }) // Default is null
    job: Record<string, any>;

    @Prop({ type: Object, default: null }) // Default is null
    passwords: Record<string, any>;

    @Prop({ type: Object, default: null }) // Default is null
    dates: Record<string, any>;
}

export const UserSchema = SchemaFactory.createForClass(User);
