import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { UserVisuals } from './user-visuals.entity'
import { UserVisualsService } from './user-visuals.service'

@Resolver(() => UserVisuals)
export class UserVisualsResolver {
    constructor(private userVisualsService: UserVisualsService) {}

    @Query(() => [UserVisuals])
    async getUserVisualsByUserId(
        @Args('userId') userId: string
    ): Promise<UserVisuals[]> {
        return this.userVisualsService.getVisualsByUserId(userId)
    }
}
