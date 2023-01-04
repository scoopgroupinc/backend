import { Field, ID, InputType, registerEnumType } from '@nestjs/graphql'
import { tag_type } from 'src/common/enums'

registerEnumType(tag_type, {
    name: 'tag_type',
})

@InputType({
    description: 'Input type for user tags',
})
export class UserTagsInput {
    @Field(() => ID)
    userId: string

    @Field(() => String)
    tagName: string

    @Field(() => tag_type)
    tagType: tag_type
}
