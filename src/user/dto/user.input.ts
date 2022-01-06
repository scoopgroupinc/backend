import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserInput {
  @Field({ nullable: true })
  userId?: string; 
  
  @Field({ nullable: false })
  email?: string;


  @Field({ nullable: true })
  code?: number;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;
  
}
