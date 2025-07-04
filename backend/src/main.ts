import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['https://ai-learning-path-generator.vercel.app'], // <-- yahan apna frontend URL daal
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  app.use(express.json());
  await app.listen(process.env.PORT ?? 6969);
}
bootstrap();
