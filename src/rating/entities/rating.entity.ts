import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@Entity('rating')
@ObjectType()
export class Rating extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string;

    @Field(() => String,{nullable: true})
    @Column({nullable: true})
    createdAt: string;

    @Field(() => String)
    @Column({ type: 'bigint', nullable: true })
    contentId: string;

    @Field(() => String)
    @Column()
    criteriaId: string;

    @Field(() => String)
    @Column({ type: 'bigint', nullable: true })
    raterId: string;

    @Field(() => Float)
    @Column({ type: 'decimal' })
    rating: number;

    @Field(() => Boolean)
    @Column({ default: false })
    final: boolean;
}
