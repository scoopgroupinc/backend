import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class UserOutput {
    @Field(() => ID)
    userId: string
    @Field({ nullable: true })
    firstName?: string | null
    @Field({ nullable: true })
    lastName?: string | null
    @Field({ nullable: true })
    email?: string | null
    @Field(() => Boolean)
    isOnboarded: boolean
    @Field(() => Boolean)
    isVoteOnboarded: boolean
}

@ObjectType()
export class UserToken {
    @Field()
    token: string

    @Field({ nullable: true })
    user: UserOutput
    @Field({ nullable: true })
    message: string
}
