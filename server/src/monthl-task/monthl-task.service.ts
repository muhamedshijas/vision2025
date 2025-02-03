import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DailyReports } from 'src/schma/daily-report.schema';

@Injectable()
export class MonthlTaskService {
  constructor(@InjectModel(DailyReports.name) private dailyReportModel: Model<DailyReports>) { }
  async getJobsbyMonth(month: string) {
    // Convert month string (e.g. 'Jan') to the corresponding numeric month (1 for Jan, 2 for Feb, etc.)
    const monthMap = {
      Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
      Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12
    };

    const numericMonth = monthMap[month];
    if (!numericMonth) {
      console.log("hiii");

      throw new Error('Invalid month provided');
    }

    // Query the database for records that match the given month
    const reports = await this.dailyReportModel.find(
      {
        // Check if the month part of the date matches the given month
        $expr: {
          $eq: [{ $month: { $dateFromString: { dateString: "$date" } } }, numericMonth],
        },
      },
      {
        // Specify to include only the "jobs" field in the result
        jobsdata: 1,  // Include only the "jobs" field
      }
    );
  

    return reports;
  }
}
