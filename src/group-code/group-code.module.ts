import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserProfileModule } from 'src/user-profile/user-profile.module'
import { UserModule } from 'src/user/user.module'
import { GroupCodes } from './entities/group.entity'
import { UserGroupCodes } from './entities/userCodes.entity'
import { GroupCodesResolver } from './group-code.resolver'
import { GroupCodesService } from './group-code.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([GroupCodes, UserGroupCodes]),
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
    providers: [GroupCodesResolver, GroupCodesService],
    exports: [GroupCodesService],
})
export class GroupCodesModule {}
