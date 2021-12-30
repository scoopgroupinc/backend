import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config'; 
import {WsAdapter} from '@nestjs/platform-ws'
import {NestExpressApplication} from '@nestjs/platform-express'
import { RedisIoAdapter } from './chat/adapters/redis.adapter';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
<<<<<<< HEAD
  const serverConfig = config.get('server');
   
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //  app.useWebSocketAdapter(new RedisIoAdapter(app))
   app.enableCors();
   app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT || serverConfig.port
  console.log(port)
=======
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  const port = configService.get('PORT')
>>>>>>> b7b2a5e70f2ee2fbeb47525dac80466ac2d05b69
  await app.listen(port);
}
bootstrap();
