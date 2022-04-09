import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '../user/entities/user.entity'

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    generateJwt(email: string, userId: string): Promise<string> {
        return this.jwtService.signAsync({ email, userId })
    }
}
