import {
    ForbiddenException,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as argon2 from 'argon2'
import { User } from '../user/entities/user.entity'
import logger from 'src/utils/logger'
import { AppleService } from './apple/apple.service'
import { ConfigService } from '@nestjs/config'
import { Auth } from './entities/auth.entity'

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
        @InjectRepository(Auth) private authRepository: Repository<Auth>,
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService,
        private appleService: AppleService,
        private configService: ConfigService
    ) {}

    generateJwt(email: string, userId: string) {
        return this.jwtService.sign({ email, userId })
    }

    // async validateUser(payload: {
    //     email: string
    //     userId: string
    // }): Promise<User> {
    //     try {
    //         const { email, userId } = payload
    //         const user = await this.userRepository.findOne({ email })
    //         if (!user) throw new UnauthorizedException()

    //         return user
    //     } catch (error) {
    //         logger.debug(error)
    //         throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    //     }
    // }

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

    hashData(data: string) {
        return argon2.hash(data)
    }

    async updateRefreshToken(
        userId: string,
        refreshToken: string,
        deviceId: string
    ) {
        const hashedRefreshToken = await this.hashData(refreshToken)
        const userDeviceRecord = await this.authRepository.findOne({
            userId,
            deviceId,
        })

        if (!userDeviceRecord) {
            throw new Error('Record not found')
        }
        userDeviceRecord.refreshToken = hashedRefreshToken
        await this.authRepository.save(userDeviceRecord)
    }

    async refreshTokens(
        userId: string,
        refreshToken: string,
        deviceId: string
    ) {
        const user_auth = await this.authRepository.findOne({
            where: {
                userId,
                refreshToken,
                deviceId,
            },
        })
        if (!user_auth || !user_auth.refreshToken)
            throw new ForbiddenException('Access Denied')
        const refreshTokenMatches = await argon2.verify(
            user_auth.refreshToken,
            refreshToken
        )
        if (!refreshTokenMatches) throw new ForbiddenException('Access Denied')
        const tokens = await this.getTokens(userId, user.username)
        await this.updateRefreshToken(userId, tokens.refreshToken, deviceId)
        return tokens
    }

    async getTokens(userId: string, username: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    username,
                },
                {
                    secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
                    expiresIn: '15m',
                }
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                    username,
                },
                {
                    secret: this.configService.get<string>(
                        'JWT_REFRESH_SECRET'
                    ),
                    expiresIn: '7d',
                }
            ),
        ])

        return {
            accessToken,
            refreshToken,
        }
    }

    //https://www.elvisduru.com/blog/nestjs-jwt-authentication-refresh-token
}
