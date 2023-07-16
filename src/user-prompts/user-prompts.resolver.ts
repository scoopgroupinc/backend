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
    @Mutation(() => UserPromptsOutput)
    async saveUserPrompt(
        @Args('UserPromptInput') userPromptInput: UserPromptsInput
    ): Promise<UserPromptsOutput> {
        return await this.userPromptsService.saveUserPrompt(userPromptInput)
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => [UserPromptsOutput], { name: 'saveUserPrompts' })
    async saveUserPrompts(
        @Args('UserPromptInput', { type: () => [UserPromptsInput] })
        userPromptInput: UserPromptsInput[]
    ): Promise<UserPromptsOutput[]> {
        return await this.userPromptsService.saveUserPrompts(userPromptInput)
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [UserPromptsOutput])
    async getUserPromptsOrder(
        @Args('userPromptsOrder') userPromptsOrder: IGetPromptOrder
    ): Promise<GetUserPromptsOutput> {
        return await this.userPromptsService.getUserPromptsOrder(
            userPromptsOrder
        )
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => String)
    async saveUserPromptsOrder(
        @Args('userPromptsOrder') userPromptsOrder: UserPromptsOrderInput
    ): Promise<string> {
        return await this.userPromptsService.saveUserPromptsOrder(
            userPromptsOrder
        )
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => String)
    async getUserPrompts(
        @Args('userId') userId: string
    ): Promise<GetUserPromptsOutput> {
        return await this.userPromptsService.getUserPrompts(userId)
    }
}
