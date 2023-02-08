import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HttpModule } from '@nestjs/axios'
import { UserPreferenceModule } from 'src/user-preference/user-preference.module'
import { UserProfileModule } from 'src/user-profile/user-profile.module'
import { UserModule } from 'src/user/user.module'
import { Matches } from './entities/matches.entity'
import { MatchesResolver } from './matches.resolver'
import { MatchesService } from './matches.service'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
    imports: [
        TypeOrmModule.forFeature([Matches]),
        UserModule,
        UserProfileModule,
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
    providers: [MatchesResolver, MatchesService],
    exports: [MatchesService],
})
export class MatchesModule {}
