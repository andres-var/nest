import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpStatus, Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { I18nMiddleware } from 'nestjs-i18n';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);

  app.use(compression());

  app.setGlobalPrefix('api');

  app.use(I18nMiddleware);

  app.enableCors({
    origin: process.env.HOST_FRONTEND,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle(process.env.NAME_PROJECT)
    .setDescription(`${process.env.NAME_PROJECT} endpoints`)
    .setVersion('1.0')
    .setExternalDoc('Postman Collection', '/docs-json')
    .addBearerAuth({
      description: `Please enter token in following format: Bearer <JWT>`,
      name: 'Authorization',
      bearerFormat: 'Bearer',
      scheme: 'Bearer',
      type: 'http',
      in: 'Header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  await app.listen(+process.env.PORT);

  logger.log(`App running on port ${process.env.PORT}`);
}
bootstrap();
