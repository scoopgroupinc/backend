import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PersonalityFeedback } from './personality-feedback.entity'
import { PersonalityFeedbackInput } from './personality-feedback.input'

@Injectable()
export class PersonalityFeedbackService {
    constructor(
        @InjectRepository(PersonalityFeedback)
        private readonly personalityFeedbackRepository: Repository<PersonalityFeedback>
    ) {}

    async createPersonalityFeedback(
        personalityFeedbackInput: PersonalityFeedbackInput
    ): Promise<PersonalityFeedback> {
        const personalityFeedback = this.personalityFeedbackRepository.create(
            personalityFeedbackInput
        )
        return this.personalityFeedbackRepository.save(personalityFeedback)
    }

    async getAllPersonalityFeedbacks(): Promise<PersonalityFeedback[]> {
        return this.personalityFeedbackRepository.find()
    }
}
