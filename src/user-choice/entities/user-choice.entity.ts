import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

export enum swiper_choice {
    yes = 'yes',
    no = 'no',
    unknown = 'unknown',
}

@Entity('user-choice')
export class UserChoice extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string

    @CreateDateColumn()
    createdAt: Date

    @Column({ nullable: false, type: 'bigint' })
    swiperId: string

    @Column({ nullable: false, type: 'bigint' })
    shownUserId: string

    @Column({
        nullable: false,
        type: 'varchar',
        enum: swiper_choice,
        default: 'unknown',
    })
    swiperChoice: string

    @UpdateDateColumn()
    swipedAt: Date
}
