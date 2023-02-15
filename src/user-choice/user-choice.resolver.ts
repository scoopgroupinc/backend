import { UseGuards } from '@nestjs/common'
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql'
import { GqlAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { SwiperActionOutput } from './dto/swiper-action.output'
import { UserChoiceOutput } from './dto/user-choices.output'
import { UserChoiceService } from './user-choice.service'

@Resolver(() => UserChoiceOutput)
export class UserChoiceResolver {
    constructor(private userChoiceService: UserChoiceService) {}

    @UseGuards(GqlAuthGuard)
    @Query(() => [UserChoiceOutput])
    async getUserChoices(
        @Args('userId') userId: string
    ): Promise<UserChoiceOutput[]> {
        return await this.userChoiceService.getUserChoices(userId)
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => SwiperActionOutput)
    async userSwipeAction(
        @Args('matchId') matchId: string,
        @Args('choice') choice: string
    ){
        return await this.userChoiceService.userSwipeAction(matchId, choice)
    }
}
