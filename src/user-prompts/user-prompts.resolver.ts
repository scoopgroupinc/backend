import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql'
import { GqlAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import {
    GetUserPromptsOutput,
    UserPromptOutput,
} from './dto/user-prompts.output'
import { UserPrompts } from './entities/user-prompts.entity'
import { UserPromptsService } from './user-prompts.service'
import { IUserPromptsOrder } from 'src/user-profile/dto/user-prompts-order.input'
import { IUserPrompt } from './dto/user-prompts.input'

@Resolver(() => UserPrompts)
export class UserPromptsResolver {
    constructor(private userPromptsService: UserPromptsService) {}

    @UseGuards(GqlAuthGuard)
    @Mutation(() => UserPromptOutput, {
        description:
            "method handles saving a user prompt. It checks if there is an existing prompt with the same answer and saves the new prompt if it's different.",
    })
    async handleSaveUserPrompt(
        @Args('UserPromptInput') userPromptInput: IUserPrompt
    ): Promise<UserPromptOutput> {
        return await this.userPromptsService.handleSaveUserPrompt(
            userPromptInput
        )
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => GetUserPromptsOutput, {
        name: 'saveUserPrompts',
        description:
            'method saves new or changed user prompts. It also saves the order of the prompts and returns the saved prompts and their IDs.',
    })
    async saveUserPrompts(
        @Args('UserPromptInput', { type: () => [IUserPrompt] })
        userPromptInput: IUserPrompt[]
    ): Promise<GetUserPromptsOutput> {
        return await this.userPromptsService.saveUserPrompts(userPromptInput)
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => GetUserPromptsOutput)
    async getAllUserPromptsData(
        @Args('userId') userId: string
    ): Promise<GetUserPromptsOutput> {
        return await this.userPromptsService.getAllUserPromptsData(userId)
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => GetUserPromptsOutput)
    async getUserAnsweredPrompts(
        @Args('userId') userId: string
    ): Promise<GetUserPromptsOutput> {
        return await this.userPromptsService.getUserAnsweredPrompts(userId)
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => GetUserPromptsOutput, {
        description:
            'method saves the order of user prompts. It checks if the user has answered each prompt before saving the order. Usecase for saving prompt order changes, where prompt answers have not changed.',
    })
    async saveUserPromptsOrder(
        @Args('userPromptsOrder') userPromptsOrder: IUserPromptsOrder
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
