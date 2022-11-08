import { Field, Float, ID, ObjectType } from '@nestjs/graphql'
import moment from 'moment'
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('feedback')
@ObjectType()
export class FeedBack extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string

    @Field(() => String)
    @Column()
    userId: string

    @Field(() => String)
    @Column()
    deviceOS: string

    @Field(() => String)
    @Column()
    appVersion: string

    @Field(() => Float)
    @Column({ type: 'decimal' })
    rating: number

    @Field(() => String)
    @Column()
    issue: string

    @Field(() => String)
    @Column()
    text: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    image: string | null

    @Field(() => String)
    @CreateDateColumn({ type: 'date' })
    createdAt: Date
}
