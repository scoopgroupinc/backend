import { TagsEntity } from "./entities/tags.entity";
import { TagsService } from "./tags.service";
import { Mutation, Args,Resolver, Query } from "@nestjs/graphql";
import { TagsInput } from "./dto/tags.input";
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from "@nestjs/common";


@Resolver(() => TagsEntity)
export class TagsResolver {
  constructor(private tagsService: TagsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => TagsEntity)
  async saveTag(@Args('tagInput') tagInput: TagsInput) {
    return await this.tagsService.saveTag(tagInput);
  }
  @UseGuards(GqlAuthGuard)
  @Query(() => [TagsEntity], {
    name: 'getspecificTag',
    description: 'fetch a tag',
  })
  async getTag(@Args('id') id: string): Promise<TagsEntity> {
    return await this.tagsService.findOne(id);
  }
  @UseGuards(GqlAuthGuard)
  @Query(() => [TagsEntity], {
    name: 'getAlTags',
    description: 'fetch all tags',
  })
  async getAllTags(): Promise<TagsEntity[]> {
    return await this.tagsService.findAll();
  }
}