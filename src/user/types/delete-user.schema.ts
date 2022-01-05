import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ObjectType()
export class UserType {
  @Field({ nullable: true })
  user: User;
  @Field({ nullable: true })
  message: string;
}
