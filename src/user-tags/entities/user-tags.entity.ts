import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql'
import { tag_type } from 'src/common/enums'
import { UserTagsTypeVisibleEntity } from 'src/user-tags-type-visible/entities/user-tags-type-visible.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

registerEnumType(tag_type, {
    name: 'tag_type',
})

@ObjectType({
    description: 'Entity for user tags',
})
@Entity('user_tags')
export class UserTagsEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string

    @Field(() => ID)
    @Column()
    userId: string

    @Field(() => String)
    @Column()
    tagName: string

    @Field(() => String)
    @Column()
    tagType: string

    @Field(() => UserTagsTypeVisibleEntity)
    @ManyToOne(
        () => UserTagsTypeVisibleEntity,
        (userTagsTypeVisibleEntity) => userTagsTypeVisibleEntity.userTags
    )
    userTagsTypeVisible: UserTagsTypeVisibleEntity
}
