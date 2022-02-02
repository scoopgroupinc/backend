import { TagsEntity } from './entities/tags.entity';
import { TagsService } from './tags.service';
import { Mutation, Args, Resolver, Query } from '@nestjs/graphql';
import { TagsInput } from './dto/tags.input';

@Resolver(() => TagsEntity)
export class TagsResolver {
    constructor(private tagsService: TagsService) { }

    @Query(() => TagsEntity, {
        name: 'getSpecificTag',
        description: 'fetch a tag',
    })
    async getTag(@Args('id') id: string): Promise<TagsEntity> {
        return await this.tagsService.findOne(id);
    }

    @Query(() => [TagsEntity], {
        name: 'getTags',
        description: `Filter by: all,"", frequency, physical_activity,education,religion etc. 
    Passing all or an empty string as parameter will fetch all
       tags. To filter particular tags of type, pass the type as a parameter `,
    })
    async getTags(@Args('tagType') tagType: string): Promise<TagsEntity[]> {
        return await this.tagsService.getTags(tagType);
    }

    @Query(() => String)
    async uploadTags() {
        return await this.tagsService.uploadTags();
    }
}
