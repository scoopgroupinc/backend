import { InputType, ID, Field } from "@nestjs/graphql";
import { MaxLength, IsDecimal, IsBoolean, IsString } from "class-validator";
import {tagType} from '../entities/tags.entity'


@InputType()
export class TagsInput{
    @Field(()=>ID)
    id:string;

    @Field()
    @MaxLength(30)
    name:string;

    @Field()    
    type:tagType;

    @Field()
    @IsDecimal()
    order:number;

    @Field()
    @IsBoolean()
    visible:Boolean;

    @Field()
    @IsString()
    emoji:string;

}