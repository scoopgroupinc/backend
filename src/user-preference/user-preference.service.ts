import { Injectable, BadRequestException } from '@nestjs/common'
import { In, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { UserPreference } from './entities/user-preference.entity'
import { UserPreferenceInput } from './dto/user-preference.input'

@Injectable()
export class UserPreferenceService {
    constructor(
        @InjectRepository(UserPreference)
        private userPreferenceRepository: Repository<UserPreference>
    ) {}

    async saveUserPreference(userPreferenceInput: UserPreferenceInput) {
        try {
            const { userId } = userPreferenceInput
            if (await this.findOne(userId)) {
                return await this.updateOne(userPreferenceInput)
            }

            return await this.createOne(userPreferenceInput)
        } catch (error) {
            // Handle the error and throw a custom exception
            throw new BadRequestException('Failed to save user preference')
        }
    }

    async findOne(userId: string): Promise<UserPreference> {
        try {
            return await this.userPreferenceRepository.findOne({ userId })
        } catch (error) {
            // Handle the error and throw a custom exception
            throw new BadRequestException('Failed to find user preference')
        }
    }

    async updateOne(userPreferenceInput: UserPreferenceInput): Promise<any> {
        try {
            const { userId } = userPreferenceInput
            const preference = await this.findOne(userId)
            if (!preference) {
                throw new BadRequestException('User not found')
            }
            return await this.userPreferenceRepository.save({
                ...preference,
                ...userPreferenceInput,
            })
        } catch (error) {
            // Handle the error and throw a custom exception
            throw new BadRequestException('Failed to update user preference')
        }
    }

    async findManyByGender(gender: string[]): Promise<UserPreference[]> {
        try {
            return await this.userPreferenceRepository
                .createQueryBuilder('user_preference')
                .where('user_preference.gender IN(:...gender)', { gender })
                .getMany()
        } catch (error) {
            // Handle the error and throw a custom exception
            throw new BadRequestException(
                'Failed to find user preferences by gender'
            )
        }
    }

    async createOne(userPreferenceInput: UserPreferenceInput): Promise<any> {
        try {
            return await this.userPreferenceRepository.save(userPreferenceInput)
        } catch (error) {
            // Handle the error and throw a custom exception
            throw new BadRequestException('Failed to create user preference')
        }
    }
}
