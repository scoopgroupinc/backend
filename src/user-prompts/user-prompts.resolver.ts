import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql'
import { GqlAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { IGetPromptOrder } from './dto/user-prompts-order'
import {
    GetUserPromptsOutput,
    UserPromptsOutput,
} from './dto/user-prompts.output'
import { UserPrompts } from './entities/user-prompts.entity'
import { UserPromptsService } from './user-prompts.service'
import { IUserPromptsOrder } from 'src/user-profile/dto/user-prompts-order.input'
import { IUserPrompt } from './dto/user-prompts.input'

@Resolver(() => UserPrompts)
export class UserPromptsResolver {
    constructor(private userPromptsService: UserPromptsService) {}

    @UseGuards(GqlAuthGuard)
    @Mutation(() => UserPromptsOutput, {
        description:
            "method handles saving a user prompt. It checks if there is an existing prompt with the same answer and saves the new prompt if it's different.",
    })
    async handleSaveUserPrompt(
        @Args('UserPromptInput') userPromptInput: IUserPrompt
    ): Promise<UserPromptsOutput> {
        return await this.userPromptsService.handleSaveUserPrompt(
            userPromptInput
        )
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => [UserPromptsOutput], {
        name: 'saveUserPrompts',
        description:
            'method saves new or changed user prompts. It also saves the order of the prompts and returns the saved prompts and their IDs.',
    })
    async saveUserPrompts(
        @Args('UserPromptInput', { type: () => [IUserPrompt] })
        userPromptInput: IUserPrompt[]
    ): Promise<UserPromptsOutput[]> {
        return await this.userPromptsService.saveUserPrompts(userPromptInput)
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [UserPromptsOutput])
    async getAllUserPromptsData(
        @Args('userId') userId: string
    ): Promise<GetUserPromptsOutput> {
        return await this.userPromptsService.getAllUserPromptsData(userId)
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [UserPromptsOutput])
    async getUserAnsweredPrompts(
        @Args('userId') userId: string
    ): Promise<GetUserPromptsOutput> {
        return await this.userPromptsService.getUserAnsweredPrompts(userId)
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => String, {
        description:
            'method saves the order of user prompts. It checks if the user has answered each prompt before saving the order. Usecase for saving prompt order changes, where prompt answers have not changed.',
    })
    async saveUserPromptsOrder(
        @Args('userPromptsOrder') userPromptsOrder: IUserPromptsOrder
    ): Promise<string> {
        return await this.userPromptsService.saveUserPromptsOrder(
            userPromptsOrder
        )
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => String, {
        description: 'method retrieves displayed prompts for a given user.',
    })
    async getUserPromptsDisplayed(
        @Args('userId') userId: string
    ): Promise<GetUserPromptsOutput> {
        return await this.userPromptsService.getUserPromptsDisplayed(userId)
    }
}
