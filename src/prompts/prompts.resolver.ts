import { Mutation, Resolver, Args, Query } from '@nestjs/graphql'
import { PromptsInput } from './dto/prompts.input'
import { Prompts } from './entities/prompts.entity'
import { PromptsService } from './prompts.service'

@Resolver(() => Prompts)
export class PromptsResolver {
    constructor(private promptService: PromptsService) {}

    @Query(() => [Prompts], {
        description: `To fetch all prompts, pass all or empty string('') as first parameter and empty
    string ('') as second parameter, id. To fetch prompts of a type (prompts and visual_prompts only), specify the prompt type as first parameter and empty
    string ('') as second parameter, id. Specify or pass id as second paramter whiles the second parameter remains an empty
    string ('') to fetch a specific prompt.`,
    })
    async getPrompts(
        @Args('promptType') promptType: string,
        @Args('id') id: string
    ): Promise<Prompts[]> {
        return await this.promptService.getPrompts(promptType, id)
    }

    @Mutation(() => Prompts)
    async addNewPrompt(
        @Args('promptInput') promptInput: PromptsInput
    ): Promise<any> {
        return await this.promptService.addNewPrompt(promptInput)
    }

    @Query(() => String, {
        description: `Always specify the prompt type (prompts and visual_prompts) to upload. Pass the prompt type as parameter.`,
    })
    async uploadPrompts(@Args('promptType') promptType: string) {
        return await this.promptService.uploadPrompts(promptType)
    }
}
