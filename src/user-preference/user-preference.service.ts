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
        const { userId } = userPreferenceInput
        if (await this.findOne(userId))
            return await this.UpdateOne(userPreferenceInput)

        return await this.createOne(userPreferenceInput)
    }

    async findOne(userId: string): Promise<UserPreference> {
        return await this.userPreferenceRepository.findOne({ userId })
    }

    async UpdateOne(userPreferenceInput: UserPreferenceInput): Promise<any> {
        const { userId } = userPreferenceInput
        const preference = await this.findOne(userId)
        if (!preference) throw new BadRequestException('User not found')
        return await this.userPreferenceRepository.save({
            ...preference,
            ...userPreferenceInput,
        })
    }

    async findManyByGender(gender: string[]): Promise<UserPreference[]> {
        return await this.userPreferenceRepository
            .createQueryBuilder('user_preference')
            .andWhere('user_preference.gender IN(:...gender)')
            .getMany()
    }

    async createOne(userPreferenceInput: UserPreferenceInput): Promise<any> {
        return await this.userPreferenceRepository.save(userPreferenceInput)
    }
}
