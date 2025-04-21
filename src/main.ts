import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Air Quality API')
    .setDescription('API for retrieving air quality data from IQAir service')
    .setVersion('1.0')
    .addTag('Air Quality')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
  new Logger('APP').log(
    `🚀🚀🚀 APP server started at port: ${configService.get('PORT')}`,
  );
}

bootstrap();
