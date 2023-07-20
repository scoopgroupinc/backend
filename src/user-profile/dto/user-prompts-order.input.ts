import { Field, InputType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class UserPromptsOrderInput {
    @Field(() => String)
    @IsString()
    userId: string

    @Field(() => [String])
    promptIds: string[]
}
