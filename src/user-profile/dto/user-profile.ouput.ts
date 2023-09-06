import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class GetUserPromptIdsOutput {
    @Field(() => [String])
    promptIds: string[]
}
