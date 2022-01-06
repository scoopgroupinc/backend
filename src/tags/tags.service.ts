import { Injectable,NotFoundException } from "@nestjs/common";
import { TagsInput } from "./dto/tags.input";
import { Repository } from "typeorm";
import { TagsEntity } from "./entities/tags.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class TagsService{
    constructor(
        @InjectRepository(TagsEntity)
        private tagsRepository:Repository<TagsEntity>
    ){}
    
    async saveTag(tagInput:TagsInput){
        try {            
            const {id} = tagInput;
            const tag = await this.findOne(id)

            if(tag) return await this.updateTag(tagInput);
            return await this.createTag(tagInput);
        } catch (error) {
            console.log(error)
            return error;
        }
    }

    async createTag(tagInput:TagsInput):Promise<any>{
        return await this.tagsRepository.create(tagInput);
    }

    async findOne(id:string):Promise<TagsEntity>{
        return await this.tagsRepository.findOne({id});
    }

    async findAll():Promise<TagsEntity[]>{
        return await this.tagsRepository.find({});
    }

    async updateTag(tagInput:TagsInput):Promise<any>{
        const {id}=tagInput;
        const tags = await this.findOne(id);
        if(!tags) return new NotFoundException('Not Found');
        return await this.tagsRepository.save({...tags,...tagInput});
      
    }
}