import { Field, ObjectType, ID } from '@nestjs/graphql'
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('matches')
@ObjectType()
export class Matches extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date

    @Field(() => String)
    @Column({ nullable: true, type: 'bigint' })
    firstSwiper: string

    @Field(() => String)
    @Column({ nullable: true, type: 'bigint' })
    secondSwiper: string

    @Field(() => Boolean)
    @Column({ type: 'boolean', default: true })
    active: boolean
}
