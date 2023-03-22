import { Field, ObjectType } from '@nestjs/graphql'
import { IsOptional } from 'class-validator'

@ObjectType()
export class IGroupMembers {
    @Field(() => String)
    id: string

    @Field(() => String)
    userId: string

    @Field(() => String)
    name: string

    @Field(() => String)
    gender: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    visual: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    age: string
}
