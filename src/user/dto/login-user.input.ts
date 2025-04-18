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

    // @Field({ nullable: false })
    // macAddress: string
}

@InputType()
export class AuthProviderInput {
    @Field({ nullable: true })
    email: string

    @Field({ nullable: false })
    provider: string

    @Field({ nullable: false })
    id: string
}
