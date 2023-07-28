import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class UserLinkOutput {
    @Field()
    id: string

    @Field()
    userId: string

    @Field()
    createdAt: Date

    @Field()
    state: boolean

    @Field()
    templateId: string
}
