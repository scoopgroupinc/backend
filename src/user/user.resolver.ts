import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'

import { UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './entities/user.entity'
import { UserToken } from './types/user-token.schema'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { AuthProviderInput, LoginUserInput } from './dto/login-user.input'
import { VerifyRestPasswordCode } from './dto/verify-Code-output'
import { OnBoardInput } from './dto/onBoarding.input'
import { GqlAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { AppleAuthCredentialsInput } from './dto/apple-auth-credentials.input'
import { Any } from 'typeorm'

@Resolver(() => User)
export class UserResolver {
    constructor(private userService: UserService) {}

    @Mutation(() => String)
    async createUser(
        @Args('createUserInput') createUserInput: CreateUserInput
    ) {
        return await this.userService.create(createUserInput)
    }

    @Query(() => UserToken, {
        description: 'to be used for debugging on non production environments',
    })
    async getToken(@Args('userId') userId: string) {
        return await this.userService.getToken(userId)
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
    @Mutation(() => String)
    async deleteUser(
        @Args('userId') userId: string,
        @Args('email') email: string
    ) {
        return await this.userService.remove(userId, email)
    }

    @Mutation(() => UserToken)
    async login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
        return await this.userService.login(loginUserInput)
    }

    @Mutation(() => UserToken)
    async validateAppleCredentials(
        @Args('credentials') credentials: AppleAuthCredentialsInput
    ) {
        return await this.userService.validateAppleCredentials(credentials)
    }

    @Mutation(() => UserToken)
    async loginWithProvider(
        @Args('authProviderInput') authProviderInput: AuthProviderInput
    ) {
        const { provider } = authProviderInput
        if (provider === 'google')
            return await this.userService.findOrCreateUserWithGoogle(
                authProviderInput
            )
        if (provider === 'apple')
            return await this.userService.findOrCreateUserWithApple(
                authProviderInput
            )
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

    @Mutation(() => VerifyRestPasswordCode)
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
    @Mutation(() => String)
    async updateOnBoarding(@Args('onboardInput') onboardInput: OnBoardInput) {
        return await this.userService.updateOnBoarding(onboardInput)
    }
}
