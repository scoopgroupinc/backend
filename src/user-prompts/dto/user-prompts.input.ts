import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class UserPromptsInput {
    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    userId: string

    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    promptId: string

    @Field(() => String)
    @IsNotEmpty()
    answer: string

    @Field(() => Number)
    @IsNotEmpty()
    order: number
}
