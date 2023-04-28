/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
  .setTitle('API End-points for Application')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app,config);

  SwaggerModule.setup('api', app, document);
  
  // Declare and initialize corsOptions
  const corsOptions: CorsOptions = {
    origin: '*'
  };
   // Enable CORS for all routes
   app.enableCors(corsOptions);
  
  await app.listen(process.env.PORT);
}
bootstrap();
