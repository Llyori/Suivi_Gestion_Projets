import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as nunjucks from 'nunjucks';
import { AppModule } from './app.module';
import { urlencoded } from 'express';
import { ValidationPipe } from '@nestjs/common';
import { ValidationException } from './validation.exception';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: true,
  });
  const isProd =
  process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging';
app.enableCors();
app.use(urlencoded({ extended: true }));

  nunjucks.configure('views', {
    autoescape: true,
    noCache: !isProd,
    express: app,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      errorHttpStatusCode: 422,
      exceptionFactory: (errors) => new ValidationException(errors),
    }),
  );

  app.useStaticAssets(join(__dirname,  '..', '..', 'public'));
  app.setBaseViewsDir(join(__dirname,  '..', '..', 'views'));
  app.setViewEngine('njk');

  await app.listen(3000);
}
bootstrap()