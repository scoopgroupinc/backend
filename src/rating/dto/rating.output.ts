import { Field, Float, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class RatingOutput {
    @Field(() => String)
    contentId: string

    @Field(() => String)
    type: string

    @Field(() => Float, { nullable: true })
    Trustworty?: number

    @Field(() => Float, { nullable: true })
    Smart?: number

    @Field(() => Float, { nullable: true })
    Attractive?: number

    @Field(() => Float, { nullable: true })
    well_written?: number

    @Field(() => Float, { nullable: true })
    Informative?: number

    @Field(() => Float, { nullable: true })
    Engaging?: number

    @Field(() => Int, { nullable: true })
    total?: number

    @Field(() => String, { nullable: true })
    counts?: string

    @Field(() => [CommentOutput], { nullable: true })
    comments?: CommentOutput[]
}

@ObjectType()
export class CommentOutput {
    @Field()
    endTime?: string

    @Field(() => String)
    comment: string
}

@ObjectType()
export class AverageOutput {
    @Field(() => Float, { nullable: true })
    average: number

    @Field(() => Float, { nullable: true })
    count: number
}
