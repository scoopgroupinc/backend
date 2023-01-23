import { UseGuards } from '@nestjs/common'
import { Mutation, Resolver } from '@nestjs/graphql'
import { GqlAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { UserTagsService } from './user-tags.service'

@Resolver()
export class UserTagsResolver {
    constructor(private userTagsService: UserTagsService) {}

    // @UseGuards(GqlAuthGuard)
    // @Mutation
}
