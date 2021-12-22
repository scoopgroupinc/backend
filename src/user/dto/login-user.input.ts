import { InputType, Field, Int } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class LoginUserInput {
  @Field({ nullable: true })
  email: string;
  @Field({ nullable: true })
  phoneNumber: string;
  @Field({ nullable: true })
  password: string;
}

// type authPayload {
//   access_token:string
// }

// export type AuthPayload = { 
//   token: string
//   user: User
// }