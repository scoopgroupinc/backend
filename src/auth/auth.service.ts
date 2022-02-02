import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User} from "../user/entities/user.entity"

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateJwt(user: User): Promise<string> {
    return this.jwtService.signAsync({ user });
  }

}
