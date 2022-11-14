import { Field, ID, InputType, ObjectType } from '@nestjs/graphql'

@ObjectType()
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

    @Field(() => String, { nullable: true })
    contentId?: string

    @Field(() => String, { nullable: true })
    media_file: string | null

    @Field(() => Boolean)
    isClosed?: boolean
}
