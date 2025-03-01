import { Controller, Get, Post, Body, Query, Req, Delete, Param, Put } from '@nestjs/common';
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
  async deleteVision(
    @Query('userId') userId: string,
    @Query('goal') goal: string,
    @Query('month') month: string // <-- Removed misplaced parenthesis
  ) {
    return this.monthlTaskService.deleteGoal(userId, goal,month);
  }

  @Put('updategoal')
  async updateGoal(@Body() body: { userId: string, isCompleted: boolean, goal: string, month: string }) {
    return this.monthlTaskService.updateGoal(body)
  }

  @Get('get-feedbacks')
  async getFeedbacks(@Query("userId") userId: string, @Query("month") month: string) {
    return this.monthlTaskService.getFeedbacks(userId, month)
  }

  @Get('get-scores')
  async getScores(@Query("userId") userId: string, @Query("month") month: string) {
    return this.monthlTaskService.getScores(userId, month)
  }

  @Get('get-scoresbyid/:id')
  async getScoresById(@Param('id') id: string) {
    return this.monthlTaskService.getScoreById(id)

  }
}
