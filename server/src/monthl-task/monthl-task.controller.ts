import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MonthlTaskService } from './monthl-task.service';


@Controller('monthl-task')
export class MonthlTaskController {
  constructor(private readonly monthlTaskService: MonthlTaskService) { }

  @Get('get-jobs/:month')
  async getJobsByMonth(@Param('month') month: string) {
    return this.monthlTaskService.getJobsbyMonth(month)
    
  }
}
