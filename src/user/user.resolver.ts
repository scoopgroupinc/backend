import { BadRequestException } from '@nestjs/common'
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'

import { UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './entities/user.entity'
import { UserToken } from './types/user-token.schema'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { LoginUserInput } from './dto/login-user.input'
import { AuthService } from '../auth/auth.service'
import { JwtService } from '@nestjs/jwt'
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard'
import { UserType } from './types/delete-user.schema'

@Resolver(() => User)
export class UserResolver {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private authService: AuthService
    ) {}

    @Mutation(() => String)
    async createUser(
        @Args('createUserInput') createUserInput: CreateUserInput
    ) {
        return await this.userService.create(createUserInput)
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => User)
    async updateUser(
        @Args('updateUserInput') updateUserInput: UpdateUserInput
    ) {
        return await this.userService.updateAccount(updateUserInput)
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => User)
    async getUser(@Args('userId') userId: string) {
        return await this.userService.findOneByID(userId)
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => UserType)
    async deleteUser(@Args('userId') userId: string) {
        const user = await this.userService.findOneByID(userId)
        if (!user) {
            throw new BadRequestException('user do not exist')
        }
        return {
            message: 'user succefully deleted',
            user: await this.userService.remove(userId),
        }
    }

    @Mutation(() => UserToken)
    async login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
        return await this.userService.login(loginUserInput)
    }

    @Mutation(() => UserToken)
    async activateAccount(
        @Args('code') code: number,
        @Args('email') email: string
    ) {
        return await this.userService.activateAccount(code, email)
    }

    @Mutation(() => String, { name: 'resendActivationCode' })
    async resendCode(@Args('email') email: string) {
        return await this.userService.resendActivationCode(email)
    }

    @Mutation(() => String)
    async forgotPassword(@Args('email') email: string): Promise<string> {
        return await this.userService.forgotPassword(email)
    }

    @Mutation(() => String)
    async verifyPasswordResetCode(
        @Args('email') email: string,
        @Args('code') code: number
    ) {
        return await this.userService.verifyResetCode(email, code)
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => User)
    async resetPassword(
        @Args('email') email: string,
        @Args('password') password: string
    ): Promise<any> {
        return await this.userService.resetPassword(email, password)
    }

    @Mutation(() => String)
    async testNewMailer(
        @Args('email') email: string,
        @Args('code') code: number
    ) {
        return await this.userService.sendVerificationMail(email, code)
    }
}
