import { InputType, Field, Int } from '@nestjs/graphql';
import { IsAlpha, IsEmail, IsNotEmpty, Length } from 'class-validator';
import { IsPhonelAlreadyExist } from '../IsPhoneAlreadyExist';
import { IsEmailAlreadyExist } from '../IsEmailAlreadyExist';


@InputType()
export class CreateUserInput {

  @IsEmail({}, { message: 'must be a valid email' })
  @IsEmailAlreadyExist({ message: 'email already exist' })
  @Field({ nullable: true })
  email: string;


  @Field({ nullable: true })
  password: string;
}
