import { UseGuards } from '@nestjs/common'
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql'
import { GqlAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { MatchesOutput } from './dto/matches.output'
import { Matches } from './entities/matches.entity'
import { MatchesService } from './matches.service'

@Resolver(() => MatchesOutput)
export class MatchesResolver {
    constructor(private matchesService: MatchesService) {}

    @UseGuards(GqlAuthGuard)
    @Query(() => [MatchesOutput])
    async getUserMatches(
        @Args('userId') userId: string
    ): Promise<MatchesOutput[]> {
        return await this.matchesService.getUserMatches(userId)
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => String)
    async deActivateMatch(@Args('id') id: string): Promise<string> {
        return await this.matchesService.deleteMatch(id);
    }
}
