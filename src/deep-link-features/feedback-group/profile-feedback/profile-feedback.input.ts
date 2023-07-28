import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class ProfileFeedbackInput {
    id?: string

    @Field()
    createdAt?: Date

    @Field()
    description: string

    @Field()
    name: string

    @Field()
    feedbackGroupId: string
}
