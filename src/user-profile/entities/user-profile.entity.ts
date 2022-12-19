/* eslint-disable prettier/prettier */
import { Field, ObjectType, ID, InputType, Float } from '@nestjs/graphql'
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

    @Field(() => Boolean, { nullable: true })
    @Column({ default: true, type: 'boolean' })
    jobTitleVisible: boolean

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    company?: string

    @Field(() => Boolean, { nullable: true })
    @Column({ type: 'boolean', default: true })
    companyVisible?: boolean

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    homeTown?: string

    @Field(() => Boolean, { nullable: true })
    @Column({ type: 'boolean', default: true })
    homeTownVisible?: boolean

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    school?: string

    @Field(() => Boolean, { nullable: true })
    @Column({ type: 'boolean', default: true })
    schoolVisible: boolean

    @Field(() => String, { nullable: true })
    @Column({ type: 'enum', enum: educationLevels, nullable: true })
    educationLevel: string

    @Field(() => Boolean, { nullable: true })
    @Column({ type: 'boolean', default: true })
    educationLevelVisible?: boolean

    @Field(() => [String], { nullable: true })
    @Column('simple-array', { nullable: true, default: [] })
    ethinicity?: string[]

    @Field(() => Boolean, { nullable: true })
    @Column({ type: 'boolean', default: true })
    ethinicityVisible?: boolean

    @Field(() => [String], { nullable: true })
    @Column('simple-array', { nullable: true, default: [] })
    sports?: string[]

    @Field(() => Boolean, { nullable: true })
    @Column({ type: 'boolean', default: true })
    sportsVisible?: boolean

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    smoking?: string

    @Field(() => Boolean, { nullable: true })
    @Column({ type: 'boolean', default: true })
    smokingVisible?: boolean

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    cannabis?: string

    @Field(() => Boolean, { nullable: true })
    @Column({ type: 'boolean', default: true })
    cannabisVisible?: boolean

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    alcohol?: string

    @Field(() => Boolean, { nullable: true })
    @Column({ type: 'boolean', default: true })
    alcoholVisible?: boolean

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    drugs?: string

    @Field(() => Boolean, { nullable: true })
    @Column({ type: 'boolean', default: true })
    drugsVisible?: boolean

    @Field(() => [String], { nullable: true })
    @Column('simple-array', { nullable: true, default: [] })
    diet?: string[]

    @Field(() => Boolean, { nullable: true })
    @Column({ type: 'boolean', default: true })
    dietVisible?: boolean

    @Field(() => [String], { nullable: true })
    @Column('simple-array',{ nullable: true, default: []  })
    languages?: string[]

    @Field(() => Boolean, { nullable: true })
    @Column({ type: 'boolean', default: true })
    languagesVisible?: boolean

    @Field(() => [String], { nullable: true })
    @Column('simple-array', { nullable: true, default: [] })
    musicGenre?: string[]

    @Field(() => Boolean, { nullable: true })
    @Column({ type: 'boolean', default: true })
    musicGenreVisible?: boolean

    @Field(() => [String], { nullable: true })
    @Column('simple-array', { nullable: true, default: [] })
    creativeOulet?: string[]

    @Field(() => Boolean, { nullable: true })
    @Column({ type: 'boolean', default: true })
    creativeOuletVisible?: boolean

    @Field(() => [String], { nullable: true })
    @Column('simple-array', { nullable: true, default: [] })
    religions?: string[]

    @Field(() => Boolean, { nullable: true })
    @Column({ type: 'boolean', default: true })
    religionsVisible?: boolean

    @Field(() => [String], { nullable: true })
    @Column('simple-array', { nullable: true, default: [] })
    religiousPractice?: string[]

    @Field(() => String, { nullable: true })
    @Column({ type: 'boolean', default: true })
    religiousPracticeVisible?: boolean

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    zodiac?: string

    @Field(() => Boolean, { nullable: true })
    @Column({ type: 'boolean', default: true })
    zodiacVisible?: boolean

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    meyerBriggs?: string

    @Field(() => Boolean, { nullable: true })
    @Column({ type: 'boolean', default: true })
    meyerBriggsVisible?: boolean

    @Field(() => [String], { nullable: true })
    @Column('simple-array', { nullable: true, default: [] })
    characteristics?: string[]

    @Field(() => Boolean, { nullable: true })
    @Column({ type: 'boolean', default: true })
    characteristicsVisible?: boolean

    @Field({ nullable: true })
    @Column({ nullable: true })
    politics?: string

    @Field({ nullable: true })
    @Column({ type: 'boolean', default: true })
    politicsVisible?: boolean

    @Field({ nullable: true })
    @Column({ nullable: true })
    parentingGoal?: string

    @Field({ nullable: true })
    @Column({ type: 'boolean', default: true })
    parentingGoalVisible?: boolean

    @Field(() => [String], { nullable: true })
    @Column('simple-array', { nullable: true, default: [] })
    relationshipGoals?: string[]

    @Field({ nullable: true })
    @Column({ type: 'boolean', default: true })
    relationshipGoalsVisible?: boolean

    @Field(() => [String], { nullable: true })
    @Column('simple-array', { nullable: true, default: [] })
    relationshipTypes?: string[]

    @Field({ nullable: true })
    @Column({ type: 'boolean', default: true })
    relationshipTypesVisible?: boolean

    @Field(() => [String], { nullable: true })
    @Column('simple-array', { nullable: true, default: [] })
    pets?: string[]

    @Field({ nullable: true })
    @Column({ type: 'boolean', default: true })
    petsVisible?: boolean

    @Field(() => [String],{ nullable:true})
    @Column('simple-array', { nullable: true, default: []})
    booksGenre?: string[]

    @Field({ nullable: true })
    @Column({ type: 'boolean', default: true })
    booksGenreVisible?: boolean

    @Field(() => [String],{ nullable:true})
    @Column('simple-array', { nullable: true, default: []})
    stayingIn?: string[]

    @Field({ nullable: true })
    @Column({ type: 'boolean', default: true })
    stayingInVisible?: boolean

    @Field(() => [String],{ nullable:true})
    @Column('simple-array', { nullable: true, default: []})
    goingOut?: string[]

    @Field({ nullable: true })
    @Column({ type: 'boolean', default: true })
    goingOutVisible?: boolean

    @Field(() => [String],{ nullable:true})
    @Column('simple-array', { nullable: true, default: []})
    beverages?: string[]

    @Field({ nullable: true })
    @Column({ type: 'boolean', default: true })
    beveragesVisible?: boolean

    @Field(() => [String],{ nullable:true})
    @Column('simple-array', { nullable: true, default: []})
    food?: string[]

    @Field({ nullable: true })
    @Column({ type: 'boolean', default: true })
    foodVisible?: boolean
}
