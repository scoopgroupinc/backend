import { InputType, Field, Int } from '@nestjs/graphql';
import { IsAlpha, IsEmail, IsNotEmpty, Length } from 'class-validator';
import { IsPhonelAlreadyExist } from '../IsPhoneAlreadyExist';
import { IsEmailAlreadyExist } from '../IsEmailAlreadyExist';


@InputType()
export class CreateUserInput {
  @IsAlpha()
  @Field({ nullable: true })
  firstName: string;

  @IsAlpha()
  @Field({ nullable: true })
  lastName: string;

  @IsEmail({}, { message: 'must be a valid email' })
  @IsEmailAlreadyExist({ message: 'email already exist' })
  @Field({ nullable: true })
  email: string;

  @IsPhonelAlreadyExist({ message: 'Phone already in use' })
  @Field({ nullable: true })
  phoneNumber: string;

  @Length(6, 20,{message:"password must be atleast 6 characters"})
  @IsNotEmpty()
  @Field()
  password: string;
}
