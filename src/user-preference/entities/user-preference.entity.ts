import {
    Entity,
    Unique,
    BaseEntity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
} from 'typeorm'
import { ObjectType, Field, ID } from '@nestjs/graphql'

export enum gender {
    male = 'male',
    female = 'female',
    bisexual = 'bisexual',
}

@Entity('user_preference')
@ObjectType()
@Unique(['userId'])
export class UserPreference extends BaseEntity {
    @Field(() => ID)
    @PrimaryColumn({ type: 'bigint' })
    userId: string

    @Field({ nullable: true })
    @CreateDateColumn({ type: 'timestamp' })
    createdAt?: string

    @Field(() => [String], { nullable: true })
    @Column('simple-array', { nullable: true, default: [] })
    heightRange?: string[]

    @Field(() => [String], { nullable: true })
    @Column('simple-array', { nullable: true, default: [] })
    ageRange?: string[]

    @Field(() => [String], { nullable: true })
    @Column('simple-array', { nullable: true, default: [] })
    gender?: string[]

    @Field({ nullable: false })
    @Column({ nullable: true, default: 30 })
    distance?: number

    @Field(() => [String], { nullable: true })
    @Column('simple-array', { nullable: true, default: [] })
    ethnicityPreferences?: string[]

    @Field(() => [String], { nullable: true })
    @Column('simple-array', { nullable: true, default: [] })
    sportsPreferences?: string[]
}
