import { Field, ID, InputType, ObjectType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class UserPromptsInput {
    // @Field(() => ID)
    // id?: string

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
}
