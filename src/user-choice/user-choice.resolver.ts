import { UseGuards } from '@nestjs/common'
import { Args, Resolver, Query } from '@nestjs/graphql'
import { GqlAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { UserChoiceOutput } from './dto/user-choices.output'
import { UserChoiceService } from './user-choice.service'

@Resolver(() => UserChoiceOutput)
export class UserChoiceResolver {
    constructor(private userChoiceService: UserChoiceService) {}

    @UseGuards(GqlAuthGuard)
    @Query(() => [UserChoiceOutput])
    async getUserMatches(
        @Args('userId') userId: string
    ): Promise<UserChoiceOutput[]> {
        return await this.userChoiceService.getUserChoices(userId)
    }
}
