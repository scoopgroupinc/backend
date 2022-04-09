/* eslint-disable prettier/prettier */
import { InputType, Field, ID } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class RatingCriteriasInput {
    @Field(() => ID)
    id: string

    @Field(() => String)
    @IsString()
    criteriaId: string

    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    title: string

    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    description: string

    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    type: string
}
