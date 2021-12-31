import { UserInput } from './user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(UserInput) {
  @Field(() => String)
  userId: string;

  @Field(()=>String)
  @IsEmail()
  email:string;

  @Field()
  firstName: string; 

  @Field()
  lastName: string; 

  @Field()
  phoneNumber: string;
}


