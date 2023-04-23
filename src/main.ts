import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import { NextFunction, Request, Response } from 'express';
import { join } from 'path';
import { ResponseCaptor } from 'src/common/response';
import { HttpFilter } from 'src/common/HttpFilter';

declare const module: any;

function MiddleWareAll(req: Request, res: Response, next: NextFunction) {
  next();
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(
    session({
      secret: 'qinzhuan',
      name: 'qinzhuan.uid',
      rolling: true,
      cookie: {
        maxAge: 999999,
      },
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true
    }),
  );
  app.useGlobalInterceptors(new ResponseCaptor());
  app.useGlobalFilters(new HttpFilter());
  app.useStaticAssets(join(__dirname, 'images'));
  app.use(MiddleWareAll);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  await app.listen(3000);
}
bootstrap();
