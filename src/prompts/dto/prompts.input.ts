import { InputType, Field, ID } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'

@InputType()
export class PromptsInput {
    @Field(() => ID)
    id: string

    @Field(() => String)
    @IsNotEmpty()
    prompt: string

    @Field(() => String)
    @IsNotEmpty()
    type: string

    @Field(() => String, { nullable: true })
    sample_answer?: string
}
