import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(data: any): Promise<User> {
    
    return this.userRepository.save(data);
  }

  // async findOne(userDetail: any): Promise<User> {
  //   try {
  //     return await this.userRepository.findOne(userDetail);
  //   } catch (e) {
  //     return null;
  //   }
  // }

  async findOne(userId: string): Promise<User> {
    try {
      return await this.userRepository.findOne({ userId });
    } catch (e) {
      return null;
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail({ where: { email } });
    } catch (e) {
      return null;
    }
  }

  async findAll() {
    try {
      return await this.userRepository.find();
    } catch (e) {
      return null;
    }
  }

  async update(userId: string, data: UpdateUserInput): Promise<User> {
    try {
      const user = await this.findOne(userId);
      // Object.assign(user, data);
     if(user) {
        return await this.userRepository.save(data);
     }
    } catch (e) {
      return null;
    }
  }

  async remove(userId: string): Promise<User> {
    try {
      const user = await this.findOne(userId);
      return await this.userRepository.remove(user);
    } catch (e) {
      return null;
    }
  }
}
