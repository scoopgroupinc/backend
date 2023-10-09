import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql'
import { tag_type_visible } from 'src/common/enums'
import { UserProfile } from 'src/user-profile/user-profile.entity'
import { UserTagsEntity } from 'src/user-tags/entities/user-tags.entity'
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'

registerEnumType(tag_type_visible, {
    name: 'tag_type_visible',
})

@ObjectType({
    description: 'User tags type visible',
})
@Entity('user_tags_type_visible')
export class UserTagsTypeVisibleEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string

    @Field(() => ID)
    @Column({ type: 'bigint' })
    userId: string

    @Field(() => String)
    @Column()
    tagType?: string

    @Field(() => Boolean)
    @Column({ default: true })
    visible?: boolean

    @Field(() => [UserTagsEntity])
    @OneToMany(
        () => UserTagsEntity,
        (userTagsEntity) => userTagsEntity.userTagsTypeVisible
    )
    userTags?: UserTagsEntity[]

    @ManyToOne(() => UserProfile, (userProfile) => userProfile.tags)
    @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
    @Field(() => UserProfile)
    userProfile?: UserProfile
}
