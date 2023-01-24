import { Field, InputType } from '@nestjs/graphql'
import { IsString, IsOptional } from 'class-validator'

@InputType()
export class UserPromptsOrder {
    @Field(() => String)
    @IsString()
    userId: string

    @Field(() => [String])
    userPromptIds: string[]
}

@InputType()
export class IGetPromptOrder {
    @Field(() => String)
    @IsString()
    userId: string

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    raterId?: string | undefined
}
