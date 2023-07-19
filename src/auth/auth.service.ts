import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../user/entities/user.entity'
import { Http } from 'winston/lib/winston/transports'
import logger from 'src/utils/logger'

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    generateJwt(email: string, userId: string) {
        return this.jwtService.sign({ email, userId })
    }

    async validateUser(payload: {
        email: string
        userId: string
    }): Promise<User> {
        try {
            const { email, userId } = payload
            const user = await this.userRepository.findOne({ email })
            if (!user) throw new UnauthorizedException()

            return user
        } catch (error) {
            logger.debug(error)
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }
}
