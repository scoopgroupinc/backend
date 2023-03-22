import { Field, Float, ID, ObjectType } from '@nestjs/graphql'
import moment from 'moment'
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('user_group_codes')
@ObjectType()
export class UserGroupCodes extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string

    @Field(() => String)
    @Column()
    codeId: string

    @Field(() => String)
    @Column()
    userId: string

    @Field(() => String)
    @CreateDateColumn({ type: 'date' })
    createdAt: Date
}
