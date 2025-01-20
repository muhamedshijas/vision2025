import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DailyTaskService } from './daily-task.service';
import { AddJobsDto } from './dto/addJob.dto';
@Controller('daily-task')
export class DailyTaskController {
  constructor(private readonly dailyTaskService: DailyTaskService) { }

  @Post('addJob')
  async addJob(@Body() addJobDto: AddJobsDto) {
    return this.dailyTaskService.addJobs(addJobDto)
  }
}
