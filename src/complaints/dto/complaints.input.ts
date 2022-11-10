import { Field, ID, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { complaint_type } from '../entities/complaints.entity'

@InputType()
export class ComplaintsInput {
    @Field(() => ID, { nullable: true })
    @IsOptional()
    id?: string

    @Field(() => String, { nullable: true })
    createdAt: string

    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    reporterId: string

    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    accusedId: string

    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    reason: string

    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    comment: string

    @Field(() => String)
    @IsString()
    type: complaint_type

    @Field(() => String, { nullable: true })
    @IsOptional()
    contentId?: string | null

    @Field(() => String, { nullable: true })
    media_file: string | null

    @Field(() => Boolean, { nullable: true })
    @IsOptional()
    isClosed?: boolean
}
