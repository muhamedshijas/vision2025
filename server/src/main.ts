import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
