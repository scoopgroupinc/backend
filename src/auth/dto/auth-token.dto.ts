import { ObjectType, Field } from '@nestjs/graphql'
import { User } from '../../user/entities/user.entity'

@ObjectType()
export class UserToken {
    @Field()
    token: string

    @Field()
    user: User
}
