import { Field, Float, InputType } from '@nestjs/graphql'
import { IsDecimal, IsNotEmpty, IsOptional, IsString } from 'class-validator'

@InputType()
export class FeedBackInput {
    @IsString()
    @IsNotEmpty()
    @Field(() => String)
    userId: string

    @IsString()
    @IsNotEmpty()
    @Field(() => String)
    deviceOS: string

    @IsString()
    @IsNotEmpty()
    @Field(() => String)
    appVersion: string

    @IsNotEmpty()
    @Field(() => Float)
    rating: number

    @IsString()
    @IsNotEmpty()
    @Field(() => String)
    issue: string

    @IsString()
    @IsNotEmpty()
    @Field(() => String)
    text: string

    @IsString()
    @IsOptional()
    @Field(() => String, { nullable: true })
    image?: string | null
}
