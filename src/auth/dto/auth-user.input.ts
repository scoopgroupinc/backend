import { InputType, Int, Field, ObjectType, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, Contains, Matches, IsString, Length } from 'class-validator';

@InputType()
@ObjectType()
export class UserAuthInput {
  
  @Field()
  @IsNotEmpty()
  @Contains('@')
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @Matches(
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/,
    {
    message:'password too weak'
  })
  password:string;
 
  @Field()
  @IsString()
  firstName?:string;

  @Field()
  @IsString()
  lastName?:string;
  
  @Field({nullable: true})
  salt?:string;
  
  @Field({nullable: true})
  @Length(4)
  code?:number;

  
  @Field({nullable: true})
  @IsString()
  createdAt?:string;
}
