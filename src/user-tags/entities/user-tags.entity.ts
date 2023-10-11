import { Field, ID, ObjectType } from '@nestjs/graphql'
import { UserTagsTypeVisibleEntity } from 'src/user-tags-type-visible/entities/user-tags-type-visible.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

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

    @Field(() => Number, { nullable: true })
    @Column({ nullable: true })
    tagId: number | null

    @Field(() => UserTagsTypeVisibleEntity)
    @ManyToOne(
        () => UserTagsTypeVisibleEntity,
        (UserTagsTypeVisibleEntity) => UserTagsTypeVisibleEntity.userTags
    )
    userTagsTypeVisible: UserTagsTypeVisibleEntity
}
