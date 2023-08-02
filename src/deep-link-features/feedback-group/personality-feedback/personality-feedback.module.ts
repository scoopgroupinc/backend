import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PersonalityFeedback } from './personality-feedback.entity'
import { PersonalityFeedbackService } from './personality-feedback.service'
import { PersonalityFeedbackResolver } from './personality-feedback.resolver'

@Module({
    imports: [TypeOrmModule.forFeature([PersonalityFeedback])], // Use forFeature instead of forRoot
    providers: [PersonalityFeedbackService, PersonalityFeedbackResolver],
    exports: [PersonalityFeedbackService],
})
export class PersonalityFeedbackModule {}
