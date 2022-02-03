import { TagsEntity } from './entities/tags.entity';
import { TagsService } from './tags.service';
import { Mutation, Args, Resolver, Query } from '@nestjs/graphql';
import { TagsInput } from './dto/tags.input';

@Resolver(() => TagsEntity)
export class TagsResolver {
    constructor(private tagsService: TagsService) { }

    @Mutation(() => TagsEntity)
    async saveTag(@Args('tagInput') tagInput: TagsInput) {
        return await this.tagsService.saveTag(tagInput);
    }

    @Query(() => TagsEntity, {
        name: 'getspecificTag',
        description: 'fetch a tag',
    })
    async getTag(@Args('id') id: string): Promise<TagsEntity> {
        return await this.tagsService.findOne(id);
    }

    @Query(() => [TagsEntity], {
        name: 'getTags',
        description:
            'Filter by: all,"", frequency, physical_activity,education,religion etc ',
    })
    async getTags(@Args('tagType') tagType: string): Promise<TagsEntity[]> {
        return await this.tagsService.getTags(tagType);
    }

    @Query(() => [TagsEntity], {
        description:
            'search by: frequency, physical_activity,education,religion etc',
    })
    async getTagsbyType(@Args('tagType') tagType: string) {
        return await this.tagsService.getTagsbyType(tagType);
    }

    @Query(() => String)
    async uploadTags() {
        return await this.tagsService.uploadTags();
    }
}
