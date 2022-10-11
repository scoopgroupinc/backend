import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class VerifyRestPasswordCode {
    @Field({ nullable: true })
    message?: string

    @Field({ nullable: false })
    token?: string
}
