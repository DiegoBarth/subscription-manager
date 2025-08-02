import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionFilter, AllExceptionsFilter } from './common/filters';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);

   const config = new DocumentBuilder()
      .setTitle('API Subscription Manager')
      .setDescription('API Documentation')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

   const document = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup('api', app, document);

   app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
   }));

   app.useGlobalFilters(
      new PrismaExceptionFilter(),
      new AllExceptionsFilter()
   );

   await app.listen(3000);
}

bootstrap();