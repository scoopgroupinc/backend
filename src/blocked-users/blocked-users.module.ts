import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BlockUserService } from './blocked-users.service'
import { BlockedUsers } from './entities/blocked-users.entity'

@Module({
    imports: [TypeOrmModule.forFeature([BlockedUsers])],
    providers: [BlockUserService],
    exports: [BlockUserService],
})
export class BlockedUserModule {}
