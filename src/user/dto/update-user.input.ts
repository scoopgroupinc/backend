/* eslint-disable prettier/prettier */
// import { CreateUserInput} from "./create-user.input"
import { UserInput } from './user.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'
import { IsEmail, Length } from 'class-validator'

@InputType()
export class UpdateUserInput extends PartialType(UserInput) {
    @Field(() => String)
    @IsEmail()
    email: string

    @Field()
    firstName?: string

    @Field()
    lastName?: string

    @Field(()=> String, {nullable: true})
    phoneNumber?: string
}
