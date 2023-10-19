import { InputType, Field } from '@nestjs/graphql'
import { Validate } from 'class-validator'
import { EitherOrValidator } from './either-or.validator' // Adjust the import based on your file structure

@InputType()
export class FeedbackGroupInput {
    @Field(() => String, { nullable: true })
    @Validate(EitherOrValidator, ['uuid'])
    userId: string | null

    @Field(() => String, { nullable: true })
    uuid: string | null

    @Field(() => String, { nullable: true })
    raterId?: string | null

    @Field(() => String, { nullable: true })
    templateId?: string | null
}
