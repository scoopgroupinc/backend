/* eslint-disable prettier/prettier */
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { WsAdapter } from '@nestjs/platform-ws'
import { RedisIoAdapter } from './chat/adapters/redis.adapter'
import { IoAdapter } from '@nestjs/platform-socket.io'
// import { graphqlUploadExpress } from 'graphql-upload'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule)
    // app.useWebSocketAdapter(new RedisIoAdapter(app))

    // app.use(graphqlUploadExpress())
    app.enableCors()
    app.useGlobalPipes(new ValidationPipe())
    app.setViewEngine('ejs')
    const configService = app.get(ConfigService)
    const port = configService.get('PORT')
    console.log(port)
    await app.listen(port)
}
bootstrap()
