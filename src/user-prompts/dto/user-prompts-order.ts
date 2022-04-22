import { Field, InputType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class UserPromptsOrder {
    @Field(() => String)
    @IsString()
    userId: string

    @Field(() => [String])
    userPromptIds: string[]
}
