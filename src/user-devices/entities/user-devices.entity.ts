import { Field, ObjectType, ID } from '@nestjs/graphql'
import {
    PrimaryColumn,
    Entity,
    Unique,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm'
import { IsNumber, IsMACAddress } from 'class-validator'
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata'

@Entity('user_devices')
@ObjectType()
export class UserDevice extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string

    @Field(() => ID)
    @PrimaryColumn({ type: 'bigint' })
    userId: string

    @Field(() => String)
    @CreateDateColumn({ type: 'timestamp' })
    createdAt?: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    osType: string

    @Field(() => String, { nullable: true })
    @IsMACAddress()
    @Column({ nullable: true })
    macAddress?: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    version?: string

    @Field(() => String, { nullable: true })
    @UpdateDateColumn()
    lastLogin?: string

    @Field(() => String, { nullable: true })
    @Column({ type: 'varchar', nullable: true })
    notificationToken: string
}
