import { Module } from '@nestjs/common';
import { AnnualTaskService } from './annual-task.service';
import { AnnualTaskController } from './annual-task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DailyReports, DailyReportsSchema } from 'src/schma/daily-report.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DailyReports.name, schema: DailyReportsSchema }, // Correct schema and name
    ]),
  ],
  controllers: [AnnualTaskController],
  providers: [AnnualTaskService],
})
export class AnnualTaskModule { }
