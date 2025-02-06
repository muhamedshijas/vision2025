import { Controller, Get, Param } from '@nestjs/common';
import { AnnualTaskService } from './annual-task.service';

@Controller('annual-task')
export class AnnualTaskController {
  constructor(private readonly annualTaskService: AnnualTaskService) { }
  @Get('get-jobs/:userId')
  async getJobs(@Param('userId') userId: string) {
    return this.annualTaskService.getJobs(userId)

  }
}
