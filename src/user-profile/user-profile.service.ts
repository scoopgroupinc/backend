/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import {
    Injectable,
    BadRequestException,
    NotFoundException,
    HttpException,
    HttpStatus,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserProfile } from './user-profile.entity'
import { Repository } from 'typeorm'
import { UserProfileInput } from './dto/user-profile.input'
import logger from 'src/utils/logger'
import { UserPromptsOrderInput } from './dto/user-prompts-order.input'
import { User } from 'src/user/entities/user.entity'
import { UserVisuals } from './user-visuals/user-visuals.entity'
import { UserPrompts } from 'src/user-prompts/entities/user-prompts.entity'
import { LocationEntity } from 'src/location/entities/location.entity'

@Injectable()
export class UserProfileService {
    constructor(
        @InjectRepository(UserProfile)
        private userProfileRepository: Repository<UserProfile>,
        @InjectRepository(LocationEntity)
        private userLocationRepository: Repository<LocationEntity>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private httpService: HttpService
    ) {}

    async saveUserProfile(userProfileInput: UserProfileInput) {
        console.log('saveUserProfile', userProfileInput)
        try {
            const { userId } = userProfileInput

            const existingUser = await this.userRepository.findOne({
                userId,
            })

            if (!existingUser)
                throw new NotFoundException(
                    'User does not exist, can not create a profile for user'
                )

            const user = await this.userProfileRepository.findOne({
                userId,
            })
            if (user) {
                return await this.updateOne(userProfileInput)
            }

            return await this.createProfile({
                ...userProfileInput,
            })
        } catch (error) {
            logger.debug(error)
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async findOne(userId: string): Promise<UserProfile> {
        const profile = await this.userProfileRepository.findOne({ userId })
        if (!profile) throw new NotFoundException('Profile not found')
        return profile
    }

    async getFullProfile(userId: string): Promise<UserProfile> {
        const userProfile = await this.getUserProfileWithRelations(userId)
        const userLocation = await this.getUserLocation(userId)
        if (userProfile) {
            userProfile.prompts = this.filterPrompts(userProfile)

            if (userLocation) {
                userProfile.location = userLocation
            }

            /* comment this when working on a localhost */
            const visualsResponse = await this.getVisuals(userId)
            userProfile.visuals = visualsResponse.map((visual) =>
                this.mapToUserVisuals(visual)
            )

            return userProfile
        } else {
            throw new NotFoundException('Profile not found')
        }
    }

    private async getUserProfileWithRelations(
        userId: string
    ): Promise<UserProfile | undefined> {
        return this.userProfileRepository.findOne({
            where: { userId },
            relations: ['prompts', 'tags'],
        })
    }

    private async getUserLocation(userId: string): Promise<any> {
        return await this.userLocationRepository.findOne({ userId })
    }

    private filterPrompts(userProfile: UserProfile): UserPrompts[] {
        if (userProfile.promptIds?.length > 0) {
            return userProfile.prompts.filter((prompt) =>
                userProfile.promptIds.includes(prompt.promptId)
            )
        }
        return []
    }

    private async getVisuals(userId: string): Promise<UserVisuals[]> {
        try {
            const { data } = await firstValueFrom(
                this.httpService.get<UserVisuals[]>(`${userId}`)
            )
            return data ?? []
        } catch (error) {
            // Handle error or rethrow if necessary
            throw error
        }
    }

    private mapToUserVisuals(visualApiResponse: UserVisuals): UserVisuals {
        const {
            id,
            createdAt,
            userId,
            videoOrPhoto,
            blobName,
            visualPromptId,
            deletedAt,
            description,
            isVisible,
        } = visualApiResponse

        const visual = new UserVisuals()
        visual.id = id
        visual.createdAt = createdAt
        visual.userId = userId
        visual.videoOrPhoto = videoOrPhoto
        visual.blobName = blobName
        visual.visualPromptId = visualPromptId
        visual.deletedAt = deletedAt
        visual.description = description
        visual.isVisible = isVisible

        return visual
    }

    async updateOne(userProfileInput: UserProfileInput): Promise<any> {
        try {
            const { userId } = userProfileInput
            const profile = await this.userProfileRepository.findOne({
                userId,
            })
            if (!profile)
                return new BadRequestException('User profile does not exist')
            return await this.userProfileRepository.save({
                ...profile,
                ...userProfileInput,
            })
        } catch (error) {
            logger.debug(error)
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async createProfile(userProfileInput: UserProfileInput): Promise<any> {
        const user = await this.userRepository.findOne({
            userId: userProfileInput.userId,
        })
        return await this.userProfileRepository.save({
            ...userProfileInput,
            displayName: userProfileInput.displayName || user.firstName,
        })
    }

    async updateProfilePhoto(userId: string, key: string): Promise<any> {
        try {
            const profile = await this.findOne(userId)
            if (!profile)
                return new BadRequestException('User profile does not exist')
            return await this.userProfileRepository.save({
                ...profile,
                profilePhoto: key,
            })
        } catch (error) {
            logger.debug(error)
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getUserPromptIds(userId: string): Promise<any> {
        try {
            const userProfile = await this.userProfileRepository.findOne({
                userId,
            })
            if (userProfile) {
                return { promptIds: userProfile.promptIds }
            }
            return []
        } catch (error) {
            logger.debug(error)
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async saveUserPromptsOrder(
        userPromptsOrderInput: UserPromptsOrderInput
    ): Promise<any> {
        try {
            const { userId, promptIds } = userPromptsOrderInput
            const profile = await this.findOne(userId)
            if (!profile)
                return new BadRequestException('User profile does not exist')
            return await this.userProfileRepository.save({
                ...profile,
                promptIds,
            })
        } catch (error) {
            logger.debug(error)
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }
}
