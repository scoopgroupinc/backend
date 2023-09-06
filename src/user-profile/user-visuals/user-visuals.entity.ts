import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    // Relation,
} from 'typeorm'
import { UserProfile } from '../user-profile.entity'
import { Field, ID, ObjectType } from '@nestjs/graphql'

@Entity('user_visuals')
@ObjectType()
export class UserVisuals extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    @Field(() => ID)
    id: string

    @Field(() => String, { nullable: true })
    @CreateDateColumn()
    createdAt: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    userId: string

    @Field(() => String, { nullable: true })
    @Column()
    videoOrPhoto?: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    blobName: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    visualPromptId: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    deletedAt?: string | null

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    description?: string

    @Field(() => Boolean, { nullable: true })
    @Column({ default: true })
    isVisible: boolean

    @ManyToOne(() => UserProfile, (userProfile) => userProfile.visuals)
    @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
    @Field(() => UserProfile, { nullable: true })
    userProfile?: UserProfile // Relation<UserProfile>;
}
