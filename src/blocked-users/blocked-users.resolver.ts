import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { GqlAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { BlockUserService } from './blocked-users.service'
import { BlockUserOutput } from './dto/blocked-check.output'
import { BlockedUsers } from './entities/blocked-users.entity'

@Resolver(() => BlockedUsers)
export class BlockUserResolver {
    constructor(private blockedUserService: BlockUserService) {}

    @UseGuards(GqlAuthGuard)
    @Query(() => [BlockUserOutput])
    async isUserBlocked(
        @Args('userId') userId: string,
        @Args({ name: 'userIds', type: () => [String]}) userIds: string[]
    ): Promise<BlockUserOutput[]> {
        return await this.blockedUserService.checkUserBlocked(userId, userIds)
    }
}
