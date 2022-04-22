import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserDevice } from './entities/user-devices.entity'
import { UserDeviceResolver } from './user-devices.resolver'
import { UserDeviceService } from './user-devices.service'

@Module({
    imports: [TypeOrmModule.forFeature([UserDevice])],
    providers: [UserDeviceResolver, UserDeviceService],
    exports: [UserDeviceService],
})
export class UserDeviceModule {}
