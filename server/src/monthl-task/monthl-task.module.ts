import { Module } from '@nestjs/common';
import { MonthlTaskService } from './monthl-task.service';
import { MonthlTaskController } from './monthl-task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DailyReports, DailyReportsSchema } from 'src/schma/daily-report.schema';
import { MonthlyReports, MonthlyReportsSchema } from 'src/schma/monthly-report-schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DailyReports.name, schema: DailyReportsSchema },
      { name: MonthlyReports.name, schema: MonthlyReportsSchema }
    ]),
  ],
  controllers: [MonthlTaskController],
  providers: [MonthlTaskService],
})
export class MonthlTaskModule { }
