// import { CreateUserInput} from "./create-user.input"
import { UserInput } from './user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsAlpha, IsEmail, IsNotEmpty, Length } from 'class-validator';
import { IsPhonelAlreadyExist } from '../IsPhoneAlreadyExist';
import { IsEmailAlreadyExist } from '../IsEmailAlreadyExist';

import { ID, ObjectType } from 'type-graphql';



@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  userId?: string;

  @IsEmail({}, { message: 'must be a valid email' })
  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  phoneNumber: string;

  @Length(6, 20, { message: 'password must be atleast 6 characters' })
  @Field({ nullable: true })
  password: string;

  
  @Field({ nullable: true })
  firstName: string;

  
  @Field({ nullable: true })
  lastName: string;
}


