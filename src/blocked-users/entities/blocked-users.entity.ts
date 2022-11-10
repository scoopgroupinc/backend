import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('blocked-users')
@ObjectType()
export class BlockedUsers extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string

    @Field(() => String)
    @Column({ type: 'bigint' })
    blockedUserId: string

    @Field(() => String)
    @Column({ type: 'bigint' })
    blockerId: string

    @Field(() => String)
    @CreateDateColumn()
    createdAt: string
}
