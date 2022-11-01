import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FeedBack } from './entities/feedback.entity'
import { FeedBackResolver } from './feedback.resolver'
import { FeedBackService } from './feedback.service'


@Module({
    imports: [
        TypeOrmModule.forFeature([FeedBack]),
        HttpModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                baseURL: `${configService.get('fileServer_Url')}feedback/`,
                headers: {
                    ipaddress: process.env.FILE_SERVICE_IPADDRESS,
                    clientKey: process.env.FILE_SERVICE_CLIENT_KEY,
                },
            }),
        }),
    ],
    providers: [FeedBackService, FeedBackResolver],
    exports: [],
})
export class FeedBackModule {}
