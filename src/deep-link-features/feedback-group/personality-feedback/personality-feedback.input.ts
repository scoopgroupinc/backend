import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class PersonalityFeedbackInput {
    @Field(() => String)
    id?: string

    @Field()
    personality: string

    @Field()
    feedbackGroupId: string
}
