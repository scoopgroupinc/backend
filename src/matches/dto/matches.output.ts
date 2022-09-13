import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class MatchesOutput {
    @Field(() => ID)
    id: string

    @Field(() => String)
    userId: string

    @Field(() => String)
    matchedUserId: string

    @Field(() => String)
    matchName: string

    @Field(() => String)
    gender: string

    @Field(() => String)
    age: string

    @Field(() => Date)
    createdAt: Date
}
