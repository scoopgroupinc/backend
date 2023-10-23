import * as bcrypt from 'bcrypt'
import {
    Injectable,
    BadRequestException,
    NotFoundException,
    HttpException,
    HttpStatus,
} from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { LoginUserInput } from './dto/login-user.input'
import { AuthService } from '../auth/auth.service'
import { UserDeviceService } from '../user-devices/user-devices.service'
import { UpdateUserInput } from './dto/update-user.input'
import logger from 'src/utils/logger'
import { JwtService } from '@nestjs/jwt'
import * as moment from 'moment'
import { VerifyRestPasswordCode } from './dto/verify-Code-output'
import { UserTagsTypeVisibleService } from 'src/user-tags-type-visible/user-tags-type-visible.service'
import { OnBoardInput } from './dto/onBoarding.input'
import { FederatedCredential } from './entities/federated-credential.entity'
import { UserProfileService } from 'src/user-profile/user-profile.service'
import { UserProfileInput } from 'src/user-profile/dto/user-profile.input'
import { AppleAuthCredentialsInput } from './dto/apple-auth-credentials.input'
import { UserToken } from './types/user-token.schema'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(FederatedCredential)
        private federatedCredentialRepository: Repository<FederatedCredential>,
        private authService: AuthService,
        private deviceService: UserDeviceService,
        private mailerService: MailerService,
        private jwtService: JwtService,
        private userTagsTypeVisibleService: UserTagsTypeVisibleService,
        private userProfileSvc: UserProfileService
    ) {}

    async getToken(userId: string) {
        if (process.env.NODE_ENV === 'production') {
            throw new HttpException(
                'Not able to use in production',
                HttpStatus.NOT_FOUND
            )
        }
        const user = await this.userRepository.findOne(userId)

        if (!user)
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)

        return {
            token: this.authService.generateJwt(user.email, user.userId),
            user,
        }
    }

    async validateAppleCredentials(credentials: AppleAuthCredentialsInput) {
        try {
            const decoded = await this.authService.validateAppleIdentityToken(
                credentials?.identityToken
            )

            if (decoded.sub) {
                const appleUser =
                    await this.federatedCredentialRepository.findOne({
                        where: {
                            providerUserId: decoded.sub,
                            provider: 'apple',
                        },
                    })

                if (appleUser) {
                    const user = await this.userRepository.findOne({
                        where: { userId: appleUser.userId },
                    })

                    if (user) {
                        const token = this.authService.generateJwt(
                            user.email,
                            user.userId
                        )
                        return {
                            token,
                            user,
                            message: null,
                        }
                    } else {
                        await this.federatedCredentialRepository.delete(
                            appleUser
                        )
                        throw new HttpException(
                            'User not found',
                            HttpStatus.NOT_FOUND
                        )
                    }
                } else {
                    const user = await this.userRepository.save({
                        email: credentials.email,
                        password: null,
                        code: null,
                        isVerified: true,
                    })

                    if (user) {
                        const userProfile: UserProfileInput = {
                            userId: user.userId,
                        }
                        await this.federatedCredentialRepository.save({
                            provider: 'apple',
                            providerUserId: decoded.sub,
                            email: user.email,
                            userId: user.userId,
                        })
                        const resp = await this.userProfileSvc.saveUserProfile(
                            userProfile
                        )

                        if (resp) {
                            await this.userTagsTypeVisibleService.prePopulateUserTags(
                                user.userId
                            )
                        }
                    } else {
                        await this.userRepository.delete({
                            email: credentials.email,
                        })
                    }

                    return {
                        token: this.authService.generateJwt(
                            user.email,
                            user.userId
                        ),
                        user,
                        message: null,
                    }
                }
            }
        } catch (error) {
            logger.debug(error)
            throw new HttpException(
                'Failed to validate token',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    async findOrCreateUserWithApple(profile: any) {
        const { id, email, provider } = profile

        try {
            const appleUser = await this.federatedCredentialRepository.findOne({
                where: { providerUserId: id, provider },
            })

            if (appleUser) {
                const user = await this.userRepository.findOne({
                    where: { userId: appleUser.userId },
                })

                if (user) {
                    return {
                        token: this.authService.generateJwt(
                            user.email,
                            user.userId
                        ),
                        user,
                        message: null,
                    }
                } else {
                    await this.federatedCredentialRepository.delete({
                        providerUserId: id,
                        provider,
                        email,
                    })
                    throw new HttpException(
                        'User not found',
                        HttpStatus.NOT_FOUND
                    )
                }
            } else {
                const user = await this.userRepository.findOne({
                    where: { email },
                })

                if (user) {
                    await this.federatedCredentialRepository.save({
                        provider,
                        providerUserId: id,
                        email,
                        userId: user.userId,
                    })
                    return {
                        token: this.authService.generateJwt(
                            user.email,
                            user.userId
                        ),
                        user,
                        message: null,
                    }
                } else {
                    const user = await this.userRepository.save({
                        email,
                        password: null,
                        code: null,
                        isVerified: true,
                    })

                    if (user) {
                        const userProfile: UserProfileInput = {
                            userId: user.userId,
                        }
                        await this.federatedCredentialRepository.save({
                            provider,
                            providerUserId: id,
                            email,
                            userId: user.userId,
                        })
                        const resp = await this.userProfileSvc.saveUserProfile(
                            userProfile
                        )

                        if (resp) {
                            await this.userTagsTypeVisibleService.prePopulateUserTags(
                                user.userId
                            )
                        }
                    } else {
                        await this.userRepository.delete({ email })
                    }

                    return {
                        token: this.authService.generateJwt(
                            user.email,
                            user.userId
                        ),
                        user,
                        message: null,
                    }
                }
            }
        } catch (error) {
            logger.debug(error)
            throw new HttpException(
                'Failed to find or create user with Apple',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    async findOrCreateUserWithGoogle(profile: any) {
        const { id, email, provider } = profile

        try {
            const googleUser = await this.federatedCredentialRepository.findOne(
                {
                    where: { providerUserId: id, provider, email },
                }
            )

            if (googleUser) {
                const user = await this.userRepository.findOne({
                    where: { userId: googleUser.userId, email },
                })

                if (user) {
                    return {
                        token: this.authService.generateJwt(
                            user.email,
                            user.userId
                        ),
                        user,
                        message: null,
                    }
                } else {
                    await this.federatedCredentialRepository.delete({
                        providerUserId: id,
                        provider,
                        email,
                    })
                    throw new HttpException(
                        'User not found',
                        HttpStatus.NOT_FOUND
                    )
                }
            } else {
                const user = await this.userRepository.findOne({
                    where: { email },
                })

                if (user) {
                    await this.federatedCredentialRepository.save({
                        provider,
                        providerUserId: id,
                        email,
                        userId: user.userId,
                    })
                    return {
                        token: this.authService.generateJwt(
                            user.email,
                            user.userId
                        ),
                        user,
                        message: null,
                    }
                } else {
                    const user = await this.userRepository.save({
                        email,
                        password: null,
                        code: null,
                        isVerified: true,
                    })

                    if (user) {
                        const userProfile: UserProfileInput = {
                            userId: user.userId,
                        }
                        await this.federatedCredentialRepository.save({
                            provider,
                            providerUserId: id,
                            email,
                            userId: user.userId,
                        })
                        const resp = await this.userProfileSvc.saveUserProfile(
                            userProfile
                        )

                        if (resp) {
                            await this.userTagsTypeVisibleService.prePopulateUserTags(
                                user.userId
                            )
                        }
                        return {
                            token: this.authService.generateJwt(
                                user.email,
                                user.userId
                            ),
                            user,
                            message: null,
                        }
                    } else {
                        await this.userRepository.delete({ email })
                    }
                }
            }
        } catch (error) {
            logger.debug(error)
            throw new HttpException(
                'Failed to find or create user with Google',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    async create(data: LoginUserInput) {
        const { email, password } = data
        const salt = await bcrypt.genSalt()
        const hashedPassword = await this.hashPassward(password, salt)
        const code = await this.generateFourDigitCode()

        try {
            await this.userRepository.save({
                email: email.toLowerCase(),
                password: hashedPassword,
                salt,
                code,
                isVerified: false,
            })

            const result = await this.sendVerificationMail(email, code)
            if (result)
                return 'Account created successfully. Check email to activate account'
            await this.userRepository.delete({ email })

            throw new HttpException(
                'Sign Up failed',
                HttpStatus.EXPECTATION_FAILED
            )
        } catch (error) {
            logger.debug(error)
            throw new HttpException(
                'Sign Up failed',
                HttpStatus.EXPECTATION_FAILED
            )
        }
    }

    async updateAccount(updateUser: UpdateUserInput): Promise<any> {
        const { email } = updateUser

        try {
            const user = await this.findOne(email)
            if (!user) throw new NotFoundException('User not found')

            return await this.userRepository.save({ ...user, ...updateUser })
        } catch (error) {
            logger.debug(error)
            throw new HttpException(
                'Failed to update user account',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    async login(loginUserInput: LoginUserInput) {
        const { email, password } = loginUserInput

        try {
            const user = await this.findOne(email)
            if (!(user && (await user.validatePassword(password)))) {
                throw new BadRequestException('Invalid credentials')
            }

            if (!user.isVerified)
                throw new BadRequestException('Kindly activate your account')

            const payload = {
                token: this.authService.generateJwt(user.email, user.userId),
                user,
                message: null,
            }

            // this.deviceService.updateLastLogin(macAddress)
            return payload
        } catch (error) {
            logger.debug(error)
            throw new HttpException(
                'Login failed',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    async activateAccount(code: number, email: string) {
        try {
            const user = await this.findOne(email)
            const minutesAgo = moment(Date.now()).diff(
                user.updatedAt,
                'minutes'
            )
            const isInvalid = minutesAgo > 15

            if (!(user && user.code === code) || isInvalid) {
                throw new BadRequestException(
                    'Unable to activate account. Invalid Code'
                )
            }
            if (user.isVerified)
                throw new BadRequestException('Account already activated')

            const result = await this.userRepository.save({
                ...user,
                isVerified: true,
            })
            if (result) {
                this.userTagsTypeVisibleService.prePopulateUserTags(
                    result.userId
                )

                const payload = {
                    token: this.authService.generateJwt(
                        result.email,
                        result.userId
                    ),
                    user: {
                        userId: result.userId,
                        email: result.email,
                        firstName: result.firstName,
                        lastName: result.lastName,
                        isOnboarded: result.isOnboarded,
                        isVoteOnboarded: result.isVoteOnboarded,
                    },
                }

                return payload
            }
        } catch (error) {
            logger.debug(error)
            throw new HttpException(
                'Failed to activate account',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    async resendActivationCode(email: string) {
        try {
            const user = await this.findOne(email)
            if (!user)
                throw new HttpException('User not found', HttpStatus.NOT_FOUND)
            const code = await this.generateFourDigitCode()
            await this.userRepository.save({ ...user, code })
            const result = await this.sendVerificationMail(email, code)
            if (result) return 'Activation Code sent'
            return 'Failed to send code'
        } catch (error) {
            logger.debug(error)
            throw new HttpException(
                'Failed to resend activation code',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    async forgotPassword(email: string): Promise<string> {
        try {
            const user = await this.findOne(email)
            if (!user)
                throw new HttpException('User not found', HttpStatus.NOT_FOUND)
            const code = await this.generateFourDigitCode()
            await this.userRepository.save({ ...user, resetCode: code })
            const result = await this.sendforgotPasswordMail(email, code)
            if (result) return 'Password reset link sent to your email'
            return 'Password reset failed'
        } catch (error) {
            logger.debug(error)
            throw new HttpException(
                'Failed to initiate password reset',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    async verifyResetCode(
        email: string,
        code: number
    ): Promise<VerifyRestPasswordCode> {
        try {
            const user = await this.findOne(email)
            const minutesAgo = moment(Date.now()).diff(
                user.updatedAt,
                'minutes'
            )
            const isInvalid = minutesAgo > 15
            if (!user)
                throw new HttpException('User not found', HttpStatus.NOT_FOUND)
            if (!(user && user.resetCode === code) || isInvalid) {
                throw new HttpException(
                    'Invalid code',
                    HttpStatus.EXPECTATION_FAILED
                )
            }
            return {
                message: 'Code verified',
                token: this.authService.generateJwt(user.email, user.userId),
            }
        } catch (error) {
            logger.debug(error)
            throw new HttpException(
                'Failed to verify reset code',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    async resetPassword(email: string, password: string) {
        try {
            const user = await this.findOne(email)
            if (!user)
                throw new HttpException('User not found', HttpStatus.NOT_FOUND)
            const hashedPassword = await this.hashPassward(password, user.salt)
            return await this.userRepository.save({
                ...user,
                password: hashedPassword,
            })
        } catch (error) {
            logger.debug(error)
            throw new HttpException(
                'Failed to reset password',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    async findOne(email: string): Promise<User> {
        try {
            email = email.toLowerCase()
            const user = await this.userRepository.findOne({ where: { email } })
            return user
        } catch (error) {
            logger.debug(error)
            throw new HttpException(
                'Failed to find user',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    async findOneByID(userId: any): Promise<User> {
        try {
            return this.userRepository.findOne({ userId })
        } catch (error) {
            logger.debug(error)
            throw new HttpException(
                'Failed to find user',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    async sendVerificationMail(email: string, code: number): Promise<boolean> {
        try {
            const year = moment().year()
            const response = await this.mailerService.sendMail({
                to: email,
                from: 'noreply@scoop.love',
                subject: 'Scoop account Activation ✔',
                text: 'welcome',
                template: 'activation',
                context: { code, year, warning: false },
            })
            if (response.rejected.length === 0) {
                return true
            } else {
                return false
            }
        } catch (error) {
            logger.debug(error)
            throw new HttpException(
                'Failed to send verification email',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    async sendforgotPasswordMail(
        email: string,
        code: number
    ): Promise<boolean> {
        try {
            const year = moment().year()
            const response = await this.mailerService.sendMail({
                to: email,
                from: 'noreply@scoop.love',
                subject: 'Reset password ✔',
                text: 'welcome',
                template: 'activation',
                context: { code, year, warning: false },
            })
            if (response.rejected.length === 0) {
                return true
            } else {
                return false
            }
        } catch (error) {
            logger.debug(error)
            throw new HttpException(
                'Failed to send forgot password email',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    async hashPassward(password: string, salt: string): Promise<string> {
        try {
            return await bcrypt.hash(password, salt)
        } catch (error) {
            logger.debug(error)
            throw new HttpException(
                'Failed to hash password',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    async generateFourDigitCode(): Promise<number> {
        try {
            return await Math.floor(1000 + Math.random() * 9000)
        } catch (error) {
            logger.debug(error)
            throw new HttpException(
                'Failed to generate four-digit code',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    async remove(userId: string, email: string): Promise<any> {
        try {
            let user: any = null
            if (userId) user = await this.findOneByID(userId)
            if (email) user = await this.findOne(email)
            if (!user)
                throw new HttpException('User not found', HttpStatus.NOT_FOUND)
            await this.userRepository.delete({ userId: user.userId })
            return 'user deleted'
        } catch (error) {
            logger.debug(error)
            throw new HttpException(
                'Failed to remove user',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    async updateOnBoarding({
        userId,
        isVoteOnboarded,
        isOnboarded,
    }: OnBoardInput) {
        try {
            await this.userRepository.update(
                { userId },
                { isOnboarded, isVoteOnboarded }
            )
            return 'Saved'
        } catch (error) {
            logger.debug(error)
            throw new HttpException(
                'Failed to update onboarding',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }
}
