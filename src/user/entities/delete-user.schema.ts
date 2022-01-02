import { ObjectType, Field } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
export class UserDelete {
  @Field({ nullable: true })
  user: User;
  @Field({ nullable: true })
  message: string;
}
