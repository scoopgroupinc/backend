import { Field, ID, InputType } from '@nestjs/graphql'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { complaint_reason, complaint_type } from '../entities/complaints.entity'

@InputType()
export class ComplaintsOutput {
    @Field(() => ID)
    id?: string

    @Field(() => String)
    createdAt: string

    @Field(() => String)
    reporterId: string

    @Field(() => String)
    accusedId: string

    @Field(() => String)
    reason: string

    @Field(() => String)
    comment: string

    @Field(() => String)
    type: string

    @Field(() => String)
    contentId: string

    @Field(() => String, { nullable: true })
    media_file: string | null

    @Field(() => Boolean)
    isClosed?: boolean
}
