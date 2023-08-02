import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import { ProfileFeedbackService } from './profile-feedback.service'
import { ProfileFeedbackInput } from './profile-feedback.input'
import { ProfileFeedback } from './profile-feedback.entity'

@Resolver(() => ProfileFeedback)
export class ProfileFeedbackResolver {
    constructor(
        private readonly profileFeedbackService: ProfileFeedbackService
    ) {}

    @Mutation(() => ProfileFeedback)
    async createProfileFeedback(
        @Args('profileFeedbackInput') profileFeedbackInput: ProfileFeedbackInput
    ): Promise<ProfileFeedback> {
        return this.profileFeedbackService.createProfileFeedback(
            profileFeedbackInput
        )
    }

    @Query(() => ProfileFeedback)
    async getProfileFeedbackById(
        @Args('id', { type: () => String }) id: string
    ): Promise<ProfileFeedback> {
        return this.profileFeedbackService.getProfileFeedbackById(id)
    }

    @Query(() => [ProfileFeedback])
    async getAllProfileFeedbacks(): Promise<ProfileFeedback[]> {
        return this.profileFeedbackService.getAllProfileFeedbacks()
    }
}
