import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
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

    @Field(() => Number)
    @Column({ default: '99' })
    order: number
}
