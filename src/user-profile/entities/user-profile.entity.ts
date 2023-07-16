/* eslint-disable prettier/prettier */
import { Field, ObjectType, ID } from '@nestjs/graphql'
import {
    PrimaryColumn,
    Entity,
    Unique,
    BaseEntity,
    Column,
    CreateDateColumn,
} from 'typeorm'
import { IsNumber } from 'class-validator'

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
    @Column({ nullable: true })
    profilePhoto: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    birthday: string

    @Field(() => String, { nullable: true })
    @IsNumber()
    @Column({ nullable: true })
    height: string

    @Field(() => String, { nullable: true })
    @Column({ type: 'enum', enum: gender, nullable: true })
    gender: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    locationId: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    jobTitle: string

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
    promptIds: string[]
}
