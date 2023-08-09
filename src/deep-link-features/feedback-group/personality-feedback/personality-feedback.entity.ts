import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm'
import { ObjectType, Field } from '@nestjs/graphql'
import { FeedbackGroup } from '../feedback-group.entity'

@Entity('personality_feedback')
@ObjectType()
export class PersonalityFeedback {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    @Field(() => String)
    id?: string

    @CreateDateColumn()
    @Field()
    createdAt?: Date

    @Column()
    @Field()
    personality: string

    @Column()
    @Field()
    feedbackGroupId?: string

    @ManyToOne(
        () => FeedbackGroup,
        (feedbackGroup) => feedbackGroup.personalityFeedbacks
    )
    @JoinColumn({ name: 'feedbackGroupId', referencedColumnName: 'id' })
    @Field(() => FeedbackGroup)
    feedbackGroup: FeedbackGroup
}
