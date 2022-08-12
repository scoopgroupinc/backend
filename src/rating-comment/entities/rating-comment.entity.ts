/* eslint-disable prettier/prettier */
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { ObjectType, Field } from '@nestjs/graphql'

@Entity('rating_comment')
@ObjectType()
export class RatingComment extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string

    @Field()
    @Column({type: 'bigint', nullable: true})
    ratingGroupId: string

    @Field()
    @Column({ nullable: true })
    startTime: string

    @Field()
    @Column({ nullable: true })
    endTime: string

    @Field()
    @Column()
    comment: string

    @Field(() => Boolean)
    @Column({ default: false })
    final: boolean
}
