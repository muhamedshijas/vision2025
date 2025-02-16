import { Controller, Get, Post, Body, Query, Req } from '@nestjs/common';
import { MonthlTaskService } from './monthl-task.service';
import { AddGoalDto } from './dto/addGoal.dto';


@Controller('monthly-task')
export class MonthlTaskController {
  constructor(private readonly monthlTaskService: MonthlTaskService) { }

  @Get("get-jobs")
  async getJobsByMonth(@Query("userId") userId: string, @Query("month") month: string, @Req() req: Request) {
    return this.monthlTaskService.getJobsbyMonth(month, userId);
  }

  @Post("add-goal")
  async addGoal(@Body() addGoalDto: AddGoalDto) {
    return this.monthlTaskService.addMonthlyGoals(addGoalDto)
  }
}
