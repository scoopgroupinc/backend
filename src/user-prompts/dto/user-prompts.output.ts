import { Field, ID, ObjectType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@ObjectType()
export class UserPromptsOutput {
    @Field(() => ID)
    id: string

    @Field()
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

type UserPromptMap = { [key: string]: UserPromptsOutput }

@ObjectType()
export class GetUserPromptsOutput {
    @Field(() => ObjectType, { nullable: true })
    userPrompts: UserPromptMap

    @Field(() => [String])
    promptIds: string[]
}
