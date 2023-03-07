import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { PrismaService } from '@services/prisma/prisma.service';
import { APIPrefix } from '@constant/common';
import { join } from 'path';
import { json } from 'body-parser';

const { NODE_ENV, PORT } = process.env;

async function bootstrap() {
  const logger = new Logger('App');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(APIPrefix.Version);
  app.enableShutdownHooks();

  app.use((req, res, next) => {
    console.log('---');
    console.log(req.method + ' ' + req.path);

    try {
      next();
    } catch (ex) {
      console.log(ex);
    }
  });

  app.enableCors();

  app.use(json({ limit: '100mb' }));

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  const sConfig = new DocumentBuilder()
    .setTitle('ELASTIC SEARCH API')
    .setDescription('Simple example of implementation Elastic search')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, sConfig);
  SwaggerModule.setup('api-doc', app, document);

  console.log(PORT);
  const port = NODE_ENV == 'prod' ? 3004 : PORT;
  await app.listen(port);
  logger.log(`App started on port ${port}... Link: http://localhost:${port}`);
}

bootstrap();
