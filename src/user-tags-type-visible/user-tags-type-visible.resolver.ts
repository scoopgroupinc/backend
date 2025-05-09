import { UseGuards } from '@nestjs/common'
import {
    Args,
    Mutation,
    Parent,
    Query,
    ResolveField,
    Resolver,
} from '@nestjs/graphql'
import { GqlAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { UserTagsEntity } from 'src/user-tags/entities/user-tags.entity'
import { UserTagsService } from 'src/user-tags/user-tags.service'
import { UserTagsTypeVisibleInput } from './dto/create-user-tag-type-visible.input'
import { UserTagsTypeVisibleEntity } from './entities/user-tags-type-visible.entity'
import { UserTagsTypeVisibleService } from './user-tags-type-visible.service'

@Resolver(() => UserTagsTypeVisibleEntity)
export class UserTagsTypeVisibleResolver {
    constructor(
        private userTagsTypeVisibleService: UserTagsTypeVisibleService,
        private userTagsService: UserTagsService
    ) {}

    @UseGuards(GqlAuthGuard)
    @Mutation(() => [UserTagsTypeVisibleEntity], {
        name: 'saveUserTagsTypeVisible',
    })
    async saveUserTagsTypeVisibility(
        @Args('userTagsTypeVisibleInput', {
            type: () => [UserTagsTypeVisibleInput],
        })
        userTagsTypeVisibleInput: UserTagsTypeVisibleInput[]
    ) {
        const results =
            await this.userTagsTypeVisibleService.saveUserTagsTypeVisible(
                userTagsTypeVisibleInput
            )

        return results
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [UserTagsTypeVisibleEntity], {
        name: 'getAllUserTagsTypeVisible',
    })
    async getAllUserTagsTypeVisible(
        @Args('userId', { type: () => String }) userId: string
    ) {
        return await this.userTagsTypeVisibleService.allUserTagsTypeVisible(
            userId
        )
    }

    @ResolveField('userTags', () => [UserTagsEntity])
    async userTags(@Parent() userTagsTypeVisible: UserTagsTypeVisibleEntity) {
        const { userId, tagType } = userTagsTypeVisible
        return await this.userTagsService.getUserTags(userId, tagType)
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => [UserTagsTypeVisibleEntity], {
        name: 'prePopulateUserTags',
    })
    async prePopulateUserTags(
        @Args('userId', { type: () => String }) userId: string
    ) {
        const results =
            await this.userTagsTypeVisibleService.prePopulateUserTags(userId)

        return results
    }
}
