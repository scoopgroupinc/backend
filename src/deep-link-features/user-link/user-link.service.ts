import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserLink } from './user-link.entity'
import { TEMPLATE_ID, USER_LINK_STATE } from './user-link.constants'
import { UserProfile } from 'src/user-profile/entities/user-profile.entity'
import { UserProfileService } from 'src/user-profile/user-profile.service'

@Injectable()
export class UserLinkService {
    constructor(
        @InjectRepository(UserLink)
        private readonly userLinkRepository: Repository<UserLink>,
        private readonly userProfileService: UserProfileService
    ) {}

    async findAll(): Promise<UserLink[]> {
        return this.userLinkRepository.find()
    }

    async findAllByUserId(userId: string): Promise<UserLink[]> {
        return this.userLinkRepository.find({
            where: { userId },
        })
    }

    async findOne(id: string): Promise<UserLink> {
        return this.userLinkRepository.findOne(id)
    }

    async getUserProfileByShareLinkId(id: string): Promise<UserProfile> {
        const link = await this.userLinkRepository.findOne(id)
        if (!link) {
            throw new Error('UserLink not found.')
        }
        if (link.templateId !== TEMPLATE_ID.SHARE_PROFILE) {
            throw new Error('UserLink is not a share profile link.')
        }
        if (link.state === USER_LINK_STATE.INACTIVE) {
            throw new Error('UserLink is inactive.')
        }
        console.log('link', link)
        return await this.userProfileService.getFullProfile(link.userId)
    }

    async getUserShareProfileLink(userId: string): Promise<UserLink> {
        const link = await this.userLinkRepository.find({
            where: { userId, templateId: TEMPLATE_ID.SHARE_PROFILE },
        })
        if (link.length > 0) {
            return link[0]
        }
        const newLink = this.userLinkRepository.create({
            userId,
            templateId: TEMPLATE_ID.SHARE_PROFILE,
        })

        return this.userLinkRepository.save(newLink)
    }

    async update(id: string, data: Partial<UserLink>): Promise<UserLink> {
        const link = await this.userLinkRepository.findOne(id)
        if (!link) {
            // Handle the case where the link with the provided id is not found
            throw new Error('UserLink not found.')
        }

        //ensure that the link with id, is the one being updated
        const { id: dataId, ...updatedData } = data
        Object.assign(link, updatedData)

        await this.userLinkRepository.save(link)

        return link
    }

    async delete(id: string): Promise<UserLink> {
        const userLink = await this.userLinkRepository.findOne(id)
        if (!userLink) {
            // Handle the case where the link with the provided id is not found
            throw new Error('User Link not found.')
        }
        await this.userLinkRepository.delete(id)
        return userLink
    }
}
