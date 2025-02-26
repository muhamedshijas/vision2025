import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, mongo } from 'mongoose';
import { DailyReports } from 'src/schma/daily-report.schema';
import { MonthlyReports } from 'src/schma/monthly-report-schema';
import { AddGoalDto } from './dto/addGoal.dto';

@Injectable()
export class MonthlTaskService {
  constructor(
    @InjectModel(DailyReports.name) private dailyReportModel: Model<DailyReports>,
    @InjectModel(MonthlyReports.name) private monthlyReportModel: Model<MonthlyReports>
  ) { }
  async getJobsbyMonth(month: string, userId: string) {
    // Convert month string (e.g. 'Jan') to numeric month
    const monthMap = {
      Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
      Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12
    };

    const numericMonth = monthMap[month];
    if (!numericMonth) {
      throw new Error('Invalid month provided');
    }

    // Query database for records that match the given month
    const reports = await this.dailyReportModel.find(
      {
        userId: userId,
        $expr: {
          $eq: [{ $month: { $dateFromString: { dateString: "$date" } } }, numericMonth],
        },
      },
      {
        jobsdata: 1, date: 1 // Include only jobsdata and date fields
      }
    )

    // Flatten jobsdata and attach the corresponding date from report
    const allJobs = reports.flatMap(report =>
      (report.jobsdata || []).map(job => ({
        ...job.toObject(), // Convert Mongoose document to plain object
        date: report.date, // Attach date to each job
      }))
    );

    return allJobs;
  }

  async addMonthlyGoals(addGoalDto: AddGoalDto) {
    const date = new Date();

    const monthAbbreviations = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentMonth = monthAbbreviations[date.getMonth()]; // Get month as "Jan", "Feb", etc.

    // Format date as dd-mm-yyyy
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;

    const existingReport = await this.monthlyReportModel.findOne({
      userId: addGoalDto.userId,
      month: currentMonth,
    });

    if (existingReport) {
      // Push new goal to the existing monthly report
      existingReport.monthlyGoals.push({
        startedDate: formattedDate, // Store date as dd-mm-yyyy
        title: addGoalDto.goal,
        isCompleted: false,
        completedDate: null
      });

      await existingReport.save(); // Save the updated document
      return existingReport;
    } else {
      // Create a new monthly report if it does not exist
      const newReport = new this.monthlyReportModel({
        userId: addGoalDto.userId,
        month: currentMonth,
        monthlyGoals: [
          {
            startedDate: formattedDate, // Store date as dd-mm-yyyy
            title: addGoalDto.goal,
            isCompleted: false,
            completedDate: null
          }
        ]
      });

      await newReport.save(); // Save the new document
      return newReport;
    }
  }

  async getGoals(userId, month) {


    const data = await this.monthlyReportModel.findOne({ month: month, userId: userId }).lean()
    if (!data || data == null) {
      return
    }
    const goals = data.monthlyGoals
    return goals
  }
  async deleteGoal(userId, goal) {
    const response = await this.monthlyReportModel.updateOne(
      { userId: userId },
      { $pull: { "monthlyGoals": { title: goal } } } // Correct syntax
    );
    console.log(goal, userId)
    return { message: 'goal removed successfully' };
  }
  async updateGoal(body) {
    const { userId, goal, isCompleted } = body


    console.log(goal);
    console.log(isCompleted);


    try {
      const updated = await this.monthlyReportModel.updateOne(
        { userId: userId, 'monthlyGoals.title': goal },
        { $set: { 'monthlyGoals.$.isCompleted': !isCompleted } }
      );
      return { status: true }

    } catch (err) {
      console.log(err);

    }
  }
  async getFeedbacks(userId, month) {
    const monthMap = {
      Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
      Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12
    };

    const numericMonth = monthMap[month];
    if (!numericMonth) {
      throw new Error('Invalid month provided');
    }

    // Query database for records that match the given month
    const reports = await this.dailyReportModel.find(
      {
        userId: userId,
        $expr: {
          $eq: [{ $month: { $dateFromString: { dateString: "$date" } } }, numericMonth],
        },
      },
      {
        daily_Quote: 1, date: 1 // Include only jobsdata and date fields
      }
    )
    return reports
    
  }
}
