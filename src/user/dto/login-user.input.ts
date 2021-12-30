import { InputType, Field, Int } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class LoginUserInput {
  @Field({ nullable: true })
  email: string;
  @Field({ nullable: true })
  password: string;
}
