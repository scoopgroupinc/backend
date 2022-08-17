import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm'

export enum complaint_reason {
    inappropriate = 'inappropriate',
}

export enum complaint_type {
    user_prompts = 'user_prompts',
    visual_prompts = 'visual_prompts',
    message = 'messages',
}

@Entity()
@ObjectType()
export class Complaints extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string

    @Field(() => String)
    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Field(() => String)
    @Column({ type: 'bigint' })
    reporterId: string

    @Field(() => String)
    @Column({ type: 'bigint' })
    accusedId: string

    @Field(() => String)
    @Column({ type: 'varchar', enum: complaint_reason })
    reason: string

    @Field(() => String)
    @Column({ type: 'varchar' })
    comment: string

    @Field(() => String)
    @Column({ type: 'varchar', enum: complaint_type })
    type: string

    @Field(() => String)
    @Column({ type: 'bigint' })
    contentId: string

    @Field(() => String)
    @Column({ type: 'varchar', nullable: true })
    media_file: string | null

    @Field(() => Boolean)
    @Column({ default: false, type: Boolean })
    isClosed: boolean
}
