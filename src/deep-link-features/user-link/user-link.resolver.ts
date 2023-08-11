import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { UserLinkService } from './user-link.service'
import { UserLink } from './user-link.entity'
import { UserProfile } from 'src/user-profile/user-profile.entity'

@Resolver(() => UserLink)
export class UserLinkResolver {
    constructor(private readonly userLinkService: UserLinkService) {}

    @Query(() => UserProfile)
    async getUserProfileByLinkId(
        @Args('id', { type: () => String }) id: string
    ): Promise<UserProfile> {
        return this.userLinkService.getUserProfileByShareLinkId(id)
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => UserLink)
    async getUserShareProfileLink(
        @Args('userId') userId: string
    ): Promise<UserLink> {
        return this.userLinkService.getUserShareProfileLink(userId)
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => UserLink)
    async updateUserLinkState(
        @Args('id', { type: () => String }) id: string,
        @Args('state') state: string
    ): Promise<UserLink> {
        return this.userLinkService.update(id, { state })
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => UserLink)
    async deleteUserLink(
        @Args('id', { type: () => String }) id: string
    ): Promise<UserLink> {
        return this.userLinkService.delete(id)
    }
}
