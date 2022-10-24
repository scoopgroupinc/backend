import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { MetaDetailsInput } from './dto/meta.input'
import { MetaDetails } from './entities/meta.entity'
import { MetaDetailsService } from './meta.service'

@Resolver(() => MetaDetails)
export class MetaDetailsResolver {
    constructor(private metaDetailsService: MetaDetailsService) {}
    @Mutation(() => MetaDetails)
    async createMetaDetails(
        @Args('metaDetailsInput') metaDetailsInput: MetaDetailsInput
    ) {
        return await this.metaDetailsService.createMetaDetails(metaDetailsInput)
    }
    @Query(() => MetaDetails)
    async getMetaDetails() {
        return await this.metaDetailsService.getMetaDetails()
    }

    @Mutation(() => MetaDetails)
    async updateDetials(
        @Args('metaDetailsInput') metaDetailsInput: MetaDetailsInput
    ) {
        return await this.metaDetailsService.updateDetails(metaDetailsInput)
    }
}
