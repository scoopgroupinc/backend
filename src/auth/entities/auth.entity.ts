import { Field, ID, ObjectType } from '@nestjs/graphql'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('auth')
@ObjectType()
export class Auth extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string

    @Field(() => String)
    @Column()
    userId: string

    @Field(() => String)
    @Column()
    refreshToken: string

    @Field(() => String)
    @Column()
    deviceId: string
}
