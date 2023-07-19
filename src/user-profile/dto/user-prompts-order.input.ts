import { Field, InputType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class IUserPromptsOrder {
    @Field(() => String)
    @IsString()
    userId: string

    @Field(() => [String])
    promptIds: string[]
}
