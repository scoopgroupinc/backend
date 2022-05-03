import { Field, ID, InputType, ObjectType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@ObjectType()
export class UserPromptsOutput {
    @Field(() => ID)
    id?: string

    @Field()
    createdAt?: string

    @Field(() => String, { nullable: true })
    @IsNotEmpty()
    @IsString()
    userId: string

    @Field(() => String, { nullable: true })
    @IsNotEmpty()
    @IsString()
    promptId: string

    @Field(() => String, { nullable: true })
    @IsString()
    prompt?: string

    @Field(() => String, { nullable: true })
    @IsNotEmpty()
    answer: string
}
