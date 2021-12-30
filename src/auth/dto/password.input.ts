import { InputType, Field, ID, ObjectType } from "@nestjs/graphql";
import { Matches, IsNotEmpty } from "class-validator";
import { PrimaryColumn } from "typeorm";

@InputType()
@ObjectType()
export class ChangePassInput{
  
    @Field(() => ID)
    @PrimaryColumn()
    id:number

    @Field()
    @IsNotEmpty()
    @Matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/,
      {
      message:'password too weak'
    })
    password:string
}