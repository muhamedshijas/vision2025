import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, mongo } from 'mongoose';
import { DailyReports } from 'src/schma/daily-report.schema';
import { MonthlyReports } from 'src/schma/monthly-report-schema';

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

  async addMonthlyGoals(){
  
  }
}
