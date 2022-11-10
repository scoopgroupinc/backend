import { Field, InputType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class BlockUserInput {
    @Field(() => String)
    @IsString()
    blockedUserId: string

    @Field(() => String)
    @IsString()
    blockerId: string
}
