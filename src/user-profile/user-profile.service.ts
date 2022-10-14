/* eslint-disable prettier/prettier */
import {
    Injectable,
    BadRequestException,
    Logger,
    HttpException,
    HttpStatus,
    NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserProfile } from './entities/user-profile.entity'
import { Repository } from 'typeorm'
import { UserProfileInput } from './dto/user-profile.input'
import logger from 'src/utils/logger'

@Injectable()
export class UserProfileService {
    constructor(
        @InjectRepository(UserProfile)
        private userProfileRespository: Repository<UserProfile>
    ) {}

    async saveUserProfile(userProfileInput: UserProfileInput) {
        try {
            const { userId } = userProfileInput

            const user = await this.userProfileRespository.findOne({ userId })
            if (user) {
                return await this.updateOne(userProfileInput)
            }

            return await this.createProfile(userProfileInput)
        } catch (error) {
            logger.debug(error)
            return error
        }
    }

    async findOne(userId: string): Promise<UserProfile> {
        const profile = await this.userProfileRespository.findOne({ userId })
        if(!profile) throw new NotFoundException("Profile not found")
        return profile
    }

    async updateOne(userProfileInput: UserProfileInput): Promise<any> {
        const { userId } = userProfileInput
        const profile = await await this.userProfileRespository.findOne({ userId })
        if (!profile)
            return new BadRequestException('User profile does not exist')
        return await this.userProfileRespository.save({
            ...profile,
            ...userProfileInput,
        })
    }

    async createProfile(userProfileInput: UserProfileInput): Promise<any> {
        return await this.userProfileRespository.save(userProfileInput)
    }

    async updateProfilePhoto(userId: string, key: string): Promise<any> {
        const profile = await this.findOne(userId)
        if (!profile)
            return new BadRequestException('User profile does not exist')
        return await this.userProfileRespository.save({
            ...profile,
            profilePhoto: key,
        })
    }
}
