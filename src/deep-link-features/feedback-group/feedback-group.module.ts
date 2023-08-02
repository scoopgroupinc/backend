import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FeedbackGroup } from './feedback-group.entity'
import { FeedbackGroupService } from './feedback-group.service'
import { FeedbackGroupResolver } from './feedback-group.resolver'
import { PersonalityFeedback } from './personality-feedback/personality-feedback.entity'
import { ProfileFeedback } from './profile-feedback/profile-feedback.entity'

@Module({
    imports: [
        TypeOrmModule.forFeature([
            FeedbackGroup,
            PersonalityFeedback,
            ProfileFeedback,
        ]),
    ],
    providers: [FeedbackGroupService, FeedbackGroupResolver],
    exports: [FeedbackGroupService],
})
export class FeedbackGroupModule {}
