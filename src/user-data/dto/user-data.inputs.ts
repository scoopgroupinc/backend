import { InputType, Field, ID } from "@nestjs/graphql";
import { IsNumber } from "class-validator";

@InputType()
export class UserDataInput{
    @Field(()=>ID)   
    userId:string;

    @Field({nullable:true})   
    createdAt?:string;

    @Field({nullable:true})
    birthday?:string;

    @Field({nullable:true})
    @IsNumber()
    height?: number

   
    @Field({nullable: true})    
    gender?:string;

    @Field({nullable:true})
    locationId?:number

    @Field({nullable:true})
    educationLevel:string;

    @Field({nullable:true})
    ethinicity:string[];

    @Field({nullable:true})
    sports:string[]
}