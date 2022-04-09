import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql'
import { GqlAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { UserPromptsInput } from './dto/user-prompts.input'
import { UserPromptsService } from './user-prompts.service'

@Resolver()
export class UserPromptsResolver {
    constructor(private userPromptsService: UserPromptsService) {}

    @UseGuards(GqlAuthGuard)
    @Mutation(() => UserPromptsInput)
    async saveUserPrompt(
        @Args('UserPromptInput') userPromptInput: UserPromptsInput
    ): Promise<UserPromptsInput> {
        return await this.userPromptsService.saveUserPrompt(userPromptInput)
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [UserPromptsInput])
    async getUserPrompts(
        @Args('userId') userId: string
    ): Promise<UserPromptsInput[]> {
        return await this.userPromptsService.getUserPrompts(userId)
    }
}
