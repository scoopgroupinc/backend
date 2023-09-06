import { Field, ID, ObjectType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@ObjectType()
export class UserPromptOutput {
    @Field(() => ID)
    id: string

    @Field(() => String, { nullable: true })
    createdAt?: string

    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    userId: string

    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    promptId: string

    @Field(() => String, { nullable: true })
    @IsString()
    prompt?: string

    @Field(() => String)
    @IsNotEmpty()
    answer: string
}

@ObjectType()
export class GetUserPromptsOutput {
    @Field(() => [UserPromptOutput], { nullable: true })
    userPrompts: UserPromptOutput[]

    @Field(() => [String])
    promptIds: string[]
}

@ObjectType()
export class GetUserPromptsOrder {
    @Field(() => [String])
    promptIds: string[]
}
