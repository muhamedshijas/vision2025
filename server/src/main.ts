import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Replace with your frontend domain
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization', // You can add more allowed headers if needed
    credentials: true, // If you want to allow cookies or authentication headers
  });

  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('API for user authentication')
    .setVersion('1.0')
    .addTag('auth') // Tag for grouping endpoints
    .build();
  // Create Swagger document
  const document = SwaggerModule.createDocument(app, config);
  // Setup Swagger UI with the route '/api-docs'
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
