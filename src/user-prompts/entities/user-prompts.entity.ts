import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
@ObjectType()
export class UserPrompts extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date

    @Field(() => String)
    @Column({ type: 'bigint' })
    userId: string

    @Field(() => String)
    @Column({ type: 'bigint' })
    promptId: string

    @Field(() => String)
    @Column({ nullable: true })
    answer: string
}
