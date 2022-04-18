import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtAuthService } from '../jwt.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private jwtService: JwtAuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        })
    }

    async validate(payload: any) {
        // const { email } = payload
        // const user = await this.userRepository.findOne({ email })
        // console.log(user)
        // if (!user) throw new UnauthorizedException()

        return await this.jwtService.validateUser(payload)
    }
}
