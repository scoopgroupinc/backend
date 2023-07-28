/* eslint-disable prettier/prettier */
import { Field, ObjectType, ID } from '@nestjs/graphql'
import {
    PrimaryColumn,
    Entity,
    Unique,
    BaseEntity,
    Column,
    CreateDateColumn,
    OneToMany,
} from 'typeorm'
import { IsNumber } from 'class-validator'
import { UserPrompts } from 'src/user-prompts/entities/user-prompts.entity'
import { UserTagsTypeVisibleEntity } from 'src/user-tags-type-visible/entities/user-tags-type-visible.entity'

export enum educationLevels {
    highSchool = 'high School',
    graduate = 'graduate',
    postGraduate = 'post graduate',
    notToSay = 'prefer not to say',
}

export enum gender {
    male = 'male',
    female = 'female',
}

@Entity('user_profile')
@ObjectType()
@Unique(['userId'])
export class UserProfile extends BaseEntity {
    @Field(() => ID)
    @PrimaryColumn({ type: 'bigint' })
    userId: string

    @Field(() => String, { nullable: true })
    @CreateDateColumn()
    createdAt: Date

    @Field(() => String, { nullable: true })
<<<<<<< HEAD
    displayName?: string
=======
    displayName: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    profilePhoto: string
>>>>>>> c42c81d (ensure queries can fetch related tables in one query)

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    profilePhoto?: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    birthday?: string

    @Field(() => String, { nullable: true })
    @IsNumber()
    @Column({ nullable: true })
    height?: string

    @Field(() => String, { nullable: true })
    @Column({ type: 'enum', enum: gender, nullable: true })
    gender?: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    locationId?: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    jobTitle?: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    company?: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    homeTown?: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    school?: string

    @Field(() => [String], { nullable: true })
    @Column({ type: 'varchar', array: true, nullable: true, default: [] })
    promptIds?: string[]

    @Field(() => [UserPrompts], { nullable: true })
    @OneToMany(() => UserPrompts, (userPrompts) => userPrompts.userProfile)
    prompts?: UserPrompts[]

    @Field(() => [UserTagsTypeVisibleEntity], { nullable: true })
    @OneToMany(
        () => UserTagsTypeVisibleEntity,
        (userTagsTypeVisibleEntity) => userTagsTypeVisibleEntity.userProfile
    )
    tags?: UserTagsTypeVisibleEntity[]
}
