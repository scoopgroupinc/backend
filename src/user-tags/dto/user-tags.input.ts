import { Field, ID, InputType, registerEnumType } from '@nestjs/graphql'
import { tag_type_visible } from 'src/common/enums'

registerEnumType(tag_type_visible, {
    name: 'tag_type_visible',
})

@InputType({
    description: 'Input type for user tags',
})
export class UserTagsInput {
    @Field(() => ID)
    userId: string

    @Field(() => String)
    tagName: string

    @Field(() => tag_type_visible)
    tagType: tag_type_visible
}
