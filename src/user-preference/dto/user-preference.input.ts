import { InputType, Field, ID } from "@nestjs/graphql";
import { IsString,IsNumber, IsObject, IsArray, IsOptional, } from "class-validator";

@InputType()
export class UserPreferenceInput{
    @Field(()=>ID)
    userId:string;

    @Field(()=>String,{nullable:true})
    // @IsString()
    createdAt?:string;

    @Field(()=>[String],{nullable:true})
    @IsArray()  
    @IsOptional()  
    heightRange?: string[]

    @Field(()=>[String],{nullable:true})
    @IsArray()   
    @IsOptional()
    ageRange?: string[]

   
    @Field(()=>[String],{nullable: true})   
    @IsArray()
    gender?:string[];


    @Field({nullable:true})
    @IsNumber()
    @IsOptional()
    distance?:number;

    @Field(()=>[String],{nullable:true})
    @IsArray()
    @IsOptional()
    ethnicityPreferences?:string[];

    @Field(()=>[String],{nullable:true})
    @IsArray()
    @IsOptional()
    sportsPreferences?:string[]
}