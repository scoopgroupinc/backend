import { ObjectType, Field } from '@nestjs/graphql'
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

export enum content_type {
    user_visuals = 'user_visuals',
    user_prompts = 'user_prompts',
}

@Entity('rating_group')
@ObjectType()
export class RatingGroup extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string

    @Field()
    @Column({ type: 'bigint', nullable: true })
    raterId: string

    @Field()
    @Column({ enum: content_type })
    type: string

    @Field()
    @Column({ type: 'bigint', nullable: true })
    contentId: string

    @Field(() => [String], { nullable: true })
    @Column('simple-array', { nullable: true, default: [] })
    ratingIds: string[]

    @Field(() => [String], { nullable: true })
    @Column('simple-array', { nullable: true, default: [] })
    commentIds: string[]

    @Field(() => String)
    @Column()
    startTime: string

    @Field(() => String)
    @Column()
    endTime: string
}
