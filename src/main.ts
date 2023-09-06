/* eslint-disable prettier/prettier */
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import logger from './utils/logger'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule)

    app.enableCors()
    app.useGlobalPipes(new ValidationPipe())
    app.setViewEngine('ejs')
    const configService = app.get(ConfigService)
    const port = configService.get('port')
    logger.debug(port)
    await app.listen(port || process.env.PORT)
}
bootstrap()
