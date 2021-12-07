import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  id: string;
    firstName: string
    @Field()
    lastName: string
    @Field()
    school: string
    @Field()
    city: string
}


