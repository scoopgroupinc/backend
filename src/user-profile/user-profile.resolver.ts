/* eslint-disable prettier/prettier */
import { Resolver, Args, Mutation, Query } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { UserProfile } from './user-profile.entity'
import { UserProfileService } from './user-profile.service'
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard'
import { UserProfileInput } from './dto/user-profile.input'
import { GetUserPromptIdsOutput } from './dto/user-profile.ouput'

@Resolver(() => UserProfile)
export class UserProfileResolver {
    constructor(private userProfileService: UserProfileService) {}

    @Mutation(() => UserProfile, { name: 'saveUserProfile' })
    @UseGuards(GqlAuthGuard)
    async saveUserProfile(
        @Args('userProfileInput') userProfileInput: UserProfileInput
        // eslint-disable-next-line prettier/prettier
    ): Promise<any> {
        return await this.userProfileService.saveUserProfile(userProfileInput)
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => UserProfile, { name: 'getUserProfile' })
    async getUserProfile(@Args('userId') userId: string): Promise<any> {
        return await this.userProfileService.findOne(userId)
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => GetUserPromptIdsOutput, { name: 'getPromptIds' })
    async getUserPromptIds(@Args('userId') userId: string): Promise<string[]> {
        return this.userProfileService.getUserPromptIds(userId)
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => UserProfile, { name: 'getFullProfile' })
    async getFullProfile(@Args('userId') userId: string): Promise<UserProfile> {
        return this.userProfileService.getFullProfile(userId)
    }
}
