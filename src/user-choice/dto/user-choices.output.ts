import { Field, ObjectType } from '@nestjs/graphql'
import { UserPromptsOutput } from 'src/user-prompts/dto/user-prompts.output'
import { UserTagsTypeVisibleEnity } from 'src/user-tags-type-visible/entities/user-tags-type-visible.entity'

@ObjectType()
export class UserChoiceOutput {
    @Field(() => String)
    id?: string

    @Field(() => String)
    swiperId: string

    @Field(() => String)
    shownUserId: string

    @Field(() => String)
    swiperChoice: string

    @Field(() => String)
    age: string

    @Field(() => Date)
    createdAt: Date

    @Field(() => String)
    gender: string

    @Field(() => String)
    choiceName: string

    @Field(() => UserPromptsOutput)
    prompt: UserPromptsOutput

    @Field(() => [UserTagsTypeVisibleEnity])
    profile: UserTagsTypeVisibleEnity[]
}
