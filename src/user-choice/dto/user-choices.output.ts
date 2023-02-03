import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserChoiceOutput {
    @Field(() => String)
    id?: string

    @Field(() => String)
    swiperId: string

    @Field(() => String)
    shownUserId: string

    @Field(() => String)
    swiperChoice: string

    @Field(() => String)
    age: string

    @Field(() => Date)
    createdAt: Date

    @Field(() => String)
    gender: string

    @Field(() => String)
    choiceName: string
}
