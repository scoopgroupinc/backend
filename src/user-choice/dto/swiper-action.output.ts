import { Optional } from '@nestjs/common'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class MatchUser {
    @Field(() => String)
    userId: string

    @Field(() => String)
    firstName: string

    @Field(() => String)
    pic: string
}

@ObjectType()
export class SwiperActionOutput {
    @Field(() => String)
    message: string

    @Field(() => MatchUser)
    @Optional()
    user1?: MatchUser

    @Field(() => MatchUser)
    @Optional()
    user2?: MatchUser
}