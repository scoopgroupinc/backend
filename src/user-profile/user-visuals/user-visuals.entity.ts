import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { UserProfile } from '../entities/user-profile.entity'

@Entity('user_visuals')
export class UserVisuals extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string

    @CreateDateColumn()
    createdAt: string

    @Column()
    userId: string

    @Column()
    videoOrPhoto: string

    @Column({ nullable: true })
    blobName: string

    @Column({ nullable: true })
    visualPromptId: string

    @Column({ nullable: true })
    deletedAt: string | null

    @Column({ nullable: true })
    description: string

    @Column({ default: true })
    isVisible: boolean

    @ManyToOne(() => UserProfile, (userProfile) => userProfile.visuals)
    userProfile: UserProfile
}
