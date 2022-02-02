import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User} from "../user/entities/user.entity"
import { JwtPayload } from './guards/jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class JwtAuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository:Repository<User>
  ) {}

  generateJwt(user: string): Promise<string> {
    return this.jwtService.signAsync({ user });
  }

  async validateUser(payload:JwtPayload):Promise<User>{
    const {email}= payload;
    const user =await this.userRepository.findOne({email});

    if(!user) throw new UnauthorizedException()

    return user;
  }

}