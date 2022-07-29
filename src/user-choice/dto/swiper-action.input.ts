import { Field, ID, InputType } from '@nestjs/graphql'

@InputType()
export class SwiperActionInput {
    @Field(() => ID)
    id: string

    @Field(() => String)
    shownUserId: string

    @Field(() => String)
    swiperChoice: string
}
