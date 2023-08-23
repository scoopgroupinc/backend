import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    BaseEntity,
    OneToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm'
import { ObjectType, Field } from '@nestjs/graphql' // Import the Field decorator
import { PersonalityFeedback } from './personality-feedback/personality-feedback.entity'
import { ProfileFeedback } from './profile-feedback/profile-feedback.entity'

@Entity('feedback_group')
@ObjectType() // Decorate the class with @ObjectType() to expose it in GraphQL
export class FeedbackGroup extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    @Field(() => String)
    id: string

    @CreateDateColumn()
    @Field()
    createdAt: Date

    @Column('bigint')
    @Field(() => String)
    userId: string

    @Column('bigint', { nullable: true })
    @Field(() => String, { nullable: true })
    raterId?: string

    @Column()
    @Field()
    templateId: string

    @OneToOne(
        () => ProfileFeedback,
        (profileFeedback) => profileFeedback.feedbackGroup
    )
    @Field(() => ProfileFeedback, { nullable: true }) // Nullable if it can be null
    profileFeedback: ProfileFeedback

    @OneToMany(
        () => PersonalityFeedback,
        (personalityFeedback) => personalityFeedback.feedbackGroup
    )
    @Field(() => [PersonalityFeedback], { nullable: true })
    personalityFeedbacks: PersonalityFeedback[] // This field will hold the related PersonalityFeedback entities
}
