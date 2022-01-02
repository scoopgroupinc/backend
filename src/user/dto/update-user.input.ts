// import { CreateUserInput} from "./create-user.input"
import { UserInput } from './user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';


@InputType()
export class UpdateUserInput extends PartialType(UserInput) {
  @Field({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
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


