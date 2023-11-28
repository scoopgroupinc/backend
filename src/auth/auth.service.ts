import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import fetch from 'node-fetch'
import { Repository } from 'typeorm'
import { User } from '../user/entities/user.entity'
import logger from 'src/utils/logger'
import { AppleService } from './apple/apple.service'

interface AppleDecodedToken {
    iss: string
    aud: string
    exp: number
    iat: number
    sub: string
    c_hash: string
    email: string
    email_verified: 'true' | 'false' // or boolean if the value is not in quotes
    is_private_email: 'true' | 'false' // or boolean if the value is not in quotes
    auth_time: number
    nonce_supported: boolean
}

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private appleService: AppleService,
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

    async validateAppleIdentityToken(identityToken: string, nonce?: string) {
        const decodedToken = this.jwtService.decode(
            identityToken
        ) as AppleDecodedToken

        try {
            await this.appleService.verifyAppleJwt(identityToken)
            //     this.jwtService.verify(identityToken, options)
            //     if (nonce && decodedToken.payload.nonce !== nonce) {
            //         throw new Error('Invalid nonce')
            //     }
            if (decodedToken.exp < Date.now() / 1000) {
                throw new Error('Token has expired')
            }
            return decodedToken
        } catch (err) {
            console.error(err)
            return null
        }
    }
}
