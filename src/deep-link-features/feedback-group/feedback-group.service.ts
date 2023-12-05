import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FeedbackGroup } from './feedback-group.entity'
import { PersonalityFeedback } from './personality-feedback/personality-feedback.entity'
import { ProfileFeedback } from './profile-feedback/profile-feedback.entity'
import { FeedbackGroupInput } from './feedback-group.input'
import { PersonalityFeedbackInput } from './personality-feedback/personality-feedback.input'
import { ProfileFeedbackInput } from './profile-feedback/profile-feedback.input'
import { TEMPLATE_ID } from '../user-link/user-link.constants'
import { UserLink } from '../user-link/user-link.entity'
import { AnalyticsService } from 'src/analytics/analytics.service'

@Injectable()
export class FeedbackGroupService {
    constructor(
        @InjectRepository(FeedbackGroup)
        private readonly feedbackGroupRepository: Repository<FeedbackGroup>,
        @InjectRepository(PersonalityFeedback)
        private readonly personalityFeedbackRepository: Repository<PersonalityFeedback>,
        @InjectRepository(ProfileFeedback)
        private readonly profileFeedbackRepository: Repository<ProfileFeedback>,
        @InjectRepository(UserLink)
        private readonly userLinkRepository: Repository<UserLink>,
        private readonly analyticsService: AnalyticsService
    ) {}

    async getShareProfileFeedback(userId: string): Promise<FeedbackGroup[]> {
        return this.feedbackGroupRepository.find({
            where: {
                userId,
                templateId: TEMPLATE_ID.SHARE_PROFILE,
            },
            relations: ['personalityFeedbacks', 'profileFeedback'],
        })
    }

    async createShareProfileFeedback(
        feedbackGroupInput: FeedbackGroupInput,
        personalityFeedbacksInput: PersonalityFeedbackInput[],
        profileFeedbackInput: ProfileFeedbackInput
    ): Promise<FeedbackGroup> {
        let userId = feedbackGroupInput.userId
        if (feedbackGroupInput.uuid) {
            const link = await this.userLinkRepository.findOne({
                where: {
                    id: feedbackGroupInput.uuid,
                    templateId: TEMPLATE_ID.SHARE_PROFILE,
                },
            })
            userId = link.userId
        }

        // Create FeedbackGroup entity
        const feedbackGroup = this.feedbackGroupRepository.create({
            userId,
            raterId: feedbackGroupInput.raterId,
            templateId: TEMPLATE_ID.SHARE_PROFILE,
        })
        const createdFeedbackGroup = await this.feedbackGroupRepository.save(
            feedbackGroup
        )

        // Create PersonalityFeedback entities and associate them with the FeedbackGroup entity
        const personalityFeedbacks = await Promise.all(
            personalityFeedbacksInput.map((personalityFeedbackInput) =>
                this._createPersonalityFeedback(
                    createdFeedbackGroup,
                    personalityFeedbackInput
                )
            )
        )

        // Create ProfileFeedback entity and associate it with the FeedbackGroup entity
        const profileFeedback = await this._createProfileFeedback(
            createdFeedbackGroup,
            profileFeedbackInput
        )

        // Update the FeedbackGroup entity with the associated PersonalityFeedback and ProfileFeedback entities
        createdFeedbackGroup.personalityFeedbacks = personalityFeedbacks
        createdFeedbackGroup.profileFeedback = profileFeedback

        console.log('analyticsService.track', {
            feedbackGroup,
            personalityFeedbacks,
            profileFeedback,
        })
        this.analyticsService.track('Shareprofile Feedback Received', userId, {
            feedbackGroup,
            personalityFeedbacks,
            profileFeedback,
        })

        return createdFeedbackGroup
    }

    async updateShareProfileRaterId(id: string, raterId: string) {
        const feedback = await this.feedbackGroupRepository.findOne(id)

        if (!feedback) {
            throw new NotFoundException(
                'Feedback not found, unable to update rater'
            )
        }

        if (raterId !== undefined) {
            feedback.raterId = raterId
        }

        return await this.feedbackGroupRepository.save(feedback)
    }

    private async _createPersonalityFeedback(
        feedbackGroup: FeedbackGroup,
        personalityFeedbackInput: PersonalityFeedbackInput
    ): Promise<PersonalityFeedback> {
        const personalityFeedback = this.personalityFeedbackRepository.create({
            ...personalityFeedbackInput,
            feedbackGroup,
        })
        return this.personalityFeedbackRepository.save(personalityFeedback)
    }

    private async _createProfileFeedback(
        feedbackGroup: FeedbackGroup,
        profileFeedbackInput: ProfileFeedbackInput
    ): Promise<ProfileFeedback> {
        const profileFeedback = this.profileFeedbackRepository.create({
            ...profileFeedbackInput,
            feedbackGroup,
        })
        return this.profileFeedbackRepository.save(profileFeedback)
    }

    async findAll(): Promise<FeedbackGroup[]> {
        return this.feedbackGroupRepository.find()
    }

    async findById(id: string): Promise<FeedbackGroup> {
        return this.feedbackGroupRepository.findOne(id)
    }

    async create(
        feedbackGroupData: Partial<FeedbackGroup>
    ): Promise<FeedbackGroup> {
        const newFeedbackGroup =
            this.feedbackGroupRepository.create(feedbackGroupData)
        return this.feedbackGroupRepository.save(newFeedbackGroup)
    }
}
