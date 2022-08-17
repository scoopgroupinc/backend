import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from 'typeorm'
import { ObjectType, Field, ID, Float } from '@nestjs/graphql'
import { content_type } from 'src/rating-group/entities/rating-group.entity'

@Entity('rating')
@ObjectType()
export class Rating extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date

    @Field(() => String)
    @Column({ type: 'bigint', nullable: true })
    contentId: string

    @Field(() => String)
    @Column()
    criteriaId: string

    @Field(() => String)
    @Column({ type: 'bigint', nullable: true })
    raterId: string

    @Field(() => String)
    @Column({ enum: content_type, nullable: true })
    type: string

    @Field(() => Float)
    @Column({ type: 'decimal' })
    rating: number

    @Field(() => Boolean)
    @Column({ default: false })
    final: boolean
}
