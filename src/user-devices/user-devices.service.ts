import {
    Injectable,
    BadRequestException,
    HttpException,
    HttpStatus,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserDevice } from './entities/user-devices.entity'
import { Repository } from 'typeorm'
import { UserDeviceInput } from './dto/user-devices.inputs'
import logger from 'src/utils/logger'

@Injectable()
export class UserDeviceService {
    constructor(
        @InjectRepository(UserDevice)
        private userdeviceRepository: Repository<UserDevice>
    ) {}

    async saveDeviceDetails(userDeviceInput: UserDeviceInput) {
        const { macAddress } = userDeviceInput

        try {
            const device = await this.findOne(macAddress)

            if (device) {
                return await this.updateLastLogin(macAddress)
            }

            return await this.createOne(userDeviceInput)
        } catch (error) {
            logger.debug(error)
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async findOne(macAddress: string): Promise<UserDevice> {
        try {
            const device = await this.userdeviceRepository.findOne({
                where: { macAddress },
            })

            return device
        } catch (error) {
            logger.debug(error)
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async createOne(userDeviceInput: UserDeviceInput): Promise<any> {
        try {
            return await this.userdeviceRepository.save(userDeviceInput)
        } catch (error) {
            // Handle the error appropriately (log, rethrow, etc.)
            logger.debug(error)
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async updateLastLogin(macAddress: string): Promise<any> {
        try {
            const device = await this.findOne(macAddress)
            if (!device) throw new BadRequestException('user device not found')
            return await this.userdeviceRepository.save({
                ...device,
                lastLogin: new Date().toISOString().toString(),
            })
        } catch (error) {
            logger.debug(error)
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }
}
