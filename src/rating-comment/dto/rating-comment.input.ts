/* eslint-disable prettier/prettier */
import { InputType, Field, ID, ObjectType } from '@nestjs/graphql'
import { IsString, IsNotEmpty, IsOptional } from 'class-validator'

@ObjectType()
@InputType()
export class RatingCommentInput {
    @Field(() => ID, { nullable: true })
    id?: string

    @Field()
    @IsString()
    @IsNotEmpty()
    startTime?: string

    @Field()
    @IsString()
    @IsOptional()
    endTime?: string

    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    comment: string
}
