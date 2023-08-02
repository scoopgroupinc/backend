import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import { PersonalityFeedbackService } from './personality-feedback.service'
import { PersonalityFeedbackInput } from './personality-feedback.input'
import { PersonalityFeedback } from './personality-feedback.entity'

@Resolver(() => PersonalityFeedback)
export class PersonalityFeedbackResolver {
    constructor(
        private readonly personalityFeedbackService: PersonalityFeedbackService
    ) {}

    @Mutation(() => PersonalityFeedback)
    async createPersonalityFeedback(
        @Args('personalityFeedbackInput')
        personalityFeedbackInput: PersonalityFeedbackInput
    ): Promise<PersonalityFeedback> {
        return this.personalityFeedbackService.createPersonalityFeedback(
            personalityFeedbackInput
        )
    }

    @Query(() => [PersonalityFeedback])
    async getAllPersonalityFeedbacks(): Promise<PersonalityFeedback[]> {
        return this.personalityFeedbackService.getAllPersonalityFeedbacks()
    }
}
