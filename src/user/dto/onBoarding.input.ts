import { InputType, Field } from '@nestjs/graphql'
import { IsOptional, IsString } from 'class-validator'

@InputType()
export class OnBoardInput {
    @Field()
    @IsString()
    userId: string

    @Field({ nullable: true })
    @IsOptional()
    isOnboarded?: boolean

    @Field({ nullable: true })
    @IsOptional()
    isVoteOnboarded?: boolean
}
