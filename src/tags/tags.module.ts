import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TagsEntity } from "./entities/tags.entity";
import { TagsResolver } from "./tags.resolver";
import { TagsService } from "./tags.service";

@Module({
    imports:[
       TypeOrmModule.forFeature([TagsEntity])
    ],
    providers:[
         TagsResolver,TagsService
    ],
    exports:[]
})
export class TagsModule{}