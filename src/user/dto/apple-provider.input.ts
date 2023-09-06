import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AppleProviderInput {
    @Field()
    id: string

    @Field()
    name: string

    @Field()
    email: string
}
