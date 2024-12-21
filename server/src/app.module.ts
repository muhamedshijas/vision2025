import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Load environment variables
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration globally available
    }),

    // Connect to MongoDB using the MONGO_URI from .env
    MongooseModule.forRoot(process.env.MONGO_URI),

    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
