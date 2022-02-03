import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDevice } from './entities/user-devices.entity';
import { Repository } from 'typeorm';
import { UserDeviceInput } from './dto/user-devices.inputs';

@Injectable()
export class UserDeviceService {
  constructor(
    @InjectRepository(UserDevice)
    private userdeviceRepository: Repository<UserDevice>,
  ) {}

  async saveDeviceDetails(userDeviceInput: UserDeviceInput) {
    const { macAddress } = userDeviceInput;
    const device = await this.findOne(macAddress);

    if (device) {
      return await this.updateLastLogin(macAddress);
    }

    userDeviceInput.createdAt = new Date().toISOString().toString();
    return await this.createOne(userDeviceInput);
  }

  async findOne(macAddress: string): Promise<UserDevice> {
    const device = await this.userdeviceRepository.findOne({
      where: { macAddress },
    });

    return device;
  }

  async createOne(userDeviceInput: UserDeviceInput): Promise<any> {
    return await this.userdeviceRepository.save(userDeviceInput);
  }

  async updateLastLogin(macAddress: string): Promise<any> {
    const device = await this.findOne(macAddress);
    if (!device) throw new BadRequestException('user device not found');
    return await this.userdeviceRepository.save({
      ...device,
      lastLogin: new Date().toISOString().toString(),
    });
    // return await this.userdeviceRepository.createQueryBuilder()
    //     .update(UserDevice)
    //     .set({lastLogin:new Date().toString()})
    //     .where('macAddress =:macAddress',{macAddress})
    //     .execute();
  }
}
