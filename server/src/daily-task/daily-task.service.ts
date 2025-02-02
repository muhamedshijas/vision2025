import { Injectable } from '@nestjs/common';
import { AddJobsDto } from './dto/addJob.dto';
import { DailyReports } from 'src/schma/daily-report.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { catchError } from 'rxjs';
import { AddDailyFeedbackDto } from './dto/addDailyFeedback.dto';
import { DailyRoutineDto } from './dto/dailyRoutine.dto';
import { calculateAverageHealthScore, calculateFoodScore, calculateNormalizedCommit, calculateNormalizedProblems, calculateSleepDuration, calculateSleepScore, calculateTypingAverage, caluclalateNormalizedJobs, calulateNormalizedWpm } from 'src/utils/scoreCaluculater';
import { DailySkillDto } from './dto/dailySkill.dto';


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
      if (!data) {
        return
      }
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
  async getDaillyFeedback(userId) {
    const date = new Date()
    date.setDate(date.getDate() - 1);

    // Format the date in YYYY-MM-DD format
    const yesterday = date.toISOString().split('T')[0];


    // Output: "2025-01-26"

    const data = await this.dailyReportModel.findOne({ userId: userId, date: yesterday }).lean()


    if (!data) {

      return
    }

    const feedback = data.daily_Quote

    return feedback
  }
  async addDailyFeedback(addDailyFeedback: AddDailyFeedbackDto) {
    try {
      const userId = addDailyFeedback.userId
      const date = addDailyFeedback.date
      const daily_Quote = {
        overAll: addDailyFeedback.overAll,
        phrase: addDailyFeedback.phrase,
        productivity: addDailyFeedback.productivity,
        interaction: addDailyFeedback.interaction,
        rating: addDailyFeedback.rating
      }

      const userData = await this.dailyReportModel.findOne({ userId: userId, date: date }).lean()

      if (userData) {
        // If data exists, update the daily_Quote
        await this.dailyReportModel.findOneAndUpdate(
          { userId: userId, date: date },
          { $set: { daily_Quote: daily_Quote } },
          { new: true } // This option returns the updated document
        )
        console.log("Daily feedback updated successfully")
      } else {
        // If no data exists, create a new entry
        await this.dailyReportModel.create({
          userId: userId,
          date: date,
          daily_Quote: daily_Quote
        })
        console.log("Daily feedback added successfully")
      }

    } catch (error) {
      console.error("Error while adding or updating daily feedback:", error)
      // Optionally, you can throw the error again to be handled higher in the stack if needed
      throw new Error("Error adding or updating daily feedback")
    }
  }

  async addDailyRoutineScore(dailRoutineDto: DailyRoutineDto) {
    const { bedTime, wakeUpTime, foods, userId } = dailRoutineDto
    console.log(bedTime, wakeUpTime);

    const result = await calculateSleepDuration(bedTime, wakeUpTime)
    const hours = parseInt(result.split(' ')[0]);
    const dailyHealthRoutine = {
      sleepHour: hours,
      foods: foods
    }
    const date = new Date()
    date.setDate(date.getDate() - 1);

    // Format the date in YYYY-MM-DD format
    const yesterday = date.toISOString().split('T')[0];

    const existingData = await this.dailyReportModel.findOne({ userId: userId, date: yesterday }).lean()
    if (existingData) {

      await this.dailyReportModel.findOneAndUpdate(
        { userId: userId, date: yesterday },
        { $set: { "daily_Routine.dailyRoutineHealth": dailyHealthRoutine } },
        { new: true } // This option returns the updated document
      )

    } else {
      await this.dailyReportModel.create({
        userId: userId,
        date: yesterday,
        "daily_Routine.dailyRoutineHealth": dailyHealthRoutine
      })
      console.log("Daily healthRoutine added successfully")
    }


  }
  async addDailySkillScore(dailySkillDto: DailySkillDto) {
    const { userId } = dailySkillDto
    const dailySkill = {
      typingScore: dailySkillDto.typingScore,
      commits: dailySkillDto.gitCommits,
      problems: dailySkillDto.leetCodeProblems
    }
    const date = new Date()
    date.setDate(date.getDate() - 1);

    // Format the date in YYYY-MM-DD format
    const yesterday = date.toISOString().split('T')[0];

    const existingData = await this.dailyReportModel.findOne({ userId: userId, date: yesterday }).lean()
    if (existingData) {

      await this.dailyReportModel.findOneAndUpdate(
        { userId: userId, date: yesterday },
        { $set: { "daily_Routine.dailyRoutineSkills": dailySkill } },
        { new: true } // This option returns the updated document
      )

    } else {
      await this.dailyReportModel.create({
        userId: userId,
        date: yesterday,
        "daily_Routine.dailyRoutineSkills": dailySkill
      })
      console.log("Daily feedback added successfully")
      return
    }
  }

  async getDailyRoutineScores(userId) {
    try {
      const date = new Date()
      date.setDate(date.getDate() - 1);

      // Format the date in YYYY-MM-DD format
      const yesterday = date.toISOString().split('T')[0];
      const data = await this.dailyReportModel.findOne({ userId: userId, date: yesterday }).lean()
      if (!data) {
        return
      }
      const jobCount = data.jobsdata.length
      const routines = data.daily_Routine
      const skill = routines.dailyRoutineSkills
      const health = routines.dailyRoutineHealth
      const typingAverage = calculateTypingAverage(skill.typingScore)
      const sleepScore = await calculateSleepScore(health.sleepHour)
      const foodScore = calculateFoodScore(health.foods)
      const avgHelathScore = calculateAverageHealthScore(foodScore, sleepScore)
      const normalizedWpm = calulateNormalizedWpm(typingAverage)
      const normalizedCommits = calculateNormalizedCommit(skill.commits)
      const normalizedProblems = calculateNormalizedProblems(skill.problems)
      const normalizedJobs = caluclalateNormalizedJobs(jobCount)


      const routineData = {
        gitCommit: skill.commits,
        problems: skill.problems,
        applications: jobCount,
        avgWpm: typingAverage,
        sleepHr: health.sleepHour,
        foodScore: foodScore,
        sleepScore: sleepScore,
        avgHelathScore: avgHelathScore.averageScore,
        normalizedFoodScore: avgHelathScore.normalizedFoodScore,
        normalizedSleepScore: avgHelathScore.normalizedSleepScore
      }
      return routineData


    } catch (err) {
      console.log(err)
    }
  }
}
