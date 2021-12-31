import { InputType, Field, Int } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { IsAlpha, IsEmail } from 'class-validator';


@InputType()
export class LoginUserInput {
  @IsEmail({}, { message: 'must be a valid email' })
  @Field({ nullable: true })
  email: string;
  @Field({ nullable: true })
  password: string;
}
