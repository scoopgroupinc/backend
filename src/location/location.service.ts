import { Injectable } from '@nestjs/common'
import { CreateLocationInput } from './dto/location.input'
import { LocationEntity } from './entities/location.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import logger from '../utils/logger'

@Injectable()
export class LocationService {
    constructor(
        @InjectRepository(LocationEntity)
        private locationRepository: Repository<LocationEntity>
    ) {}

    async saveUserLocation(createLocationInput: CreateLocationInput) {
        try {
            const { userId } = createLocationInput
            const user = await this.findUser(userId)
            if (user) return await this.updateLocation(createLocationInput)
            return await this.createLocation(createLocationInput)
        } catch (error) {
            logger.debug(error)
            return error
        }
    }

    async createLocation(
        createLocationInput: CreateLocationInput
    ): Promise<any> {
        const rst = await this.locationRepository.save(createLocationInput)
        return rst
    }

    async findUser(userId: string): Promise<LocationEntity> {
        return await this.locationRepository.findOne({ userId })
    }

    async updateLocation(
        updateLocationInput: CreateLocationInput
    ): Promise<any> {
        return await this.locationRepository.save(updateLocationInput)
    }

    async calculateDistance(lat1, long1, lat2, long2) {
        const distance = await Math.sqrt(
            Math.pow(lat1 - lat2, 2) + Math.pow(long1 - long2, 2)
        )

        return distance
    }
}
