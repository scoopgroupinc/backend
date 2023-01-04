import { Field, ID, InputType, registerEnumType } from '@nestjs/graphql'
import { tag_type } from 'src/common/enums'
import { UserTagsInput } from 'src/user-tags/dto/user-tags.input'

registerEnumType(tag_type, {
    name: 'tag_type',
})

@InputType({
    description: 'Input type for user tags type visible',
})
export class UserTagsTypeVisibleInput {
    @Field(() => ID)
    userId: string

    @Field(() => Boolean)
    visible: boolean

    @Field(() => String)
    emoji: string

    @Field(() => tag_type)
    tagType: tag_type

    @Field(() => [UserTagsInput], { nullable: true })
    userTags?: UserTagsInput[]
}
