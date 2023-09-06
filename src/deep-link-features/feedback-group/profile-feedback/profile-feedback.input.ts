import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class ProfileFeedbackInput {
    @Field()
    description: string

    @Field()
    name: string
}
