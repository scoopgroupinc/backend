import { InputType, Field } from "@nestjs/graphql";
import { IsString,IsNumber, IsObject, } from "class-validator";

@InputType()
export class UserPreferenceInput{
    @Field()
    userId:string;

    @Field()
    @IsString()
    createdAt?:string;

    @Field({nullable:true})
    @IsObject()    
    heightRange?: string[]

    @Field({nullable:true})
    @IsObject()    
    ageRange?: string[]

   
    @Field({nullable: true})   
    @IsObject()
    gender?:string[];


    @Field({nullable:true})
    @IsNumber()
    distance:number;

    @Field({nullable:true})
    @IsObject()
    ethnicityPreferences:string[];

    @Field({nullable:true})
    @IsObject()
    sportsPreferences:string[]
}