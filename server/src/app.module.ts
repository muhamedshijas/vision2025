import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { DailyTaskModule } from './daily-task/daily-task.module';
import { MonthlTaskModule } from './monthl-task/monthl-task.module';
import { AnnualTaskModule } from './annual-task/annual-task.module';

@Module({
  imports: [
    // Load environment variables
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration globally available
    }),

    // Connect to MongoDB using the MONGO_URI from .env
    MongooseModule.forRoot(process.env.MONGO_URI),

    AuthModule,

    ProfileModule,

    DailyTaskModule,

    MonthlTaskModule,

    AnnualTaskModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
