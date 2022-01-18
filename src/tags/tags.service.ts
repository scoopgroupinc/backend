import { Injectable,NotFoundException } from "@nestjs/common";
import { TagsInput } from "./dto/tags.input";
import { Repository } from "typeorm";
import { TagsEntity } from "./entities/tags.entity";
import { InjectRepository } from "@nestjs/typeorm";
import readXlsxFile  from 'read-excel-file/node';

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
       const result=await this.tagsRepository.find({});

       result.forEach(tag=>{
           if(tag.emoji!==""){
             tag.emoji= this.convertFromHexaToEmoji(tag.emoji);
           }
        })
       return result;
    }

    async getTags(tagType:string):Promise<TagsEntity[]>{
        if(tagType==='all'||tagType==='') return await this.findAll()

        return await this.getTagsbyType(tagType);
    }

    async updateTag(tagInput:TagsInput):Promise<any>{
        const {id}=tagInput;
        const tag = await this.findOne(id);
        if(!tag) return new NotFoundException('Not Found');
        return await this.tagsRepository.save({...tag,...tagInput});
      
    }

    async getTagsbyType(tagType:string):Promise<TagsEntity[]>{
        const result=  await this.tagsRepository.find({type:tagType});
        result.forEach(tag=>{
            if(tag.emoji!==""){
              tag.emoji= this.convertFromHexaToEmoji(tag.emoji);
            }
         })
        return result;
    }

    async uploadTags(){
        // let path= __dirname+'/tags.xlsx';

        // readXlsxFile(path).then(async rows=>{
        //     rows.shift();

        //     let tags=[]
        //     rows.forEach((row) => {
                
        //         let tag = {
        //           type: row[0],
        //           name: row[1],
        //           order: row[2],
        //           visible: row[3],
        //           emoji:row[4]!==null?this.convertFromEmojiToHexa(row[4]):null
        //         };
        
        //         tags.push(tag);
        //       });

        //     await this.tagsRepository.create(tags);
        //     const result=await this.tagsRepository.save(tags);
        //     if(result) return true

        //     return false;
        
        // })
        return true
        
    }

     convertFromEmojiToHexa(emoji){
         return emoji.toString().codePointAt(0).toString(16)
    }

    convertFromHexaToEmoji(hex){
        return String.fromCodePoint(parseInt('0x'+hex));
   }


}