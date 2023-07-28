import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserLink } from './user-link.entity'
import { UserLinkService } from './user-link.service'
import { UserLinkResolver } from './user-link.resolver'
import { UserProfileModule } from 'src/user-profile/user-profile.module'

@Module({
    imports: [TypeOrmModule.forFeature([UserLink]), UserProfileModule],
    providers: [UserLinkResolver, UserLinkService],
    exports: [UserLinkService],
})
export class UserLinkModule {}
