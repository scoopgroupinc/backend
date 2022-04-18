import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { UserPreference } from './entities/user-preference.entity'
import { UserPreferenceService } from './user-preference.service'
import { UserPreferenceInput } from './dto/user-preference.input'
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard'

@Resolver(() => UserPreference)
export class UserPreferenceResolver {
    constructor(private preferenceService: UserPreferenceService) {}

    // @UseGuards(GqlAuthGuard)
    @Mutation(() => UserPreference, {
        description: 'Use this endpoint to savs and update entity',
    })
    async saveUserPreference(
        @Args('userPreferenceInput') userPreferenceInput: UserPreferenceInput
    ): Promise<UserPreferenceInput> {
        return await this.preferenceService.saveUserPreference(
            userPreferenceInput
        )
    }

    // @UseGuards(GqlAuthGuard)
    @Query(() => UserPreference, {
        name: 'getUserPreference',
        description: 'fetch user preference',
    })
    async getUserPreference(
        @Args('userId') userId: string
    ): Promise<UserPreference> {
        return await this.preferenceService.findOne(userId)
    }
}
