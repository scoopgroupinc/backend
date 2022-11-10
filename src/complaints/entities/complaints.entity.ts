import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm'

// export enum complaint_reason {
//     inappropriate = 'inappropriate',
// }

export enum complaint_type {
    user_prompts = 'user_prompts',
    visual_prompts = 'visual_prompts',
    message = 'messages',
    block_user = 'block_user',
    report_user = 'report_user',
}

@Entity('user_complaints')
@ObjectType()
export class Complaints extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string

    @Field(() => String)
    @Column()
    @CreateDateColumn()
    createdAt: string

    @Field(() => String)
    @Column({ type: 'bigint' })
    reporterId: string

    @Field(() => String)
    @Column({ type: 'bigint' })
    accusedId: string

    @Field(() => String)
    @Column()
    reason: string

    @Field(() => String)
    @Column()
    comment: string

    @Field(() => String)
    @Column({ type: 'enum', enum: complaint_type })
    type: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    contentId: string | null

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    media_file: string | null

    @Field(() => Boolean)
    @Column({ default: false, type: Boolean })
    isClosed: boolean
}
