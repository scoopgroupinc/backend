import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class UserPromptInput {
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

@InputType()
export class UserPromptInputsFindLatest {
    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    userId: string

    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    promptId: string
}
