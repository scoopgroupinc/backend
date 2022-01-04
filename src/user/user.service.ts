import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
NotFoundException
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
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

  async findByPhone(phoneNumber: string): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail({
        where: { phoneNumber },
      });
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

  async updateUser(data: UpdateUserInput): Promise<UpdateUserInput> {
    try {
      const user = await this.findOne(data.userId);

      if (user) {
        data.password =await this.hashPassward(data.password,12)
        return await this.userRepository.save({ ...user, ...data });
      }
    } catch (err) {
      return err;
    }
  }

  async delete(userId: string): Promise<User> {
    try {
      const user = await this.findOne(userId);
      return await this.userRepository.remove(user);
    } catch (e) {
      return null;
    }
  }

  async hashPassward(password: string, salt: number): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
