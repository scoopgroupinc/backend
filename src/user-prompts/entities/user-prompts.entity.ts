import { Field, ID, ObjectType } from '@nestjs/graphql'
import { UserProfile } from 'src/user-profile/user-profile.entity'
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('user_prompts')
@ObjectType()
export class UserPrompts extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string

    @Field(() => String)
    @CreateDateColumn()
    createdAt: string

    @Field(() => String)
    @Column({ type: 'bigint' })
    userId: string

    @Field(() => String)
    @Column({ type: 'bigint' })
    promptId: string

    @Field(() => String)
    @Column({ nullable: true })
    answer: string

    // Add the relationship decorator for many-to-one with UserProfile
    @Field(() => UserProfile)
    @ManyToOne(() => UserProfile, (userProfile) => userProfile.prompts)
    @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
    userProfile: UserProfile
}
