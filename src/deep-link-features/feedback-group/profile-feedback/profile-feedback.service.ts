import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProfileFeedback } from './profile-feedback.entity'
import { ProfileFeedbackInput } from './profile-feedback.input'

@Injectable()
export class ProfileFeedbackService {
    constructor(
        @InjectRepository(ProfileFeedback)
        private readonly profileFeedbackRepository: Repository<ProfileFeedback>
    ) {}

    async createProfileFeedback(
        profileFeedbackInput: ProfileFeedbackInput
    ): Promise<ProfileFeedback> {
        const profileFeedback =
            this.profileFeedbackRepository.create(profileFeedbackInput)
        return this.profileFeedbackRepository.save(profileFeedback)
    }

    async getProfileFeedbackById(id: string): Promise<ProfileFeedback> {
        return this.profileFeedbackRepository.findOne(id)
    }

    async getAllProfileFeedbacks(): Promise<ProfileFeedback[]> {
        return this.profileFeedbackRepository.find()
    }
}
