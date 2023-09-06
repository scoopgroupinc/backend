import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql'
import { GqlAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import {
    GetUserPromptsOrder,
    GetUserPromptsOutput,
    UserPromptOutput,
} from './dto/user-prompts.output'
import { UserPrompts } from './entities/user-prompts.entity'
import { UserPromptsService } from './user-prompts.service'
import { UserPromptsOrderInput } from 'src/user-profile/dto/user-prompts-order.input'
import { UserPromptInput } from './dto/user-prompts.input'

@Resolver(() => UserPrompts)
export class UserPromptsResolver {
    constructor(private userPromptsService: UserPromptsService) {}

    @UseGuards(GqlAuthGuard)
    @Mutation(() => UserPromptOutput, {
        description:
            "method handles saving a user prompt. It checks if there is an existing prompt with the same answer and saves the new prompt if it's different.",
    })
    async handleSaveUserPrompt(
        @Args('userPromptInput') userPromptInput: UserPromptInput
    ): Promise<UserPromptOutput> {
        return await this.userPromptsService.handleSaveUserPrompt(
            userPromptInput
        )
    }

    @Mutation(() => GetUserPromptsOutput, {
        description: 'method saves new or changed user prompts...',
    })
    async saveUserPrompts(
        @Args('userPromptsInput', { type: () => [UserPromptInput] })
        userPromptsInput: UserPromptInput[]
    ): Promise<any> {
        return await this.userPromptsService.saveUserPrompts(userPromptsInput)
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => GetUserPromptsOrder)
    async getUserPromptsOrder(@Args('userId') userId: string): Promise<any> {
        return await this.userPromptsService.getUserPromptsOrder(userId)
    }

    @Query(() => UserPrompts)
    async findLatestPrompt(
        @Args('userId', { type: () => String }) userId: string,
        @Args('promptId', { type: () => String }) promptId: string
    ): Promise<UserPrompts> {
        return await this.userPromptsService.findLatestPrompt({
            userId,
            promptId,
        })
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => GetUserPromptsOutput)
    async getUserAnsweredPrompts(
        @Args('userId') userId: string
    ): Promise<GetUserPromptsOutput> {
        return await this.userPromptsService.getUserAnsweredPrompts(userId)
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [UserPrompts])
    async getUserAnsweredPromptsArray(
        @Args('userId') userId: string
    ): Promise<any> {
        return await this.userPromptsService.getUserAnsweredPromptsArray(userId)
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => GetUserPromptsOutput, {
        description:
            'method saves the order of user prompts. It checks if the user has answered each prompt before saving the order. Usecase for saving prompt order changes, where prompt answers have not changed.',
    })
    async saveUserPromptsOrder(
        @Args('userPromptsOrder') userPromptsOrder: UserPromptsOrderInput
    ): Promise<GetUserPromptsOutput> {
        return await this.userPromptsService.saveUserPromptsOrder(
            userPromptsOrder
        )
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => GetUserPromptsOutput, {
        description: 'method retrieves displayed prompts for a given user.',
    })
    async getUserPromptsDisplayed(
        @Args('userId') userId: string
    ): Promise<GetUserPromptsOutput> {
        return await this.userPromptsService.getUserPromptsDisplayed(userId)
    }
}
