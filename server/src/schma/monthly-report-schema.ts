import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export class MonthlyGoal {
  @Prop({ required: true })
  startedDate: string;

  @Prop({ required: true })
  title: string;

  @Prop({ default: false })
  isCompleted: boolean;

  @Prop({ default: null })
  completedDate?: Date;

}

const MonthlyGoalSchema = SchemaFactory.createForClass(MonthlyGoal);

@Schema()
export class MonthlyReports extends Document {
  @Prop({ type: Types.ObjectId, required: true, ref: "User" })
  userId: Types.ObjectId;

  @Prop({ type: [MonthlyGoalSchema], default: [] })
  monthlyGoals: MonthlyGoal[];

  @Prop({ type: String })
  month: String
}


export const MonthlyReportsSchema = SchemaFactory.createForClass(MonthlyReports);
