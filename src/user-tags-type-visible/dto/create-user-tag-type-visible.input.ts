import { Field, ID, InputType, registerEnumType } from '@nestjs/graphql'
import { tag_type_visible } from 'src/common/enums'
import { UserTagsInput } from 'src/user-tags/dto/user-tags.input'

registerEnumType(tag_type_visible, {
    name: 'tag_type_visible',
})

@InputType({
    description: 'Input type for user tags type visible',
})
export class UserTagsTypeVisibleInput {
    @Field(() => ID)
    userId: string

    @Field(() => Boolean)
    visible: boolean

    @Field(() => tag_type_visible)
    tagType: tag_type_visible

    @Field(() => [UserTagsInput], { nullable: true })
    userTags?: UserTagsInput[]
}
