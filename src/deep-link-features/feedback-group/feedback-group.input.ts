import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class FeedbackGroupInput {
    @Field(() => String)
    userId: string

    @Field(() => String, { nullable: true })
    raterId?: string

    @Field(() => String, { nullable: true })
    templateId?: string
}
