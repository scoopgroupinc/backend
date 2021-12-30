import { InputType, Field, Int } from '@nestjs/graphql';
import { IsAlpha, IsEmail } from 'class-validator';
import { IsEmailAlreadyExist } from '../IsEmailAlreadyExists';

@InputType()
export class CreateUserInput {

  @IsAlpha()
  @Field({ nullable: true })
  firstName: string;

  @IsAlpha()
  @Field({ nullable: true })
  lastName: string;

  @IsEmailAlreadyExist({ message: 'email already in use' })
  @IsEmail({}, { message: 'must be a valid email' })
  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  phoneNumber: string;
  
  @Field({ nullable: true })
  password: string;
}
