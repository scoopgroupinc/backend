/* eslint-disable prettier/prettier */
import {
    Injectable,
    BadRequestException,
    NotFoundException,
    HttpException,
    HttpStatus,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserProfile } from './entities/user-profile.entity'
import { Repository } from 'typeorm'
import { UserProfileInput } from './dto/user-profile.input'
import logger from 'src/utils/logger'
import { UserPromptsOrderInput } from './dto/user-prompts-order.input'
import { UserPrompts } from 'src/user-prompts/entities/user-prompts.entity'
import { User } from 'src/user/entities/user.entity'

@Injectable()
export class UserProfileService {
    constructor(
        @InjectRepository(UserProfile)
        private userProfileRepository: Repository<UserProfile>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async saveUserProfile(userProfileInput: UserProfileInput) {
        console.log('saveUserProfile', userProfileInput)
        try {
            const { userId } = userProfileInput

            const existingUser = await this.userRepository.findOne({
                where: { id: userId },
            })

            if (!existingUser)
                throw new NotFoundException(
                    'User does not exist, can not create a profile for user'
                )

            const user = await this.userProfileRepository.findOne({ userId })
            if (user) {
                return await this.updateOne(userProfileInput)
            }

            return await this.createProfile({
                ...userProfileInput,
                displayName: existingUser.firstName,
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
        const userProfile = await this.userProfileRepository.findOne({
            where: { userId },
            relations: ['prompts', 'tags', 'tags.userTags'],
        })

        // Filter the prompts based on the promptIds array in the UserProfile
        if (
            userProfile &&
            userProfile.prompts &&
            userProfile.promptIds.length > 0
        ) {
            userProfile.prompts = userProfile.prompts.filter((prompt) =>
                userProfile.promptIds.includes(prompt.id)
            )
        }

        return userProfile
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
        return await this.userProfileRepository.save(userProfileInput)
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
