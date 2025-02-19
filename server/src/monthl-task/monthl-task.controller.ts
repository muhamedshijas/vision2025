import { Controller, Get, Post, Body, Query, Req, Delete, Param } from '@nestjs/common';
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

  @Get("get-goals")
  async getGoals(@Query("userId") userId: string, @Query("month") month: string) {
    return this.monthlTaskService.getGoals(userId, month)
  }
  @Delete('deletegoal')
  async deleteVision(@Query('userId') userId: string,
    @Query('goal') goal: string) {

    return this.monthlTaskService.deleteGoal(userId, goal)

  }
}
