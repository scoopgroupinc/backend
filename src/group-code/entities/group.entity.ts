import { Field, Float, ID, ObjectType } from '@nestjs/graphql'
import moment from 'moment'
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('group_codes')
@ObjectType()
export class GroupCodes extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string

    @Field(() => String)
    @Column()
    code: string

    @Field(() => Boolean)
    @Column({ default: true })
    active: boolean

    @Field(() => String)
    @CreateDateColumn({ type: 'date' })
    createdAt: Date
}
