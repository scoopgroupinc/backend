import { InputType, Field, Int } from '@nestjs/graphql'
import { User } from '../entities/user.entity'
import { IsEmail } from 'class-validator'

@InputType()
export class LoginUserInput {
    @Field({ nullable: false })
    @IsEmail()
    email: string

    @Field({ nullable: false })
    password: string

    @Field({ nullable: false })
    macAddress: string
}
