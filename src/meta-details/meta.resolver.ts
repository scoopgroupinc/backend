import { Resolver } from '@nestjs/graphql'
import { MetaDetails } from './entities/meta.entity'
import { MetaDetailsService } from './meta.service'

@Resolver(() => MetaDetails)
export class MetaDetailsResolver {
    constructor(private metaDetailsService: MetaDetailsService) {}

    async getMetaDetails() {}

    async updateDetials() {}
}
