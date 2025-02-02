import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { DailyTaskService } from './daily-task.service';
import { AddJobsDto } from './dto/addJob.dto';
import { AddDailyFeedbackDto } from './dto/addDailyFeedback.dto';
import { DailyRoutineDto } from './dto/dailyRoutine.dto';
import { DailySkillDto } from './dto/dailySkill.dto';
@Controller('daily-task')
export class DailyTaskController {
  constructor(private readonly dailyTaskService: DailyTaskService) { }

  @Post('add-job')
  async addJob(@Body() addJobDto: AddJobsDto) {
    return this.dailyTaskService.addJobs(addJobDto)
  }

  @Get('get-jobs/:userId')
  async getJobs(@Param('userId') userId: string) {
    return this.dailyTaskService.getJobs(userId);
  }

  @Put('update-status/:userId')
  async updateJobStatus(
    @Param('userId') userId: string,
    @Body() body: { status: string; jobId: string }
  ) {
    const { status, jobId } = body
    return this.dailyTaskService.updateJobStatus(userId, jobId, status)
  }

  @Delete('delete-job/:userId')
  async deleteJob(
    @Param('userId') userId: string,
    @Body('jobId') jobId: string,
    @Body('date') date: string,
  ) {
    return this.dailyTaskService.deleteJobs(userId, jobId)
  }

  @Get('get-feedback/:userId')
  async getDailyFeedback(@Param('userId') userId: string) {

    return this.dailyTaskService.getDaillyFeedback(userId)
  }

  @Post('add-daily-feedback')
  async addDailyQuotes(@Body() dailyFeedbackDto: AddDailyFeedbackDto) {
    return this.dailyTaskService.addDailyFeedback(dailyFeedbackDto)

    return
  }

  @Post('add-daily-health-data')
  async addDailyHealthData(@Body() dailRoutineDto: DailyRoutineDto) {
    return this.dailyTaskService.addDailyRoutineScore(dailRoutineDto)
  }

  @Post('add-daily-skill-data')
  async addDailySkillData(@Body() dailySkillDto: DailySkillDto) {
    return this.dailyTaskService.addDailySkillScore(dailySkillDto)
  }

  @Get('get-daily-routine/:userId')
  async getDailyRoutine(@Param('userId') userId: string) {
    return this.dailyTaskService.getDailyRoutineScores(userId)

  }

}
