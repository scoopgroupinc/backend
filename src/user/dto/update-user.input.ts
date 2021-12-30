import { UserInput } from './user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(UserInput) {
  @Field(() => String)
  userId: string;

  @Field()
  firstName: string; 

  @Field()
  lastName: string; 

  @Field()
  phoneNumber: string;
}


