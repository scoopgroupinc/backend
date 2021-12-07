import { InputType, Field,Int } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  id: string
 @Field()
    firstName: string
    @Field()
    lastName: string
    @Field()
    school: string
    @Field()
    city: string
}