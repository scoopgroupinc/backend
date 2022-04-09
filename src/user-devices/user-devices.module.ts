import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserDevice } from './entities/user-devices.entity'
import { UserDeviceResolver } from './user-devices.resolver'
import { UserDeviceService } from './user-devices.service'
import { JwtModule } from '@nestjs/jwt'

@Module({
    imports: [
        TypeOrmModule.forFeature([UserDevice]),
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '1d' },
        }),
    ],
    providers: [UserDeviceResolver, UserDeviceService],
    exports: [UserDeviceService],
})
export class UserDeviceModule {}
