import { Field, ObjectType } from '@nestjs/graphql'
import { UserToken } from './user-token.schema'

@ObjectType()
export class HttpStatusType {
    @Field()
    message: string
    @Field()
    statusCode: number
    @Field()
    status: string
    @Field()
    data: UserToken
}
