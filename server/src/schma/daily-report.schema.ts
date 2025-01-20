import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";

// Define a subdocument schema for jobs
@Schema({ _id: true }) // Automatically includes _id for each object in the array
class Job {
    @Prop({ required: true })
    company: string;

    @Prop({ required: true })
    designation: string;

    @Prop({ required: true })
    appliedThrough: string;

    @Prop({ required: true })
    status: string;

    @Prop({ required: false }) // Optional field for email
    emailAddress?: string;
}

// Define the main schema
@Schema()
export class DailyReports extends Document {
    @Prop({ type: Types.ObjectId })
    userId: Types.ObjectId
    @Prop({ type: [Job], default: [] }) // Array of Job subdocuments
    jobsdata: Types.Array<Job>;
}

// Create the Mongoose schemas
export const JobSchema = SchemaFactory.createForClass(Job);
export const DailyReportsSchema = SchemaFactory.createForClass(DailyReports);
