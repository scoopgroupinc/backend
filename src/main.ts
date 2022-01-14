import { GraphQLUpload } from 'graphql-upload';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {NestExpressApplication} from '@nestjs/platform-express'
import {WsAdapter} from '@nestjs/platform-ws'
import { RedisIoAdapter } from './chat/adapters/redis.adapter';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { config } from 'aws-sdk';
import {graphqlUploadExpress} from "graphql-upload"



async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
    //  app.useWebSocketAdapter(new RedisIoAdapter(app))
  app.enableCors();
  app.use(graphqlUploadExpress({ maxFileSize: 50000000, maxFiles: 10 }));
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService)
  const port = configService.get('PORT')
    config.update({
      accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
      region: configService.get('AWS_REGION'),
    });
  await app.listen(port);
}
bootstrap();
