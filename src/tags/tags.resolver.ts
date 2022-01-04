import { TagsEntity } from "./entities/tags.entity";
import { TagsService } from "./tags.service";
import { Mutation, Args,Resolver, Query } from "@nestjs/graphql";
import { TagsInput } from "./dto/tags.input";

@Resolver(()=>TagsEntity)
export class TagsResolver{
    constructor(
        private tagsService:TagsService
    ){}

    @Mutation(()=>TagsEntity)
    async saveTag(@Args('tagInput') tagInput:TagsInput){
        return await this.tagsService.saveTag(tagInput);
    }

    @Query(()=>[TagsEntity],{name:'specific_Tag',description:'fetch a tag'})
    async getTag(@Args('id') id:string):Promise<TagsEntity>{
        return await this.tagsService.findOne(id);
    }

    @Query(()=>[TagsEntity],{name:'all_Tags',description:'fetch all tags'})
    async getAllTags():Promise<TagsEntity[]>{
        return await this.tagsService.findAll()
    }

}