import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserPrompts } from './entities/user-prompts.entity'
import { UserPromptsService } from './user-prompts.service'
import { UserPromptsResolver } from './user-prompts.resolver'
import { PromptsModule } from 'src/prompts/prompts.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { RatingModule } from 'src/rating/rating.module'

@Module({
    imports: [
        TypeOrmModule.forFeature([UserPrompts]),
        HttpModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                baseURL: `${configService.get('fileServer_Url')}userDisplay/`,
                headers: {
                    ipaddress: process.env.FILE_SERVICE_IPADDRESS,
                    clientKey: process.env.FILE_SERVICE_CLIENT_KEY,
                },
            }),
        }),
        PromptsModule,
        RatingModule,
    ],
    providers: [UserPromptsResolver, UserPromptsService],
    exports: [],
})
export class UserPromptsModule {}
