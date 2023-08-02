import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class FeedbackGroupInput {
    @Field(() => String)
    id: string

    @Field()
    createdAt?: Date

    @Field(() => String)
    userId: string

    @Field(() => String, { nullable: true })
    raterId?: string

    @Field()
    templateId: string
}
