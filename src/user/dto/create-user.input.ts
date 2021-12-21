import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  fullName: string;
  @Field({ nullable: true })
  email: string;
  @Field({ nullable: true })
  phoneNumber: string;
  @Field({ nullable: true })
  password: string;
}
