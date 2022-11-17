import { Field, ObjectType } from '@nestjs/graphql'
import { IsBoolean, IsString } from 'class-validator'

@ObjectType()
export class BlockUserOutput {
    @Field(() => String)
    userId: string

    @Field(() => Boolean)
    blocked: boolean
}
