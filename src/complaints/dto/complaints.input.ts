import { Field, ID, InputType } from '@nestjs/graphql'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { complaint_reason, complaint_type } from '../entities/complaints.entity'

@InputType()
export class ComplaintsInput {
    @Field(() => ID)
    id?: string

    @Field(() => String)
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
    @IsEnum({ enum: complaint_reason })
    reason: complaint_reason

    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    comment: string

    @Field(() => String)
    @IsString()
    @IsEnum({ enum: complaint_type })
    type: complaint_type

    @Field(() => String)
    @IsString()
    contentId: string

    @Field(() => String, { nullable: true })
    media_file: string | null

    @Field()
    isClosed?: boolean
}
