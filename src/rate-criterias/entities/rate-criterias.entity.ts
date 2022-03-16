/* eslint-disable prettier/prettier */
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { ObjectType, Field, ID } from '@nestjs/graphql'

@Entity('rate_criterias')
@ObjectType()
export class RateCriterias extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string

    @Field(() => String)
    @Column()
    criteriaId: string

    @Field(() => String)
    @Column()
    title: string

    @Field(() => String)
    @Column()
    description: string

    @Field(() => String)
    @Column()
    type: string
}
