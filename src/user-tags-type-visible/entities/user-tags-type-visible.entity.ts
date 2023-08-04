import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql'
import { tag_type } from 'src/common/enums'
import { UserProfile } from 'src/user-profile/entities/user-profile.entity'
import { UserTagsEntity } from 'src/user-tags/entities/user-tags.entity'
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'

registerEnumType(tag_type, {
    name: 'tag_type',
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

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    emoji?: string

    @Field(() => String)
    @Column()
    tagType: string

    @Field(() => Boolean)
    @Column({ default: true })
    visible: boolean

    @Field(() => [UserTagsEntity], { nullable: true })
    @OneToMany(
        () => UserTagsEntity,
        (userTagsEntity) => userTagsEntity.userTagsTypeVisible
    )
    userTags: UserTagsEntity[]

    @ManyToOne(() => UserProfile, (userProfile) => userProfile.tags)
    @JoinColumn({ name: 'userId' })
    @Field(() => UserProfile)
    userProfile: UserProfile
}
