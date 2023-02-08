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
    user1: MatchUser

    @Field(() => MatchUser)
    user2: MatchUser
}