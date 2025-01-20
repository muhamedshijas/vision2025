import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DailyTaskService } from './daily-task.service';
import { DailyTaskController } from './daily-task.controller';
import { DailyReports, DailyReportsSchema } from 'src/schma/daily-report.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DailyReports.name, schema: DailyReportsSchema }, // Correct schema and name
    ]),
  ],
  controllers: [DailyTaskController],
  providers: [DailyTaskService],
})
export class DailyTaskModule {}
