import { Module } from '@nestjs/common'
import { ProfileFeedback } from './profile-feedback.entity'
import { ProfileFeedbackService } from './profile-feedback.service'
import { ProfileFeedbackResolver } from './profile-feedback.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
    imports: [TypeOrmModule.forFeature([ProfileFeedback])],
    providers: [ProfileFeedbackService, ProfileFeedbackResolver],
    exports: [ProfileFeedbackService],
})
export class ProfileFeedbackModule {}
