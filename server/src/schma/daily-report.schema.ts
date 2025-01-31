import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";

@Schema({ _id: true })
class Job {
  @Prop({ required: true })
  company: string;

  @Prop({ required: true })
  designation: string;

  @Prop({ required: true })
  appliedThrough: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: false })
  email?: string;

  @Prop({ required: true })
  place: string;
}

@Schema()
class DailyQuote {
  @Prop({ type: Number, required: true })
  rating: number;

  @Prop({ type: String, required: true })
  phrase: string;

  @Prop({ type: String, required: true })
  interaction: string;

  @Prop({ type: String, required: true })
  overAll: string;

  @Prop({ type: String, required: true })
  productivity: string;
}

@Schema()
class DailyRoutineHealth {
  @Prop({ type: String })
  sleepHour: Number

  @Prop({ type: Number })
  foodScore: Number
}

@Schema()
class DailyRoutineSkills {
  @Prop({ type: Number })
  wpm: number

  @Prop({ type: Number })
  commits: number

  @Prop({ type: Number })
  applications: number

  @Prop({ type: Number })
  problems: Number
}

@Schema()
class DailyRoutine {
  @Prop({ type: DailyRoutineSkills })
  dailyRoutineSkills: DailyRoutineSkills

  @Prop({ type: DailyRoutineHealth })
  dailyRoutineHealth: DailyRoutineHealth
}

@Schema()
export class DailyReports extends Document {
  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId;

  @Prop({ type: [Job], default: [] })
  jobsdata: Types.Array<Job>;

  @Prop({ type: String, required: true })
  date: string;

  @Prop({ type: DailyQuote, default: null })
  daily_Quote: DailyQuote;

  @Prop({ type: DailyRoutine })
  daily_Routine: DailyRoutine
}

export const JobSchema = SchemaFactory.createForClass(Job);
export const DailyQuoteSchema = SchemaFactory.createForClass(DailyQuote);
export const DailyReportsSchema = SchemaFactory.createForClass(DailyReports);
