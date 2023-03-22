import { UseGuards } from '@nestjs/common'
import { Args, Resolver, Mutation, Query } from '@nestjs/graphql'
import { GqlAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { IGroupMembers } from './dto/goupCodes.output'
import { GroupCodesService } from './group-code.service'

@Resolver(() => IGroupMembers)
export class GroupCodesResolver {
    constructor(private groupCodeService: GroupCodesService) {}

    @UseGuards(GqlAuthGuard)
    @Mutation(() => String)
    async createCodes(@Args('code') code: string) {
        return await this.groupCodeService.create(code)
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => String)
    async verifyCode(
        @Args('code') code: string,
        @Args('userId') userId: string
    ) {
        return await this.groupCodeService.joinGroup(code, userId)
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [IGroupMembers])
    async getGroupMembers(@Args('userId') userId: string) {
        return await this.groupCodeService.getGroupMembers(userId)
    }
}
