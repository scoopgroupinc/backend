import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class LoginUserInput {
  @Field({ nullable: true })
  email: string;
  @Field({ nullable: true })
  phoneNumber: string;
  @Field()
  password: string;
}
