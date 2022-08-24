import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ComplaintsResolver } from './complaints.resolver'
import { ComplaintsService } from './complaints.service'
import { Complaints } from './entities/complaints.entity'

@Module({
    imports: [
        TypeOrmModule.forFeature([Complaints]),
        HttpModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                baseURL: `${configService.get('fileServer_Url')}complaints/`,
                headers: {
                    ipaddress: process.env.FILE_SERVICE_IPADDRESS,
                    clientKey: process.env.FILE_SERVICE_CLIENT_KEY,
                },
            }),
        }),
    ],
    providers: [ComplaintsResolver, ComplaintsService],
    exports: [],
})
export class ComplaintsModule {}
