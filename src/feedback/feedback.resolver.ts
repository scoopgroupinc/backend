import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { FeedBackFilter } from './dto/feedback.filter'
import { FeedBackInput } from './dto/feedback.input'
import { FeedBack } from './entities/feedback.entity'
import { FeedBackService } from './feedback.service'

@Resolver(() => FeedBack)
export class FeedBackResolver {
    constructor(private feedbackService: FeedBackService) {}

    @Mutation(() => String)
    async saveUserFeedBack(
        @Args('feedbackInput') feedbackInput: FeedBackInput
    ): Promise<string> {
        return await this.feedbackService.saveUserfeedback(feedbackInput)
    }

    @Query(() => [FeedBack])
    async getFeedBacks(
        @Args('feedbackfilter') feedbackfilter: FeedBackFilter
    ): Promise<FeedBack[]> {
        return await this.feedbackService.getFeedBacks(feedbackfilter)
    }
}
