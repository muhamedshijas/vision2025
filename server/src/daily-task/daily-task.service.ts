import { Injectable } from '@nestjs/common';
import { AddJobsDto } from './dto/addJob.dto';
import { DailyReports } from 'src/schma/daily-report.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class DailyTaskService {
  constructor(@InjectModel(DailyReports.name) private dailyReportModel: Model<DailyReports>) { }
  async addJobs(addJobData: AddJobsDto) {
    try {
      const jobs = {company:"abc",designation:"x",appliedThrough:"y",status:"p" }
      console.log(jobs);
      await this.dailyReportModel.create({
        userId: addJobData.userId,
        jobsdata: jobs
      })
    } catch (err) {
      console.log(err);
    }
  }
}
