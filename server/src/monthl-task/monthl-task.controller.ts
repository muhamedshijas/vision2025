import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { MonthlTaskService } from './monthl-task.service';


@Controller('monthly-task')
export class MonthlTaskController {
  constructor(private readonly monthlTaskService: MonthlTaskService) { }

  @Get("get-jobs")
  async getJobsByMonth(@Query("userId") userId: string, @Query("month") month: string,@Req() req: Request) {
    console.log(month);
    return this.monthlTaskService.getJobsbyMonth(month, userId);
  }
}
