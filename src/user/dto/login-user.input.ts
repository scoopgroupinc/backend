import { InputType, Field } from '@nestjs/graphql';
import {  IsEmail, IsNotEmpty } from 'class-validator';


@InputType()
export class LoginUserInput {
  @IsNotEmpty()
  @IsEmail({}, { message: 'must be a valid email' })
  @Field({ nullable: true })
  email: string;

  @IsNotEmpty()
  @Field({ nullable: true })
  password: string;
}
