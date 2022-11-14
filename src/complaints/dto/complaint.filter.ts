import { Field, Float, InputType, Int } from '@nestjs/graphql'
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

@InputType()
export class ComplaintsFilter {
    @IsNumber()
    @IsOptional()
    @Field(() => Int)
    page: number

    @IsString()
    @IsOptional()
    @Field(() => String, { nullable: true })
    reporterId?: string

    @IsString()
    @IsOptional()
    @Field(() => String, { nullable: true })
    accusedId?: string

    @IsString()
    @IsOptional()
    @Field(() => String, { nullable: true })
    type?: string

    @IsBoolean()
    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    isClosed?: boolean

    @IsString()
    @IsOptional()
    @Field(() => String, { nullable: true })
    fromDate?: string

    @IsString()
    @IsOptional()
    @Field(() => String, { nullable: true })
    toDate?: string
}
