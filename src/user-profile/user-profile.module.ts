import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserProfile } from './entities/user-profile.entity'
import { User } from '../user/entities/user.entity'
import { UserProfileResolver } from './user-profile.resolver'
import { UserProfileService } from './user-profile.service'

@Module({
    imports: [TypeOrmModule.forFeature([UserProfile, User])],
    providers: [UserProfileResolver, UserProfileService],
    exports: [UserProfileService],
})
export class UserProfileModule {}
