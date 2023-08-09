import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class PersonalityFeedbackInput {
    @Field()
    personality: string
}
