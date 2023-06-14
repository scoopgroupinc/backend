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
import { tag_type, tags } from 'src/common/enums'
import { OnBoardInput } from './dto/onBoarding.input'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private authService: AuthService,
        private deviceService: UserDeviceService,
        private mailerService: MailerService,
        private jwtService: JwtService,
        private userTagsTypeVisibleService: UserTagsTypeVisibleService
    ) {}

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
        const user = await this.findOne(email)
        if (!user) throw new NotFoundException('User not found')

        return await this.userRepository.save({ ...user, ...updateUser })
    }

    async login(loginUserInput: LoginUserInput) {
        const { email, password } = loginUserInput
        const user = await this.findOne(email)
        if (!(user && (await user.validatePassword(password)))) {
            throw new BadRequestException('Invalid credentials')
        }

        if (!user.isVerified)
            throw new BadRequestException('Kindly activate your account')

        const payload = {
            token: this.authService.generateJwt(user.email, user.userId),
            user,
        }

        // this.deviceService.updateLastLogin(macAddress)
        return payload
    }

    async activateAccount(code: number, email: string) {
        const user = await this.findOne(email)
        const minutesAgo = moment(Date.now()).diff(user.updatedAt, 'minutes')
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
            const userTagsTypeVisible = tags.map((tag) => ({
                userId: result.userId,
                visible: true,
                emoji: '',
                tagType: tag_type[tag],
                userTags: [],
            }))
            await this.userTagsTypeVisibleService.saveUserTagsTypeVisible(
                userTagsTypeVisible
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
                    isOnboard: result.onBoarding,
                    isVoteOnboard: result.isVoteOnboard,
                },
            }

            return payload
        }
    }

    async resendActivationCode(email: string) {
        const user = await this.findOne(email)
        if (!user)
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        const code = await this.generateFourDigitCode()
        await this.userRepository.save({ ...user, code })
        const result = await this.sendVerificationMail(email, code)
        if (result) return 'Activation Code sent'
        return 'Failed to send code'
    }

    async forgotPassword(email: string): Promise<string> {
        const user = await this.findOne(email)
        if (!user)
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        const code = await this.generateFourDigitCode()
        await this.userRepository.save({ ...user, resetCode: code })
        const result = await this.sendforgotPasswordMail(email, code)
        if (result) return 'Password reset link sent to your email'
        return 'Password reset failed'
    }

    async verifyResetCode(
        email: string,
        code: number
    ): Promise<VerifyRestPasswordCode> {
        const user = await this.findOne(email)
        const minutesAgo = moment(Date.now()).diff(user.updatedAt, 'minutes')
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
    }

    async resetPassword(email: string, password: string) {
        const user = await this.findOne(email)
        if (!user)
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        const hashedPassword = await this.hashPassward(password, user.salt)
        return await this.userRepository.save({
            ...user,
            password: hashedPassword,
        })
    }

    async findOne(email: string): Promise<User> {
        email = email.toLowerCase()
        const user = await this.userRepository.findOne({ where: { email } })
        return user
    }
    async findOneByID(userId: any): Promise<User> {
        return this.userRepository.findOne({ userId })
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
                context: { code, year },
            })
            if (response.rejected.length === 0) {
                return true
            } else {
                return false
            }
        } catch (error) {
            logger.debug(error)
        }
    }

    async hashPassward(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt)
    }

    async generateFourDigitCode(): Promise<number> {
        return await Math.floor(1000 + Math.random() * 9000)
    }

    async remove(userId: string, email: string): Promise<any> {
        let user: any = null
        if (userId) user = await this.findOneByID(userId)
        if (email) user = await this.findOne(email)
        if (!user)
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        await this.userRepository.delete({ userId: user.userId })
        return 'user deleted'
    }

    async updateOnBoarding({ userId, isVoteOnboard, isOnboard }: OnBoardInput) {
        await this.userRepository.update(
            { userId },
            { isOnboard, isVoteOnboard }
        )
        return 'Saved'
    }
}
