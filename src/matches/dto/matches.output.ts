import { Field, ID, ObjectType } from '@nestjs/graphql'
import { IsOptional } from 'class-validator'
import { IVisual } from 'src/user-choice/dto/user-choices.output'

@ObjectType()
export class MatchesOutput {
    @Field(() => ID)
    id: string

    @Field(() => String)
    userId: string

    @Field(() => String)
    matchUserId: string

    @Field(() => String)
    matchName: string

    @Field(() => String)
    gender: string

    @Field(() => String)
    age: string

    @Field(() => Date)
    createdAt: Date

    @Field(() => IVisual, { nullable: true })
    @IsOptional()
    visual?: IVisual
}
