import { Field, Float, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class RatingOutput {
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

    @Field(() => Int)
    total?: number
}

@ObjectType()
export class AverageOutput {
    @Field(() => Float, { nullable: true })
    average: number

    @Field(() => Float, { nullable: true })
    count: number
}
