import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql'
import { GqlAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { IGetPromptOrder } from './dto/user-prompts-order'
import { UserPromptsInput } from './dto/user-prompts.input'
import {
    GetUserPromptsOutput,
    UserPromptsOutput,
} from './dto/user-prompts.output'
import { UserPrompts } from './entities/user-prompts.entity'
import { UserPromptsService } from './user-prompts.service'
import { UserPromptsOrderInput } from 'src/user-profile/dto/user-prompts-order.input'

@Resolver(() => UserPrompts)
export class UserPromptsResolver {
    constructor(private userPromptsService: UserPromptsService) {}

    @UseGuards(GqlAuthGuard)
    @Mutation(() => UserPromptsOutput, {
        description:
            "method handles saving a user prompt. It checks if there is an existing prompt with the same answer and saves the new prompt if it's different.",
    })
    async handleSaveUserPrompt(
        @Args('UserPromptInput') userPromptInput: UserPromptsInput
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
        @Args('UserPromptInput', { type: () => [UserPromptsInput] })
        userPromptInput: UserPromptsInput[]
    ): Promise<UserPromptsOutput[]> {
        return await this.userPromptsService.saveUserPrompts(userPromptInput)
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [UserPromptsOutput])
    async getUserAnsweredPrompts(
        @Args('userPromptsOrder') userPromptsOrder: IGetPromptOrder
    ): Promise<GetUserPromptsOutput> {
        return await this.userPromptsService.getUserPromptsOrder(
            userPromptsOrder
        )
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => String, {
        description:
            'method saves the order of user prompts. It checks if the user has answered each prompt before saving the order.',
    })
    async saveUserPromptsOrder(
        @Args('userPromptsOrder') userPromptsOrder: UserPromptsOrderInput
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
