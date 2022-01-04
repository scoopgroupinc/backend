import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field({ nullable: false })
  email: string;

  @Field({ nullable: true })
  phoneNumber: string;

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;
  
}
