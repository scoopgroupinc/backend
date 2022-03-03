import { Args, Mutation, Resolver, Query } from '@nestjs/graphql'
import { UserPromptsInput } from './dto/user-prompts.input'
import { UserPromptsService } from './user-prompts.service'

@Resolver()
export class UserPromptsResolver {
    constructor(private userPromptsService: UserPromptsService) {}

    @Mutation(() => UserPromptsInput)
    async saveUserPrompt(
        @Args('UserPromptInput') userPromptInput: UserPromptsInput
    ): Promise<UserPromptsInput> {
        return await this.userPromptsService.saveUserPrompt(userPromptInput)
    }

    @Query(() => [UserPromptsInput])
    async getUserPrompts(
        @Args('userId') userId: string
    ): Promise<UserPromptsInput[]> {
        return await this.userPromptsService.getUserPrompts(userId)
    }
}
