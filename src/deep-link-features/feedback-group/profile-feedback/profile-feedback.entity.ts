import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    JoinColumn,
    OneToOne,
} from 'typeorm'
import { ObjectType, Field } from '@nestjs/graphql'
import { FeedbackGroup } from '../feedback-group.entity'

@Entity('profile_feedback')
@ObjectType()
export class ProfileFeedback {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    @Field(() => String)
    id: string

    @CreateDateColumn()
    @Field()
    createdAt?: Date

    @Column()
    @Field()
    description: string

    @Column()
    @Field()
    name: string

    @Column()
    @Field()
    feedbackGroupId?: string

    @OneToOne(() => FeedbackGroup)
    @JoinColumn({ name: 'feedbackGroupId', referencedColumnName: 'id' })
    feedbackGroup: FeedbackGroup
}
