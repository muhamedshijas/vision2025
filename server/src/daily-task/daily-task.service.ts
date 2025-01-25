import { Injectable } from '@nestjs/common';
import { AddJobsDto } from './dto/addJob.dto';
import { DailyReports } from 'src/schma/daily-report.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { catchError } from 'rxjs';

@Injectable()
export class DailyTaskService {
  constructor(@InjectModel(DailyReports.name) private dailyReportModel: Model<DailyReports>) { }

  async addJobs(addJobData: AddJobsDto) {
    try {
      const { company, designation, place, status, date, appliedThrough, email, userId } = addJobData;

      // Prepare the job object
      const job = {
        company,
        designation,
        place,
        status,
        appliedThrough,
        email: appliedThrough === 'Email' ? email : undefined, // Include email only if "appliedThrough" is Email
      };

      // Check if a report already exists for the user and date
      let dailyReport = await this.dailyReportModel.findOne({ userId, date });

      if (dailyReport) {
        // Add the job to the existing document
        dailyReport.jobsdata.push(job);
      } else {
        // Create a new document
        dailyReport = new this.dailyReportModel({
          userId,
          date,
          jobsdata: [job],
        });
      }

      // Save the document
      await dailyReport.save();

      return { success: true, message: 'Job added successfully' };
    } catch (err) {
      console.error('Error adding job:', err);
      throw new Error('Failed to add job');
    }
  }

  async getJobs(userId: string) {
    // Get today's date
    const today = new Date();
    userId = "676b930153f92b562590d2f2"
    // Format the date as "dd/MM/yyyy"
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;


    try {
      // Query the database for the specific user and date
      const data = await this.dailyReportModel.findOne({ userId, date: formattedDate });

      const jobs = data.jobsdata
      return jobs

    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw new Error('Failed to fetch jobs');
    }
  }

  async updateJobStatus(userId, jobId, status) {
    try {
      await this.dailyReportModel.updateOne(
        { userId: userId, 'jobsdata._id': jobId },
        { $set: { 'jobsdata.$.status': status } }
      );
      return { status: true }
    } catch (err) {
      console.log(err);

    }
  }

  async deleteJobs(userId: string, jobId: string): Promise<void> {
    try {
      // Validate inputs
      if (!Types.ObjectId.isValid(jobId)) {
        throw new Error(`Invalid jobId: ${jobId}`);
      }
      const updatedId = new Types.ObjectId(jobId);
  
      // Check if job exists for the user
      const jobExists = await this.dailyReportModel.findOne(
        { userId: userId, "jobsdata._id": updatedId }
      );
  
      // Perform the update operation
      const result = await this.dailyReportModel.updateOne(
        { userId: userId, "jobsdata._id": updatedId }, // Match by userId and jobId
        { $pull: { jobsdata: { _id: updatedId } } } // Pull the job with the correct _id
      );
  
  
      // After the update, re-fetch the document to confirm the job was deleted
      const updatedDocument = await this.dailyReportModel.findOne({ userId: userId });
    
    } catch (err) {
      console.error("Error deleting job:", err.message);
      throw err; // Rethrow the error for further handling
    }
  }
  
}
