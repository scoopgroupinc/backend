import { Field, Float, InputType, Int } from '@nestjs/graphql'
import { IsNumber, IsOptional, IsString } from 'class-validator'

@InputType()
export class FeedBackFilter {
    @IsString()
    @IsOptional()
    @Field(() => String, { nullable: true })
    deviceOS?: string

    @IsString()
    @IsOptional()
    @Field(() => String, { nullable: true })
    appVersion?: string

    @IsString()
    @IsOptional()
    @Field(() => String, { nullable: true })
    issue?: string

    @IsString()
    @IsOptional()
    @Field(() => String, { nullable: true })
    fromDate?: string

    @IsString()
    @IsOptional()
    @Field(() => String, { nullable: true })
    toDate?: string

    @IsNumber()
    @IsOptional()
    @Field(() => Int)
    page: number

    @IsString()
    @IsOptional()
    @Field(() => String, { nullable: true })
    userId: string

    @IsOptional()
    @Field(() => Float, { nullable: true })
    rating?: number
}
