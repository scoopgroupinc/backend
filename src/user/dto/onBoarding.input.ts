import { InputType, Field } from '@nestjs/graphql'
import { IsOptional, IsString } from 'class-validator'

@InputType()
export class OnBoardInput {
    @Field()
    @IsString()
    userId: string

    @Field({ nullable: true })
    @IsOptional()
    isOnboard?: boolean

    @Field({ nullable: true })
    @IsOptional()
    isVoteOnboard?: boolean
}
