import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql'
import { GqlAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { UserPromptsInput } from './dto/user-prompts.input'
import { UserPromptsOutput } from './dto/user-prompts.output'
import { UserPrompts } from './entities/user-prompts.entity'
import { UserPromptsService } from './user-prompts.service'

@Resolver(() => UserPrompts)
export class UserPromptsResolver {
    constructor(private userPromptsService: UserPromptsService) {}

    @UseGuards(GqlAuthGuard)
    @Mutation(() => UserPromptsOutput)
    async saveUserPrompt(
        @Args('UserPromptInput') userPromptInput: UserPromptsInput
    ): Promise<UserPromptsOutput> {
        return await this.userPromptsService.saveUserPrompt(userPromptInput)
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [UserPromptsOutput])
    async getUserPrompts(
        @Args('userId') userId: string
    ): Promise<UserPromptsOutput[]> {
        return await this.userPromptsService.getUserPrompts(userId)
    }
}
