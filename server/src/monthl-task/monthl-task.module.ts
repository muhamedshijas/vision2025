import { Module } from '@nestjs/common';
import { MonthlTaskService } from './monthl-task.service';
import { MonthlTaskController } from './monthl-task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DailyReports, DailyReportsSchema } from 'src/schma/daily-report.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DailyReports.name, schema: DailyReportsSchema }, // Correct schema and name
    ]),
  ],
  controllers: [MonthlTaskController],
  providers: [MonthlTaskService],
})
export class MonthlTaskModule { }
