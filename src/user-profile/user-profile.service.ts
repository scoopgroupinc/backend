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
import { IUserPromptsOrder } from './dto/user-prompts-order.input'

@Injectable()
export class UserProfileService {
    constructor(
        @InjectRepository(UserProfile)
        private userProfileRespository: Repository<UserProfile>
    ) {}

    async saveUserProfile(userProfileInput: UserProfileInput) {
        console.log('saveUserProfile', userProfileInput)
        try {
            const { userId } = userProfileInput

            const user = await this.userProfileRespository.findOne({ userId })
            if (user) {
                return await this.updateOne(userProfileInput)
            }

            return await this.createProfile(userProfileInput)
        } catch (error) {
            logger.debug(error)
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async findOne(userId: string): Promise<UserProfile> {
        const profile = await this.userProfileRespository.findOne({ userId })
        if (!profile) throw new NotFoundException('Profile not found')
        return profile
    }

    async updateOne(userProfileInput: UserProfileInput): Promise<any> {
        try {
            const { userId } = userProfileInput
            const profile = await this.userProfileRespository.findOne({
                userId,
            })
            if (!profile)
                return new BadRequestException('User profile does not exist')
            return await this.userProfileRespository.save({
                ...profile,
                ...userProfileInput,
            })
        } catch (error) {
            logger.debug(error)
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async createProfile(userProfileInput: UserProfileInput): Promise<any> {
        return await this.userProfileRespository.save(userProfileInput)
    }

    async updateProfilePhoto(userId: string, key: string): Promise<any> {
        try {
            const profile = await this.findOne(userId)
            if (!profile)
                return new BadRequestException('User profile does not exist')
            return await this.userProfileRespository.save({
                ...profile,
                profilePhoto: key,
            })
        } catch (error) {
            logger.debug(error)
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getUserPromptsOrder(userId: string): Promise<any> {
        try {
            const user = await this.userProfileRespository.findOne({ userId })
            if (user) {
                return (await user.promptIds) || []
            }
        } catch (error) {
            logger.debug(error)
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async saveUserPromptsOrder(
        userPromptsOrderInput: IUserPromptsOrder
    ): Promise<any> {
        try {
            const { userId, promptIds } = userPromptsOrderInput
            const profile = await this.findOne(userId)
            if (!profile)
                return new BadRequestException('User profile does not exist')
            return await this.userProfileRespository.save({
                ...profile,
                promptIds,
            })
        } catch (error) {
            logger.debug(error)
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }
}
