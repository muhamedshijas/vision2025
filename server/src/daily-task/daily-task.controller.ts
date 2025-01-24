import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { DailyTaskService } from './daily-task.service';
import { AddJobsDto } from './dto/addJob.dto';
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
}
