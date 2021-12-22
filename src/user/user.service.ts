import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(data: any): Promise<User> {
    return this.userRepository.save(data);
  }
  async findOne(userDetail: any): Promise<User> {
    return this.userRepository.findOne(userDetail);
  }

  findAll() {
    return this.userRepository.find();
  }
}
