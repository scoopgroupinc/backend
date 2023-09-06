import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { FeedbackGroup } from './feedback-group.entity'
import { FeedbackGroupService } from './feedback-group.service'
import { PersonalityFeedbackInput } from './personality-feedback/personality-feedback.input'
import { FeedbackGroupInput } from './feedback-group.input'
import { ProfileFeedbackInput } from './profile-feedback/profile-feedback.input'

@Resolver(() => FeedbackGroup)
export class FeedbackGroupResolver {
    constructor(private feedbackGroupService: FeedbackGroupService) {}

    @Query(() => [FeedbackGroup])
    async getShareProfileFeedback(
        @Args('userId') userId: string
    ): Promise<FeedbackGroup[]> {
        return this.feedbackGroupService.getShareProfileFeedback(userId)
    }

    @Mutation(() => FeedbackGroup)
    async createShareProfileFeedback(
        @Args('feedbackGroupInput') feedbackGroupInput: FeedbackGroupInput,
        @Args('personalityFeedbacksInput', {
            type: () => [PersonalityFeedbackInput],
        })
        personalityFeedbacksInput: PersonalityFeedbackInput[],
        @Args('profileFeedbackInput') profileFeedbackInput: ProfileFeedbackInput
    ): Promise<FeedbackGroup> {
        const feedbackGroup =
            await this.feedbackGroupService.createShareProfileFeedback(
                feedbackGroupInput,
                personalityFeedbacksInput,
                profileFeedbackInput
            )
        return feedbackGroup
    }

    @Mutation(() => FeedbackGroup)
    async updateShareProfileRaterId(
        @Args('id') id: string,
        @Args('raterId') raterId: string
    ): Promise<FeedbackGroup> {
        const feedbackGroup =
            await this.feedbackGroupService.updateShareProfileRaterId(
                id,
                raterId
            )
        return feedbackGroup
    }
}
