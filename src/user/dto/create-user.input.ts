import { InputType, Field, Int } from '@nestjs/graphql';
import { IsAlpha, IsEmail, IsNotEmpty, Length } from 'class-validator';
import { IsPhonelAlreadyExist } from '../../utils/IsPhoneAlreadyExist';
import { IsEmailAlreadyExist } from '../../utils/IsEmailAlreadyExist';


@InputType()
export class CreateUserInput {

  @IsEmail({}, { message: 'must be a valid email' })
  @IsEmailAlreadyExist({ message: 'email already exist' })
  @Field({ nullable: true })
  email: string;


  @Field({ nullable: true })
  password: string;
}
