import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BlockedUserModule } from 'src/blocked-users/blocked-users.module'
import { MatchesModule } from 'src/matches/matches.modules.'
import { UserPreferenceModule } from 'src/user-preference/user-preference.module'
import { UserProfileModule } from 'src/user-profile/user-profile.module'
import { UserPromptsModule } from 'src/user-prompts/user-prompts.module'
import { UserTagsTypeVisibleModule } from 'src/user-tags-type-visible/user-tags-type-visible.module'
import { UserModule } from 'src/user/user.module'
import { UserChoice } from './entities/user-choice.entity'
import { UserChoiceResolver } from './user-choice.resolver'
import { UserChoiceService } from './user-choice.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([UserChoice]),
        UserPreferenceModule,
        UserProfileModule,
        UserModule,
        MatchesModule,
        BlockedUserModule,
        UserPromptsModule,
        UserTagsTypeVisibleModule,
        HttpModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                baseURL: `${configService.get('fileServer_Url')}visuals/`,
                headers: {
                    ipaddress: process.env.FILE_SERVICE_IPADDRESS,
                    clientKey: process.env.FILE_SERVICE_CLIENT_KEY,
                },
            }),
        }),
    ],
    providers: [UserChoiceResolver, UserChoiceService],
    exports: [],
})
export class UserChoiceModule {}
