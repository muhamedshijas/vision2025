import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DailyReports } from 'src/schma/daily-report.schema';

@Injectable()
export class AnnualTaskService {
    constructor(@InjectModel(DailyReports.name) private dailyReportModel: Model<DailyReports>) { }
    async getJobs(userId: string) {
        const reports = await this.dailyReportModel.find(
            { userId: userId }, // Fix: Close the first object properly
            { jobsdata: 1, date: 1 } // Fix: This is the projection object, should be separate
        ).lean();

        const allJobs = reports.flatMap(report =>
            report.jobsdata.map(job => ({ ...job, date: report.date }))
        ); 
        return allJobs;
    }

}
