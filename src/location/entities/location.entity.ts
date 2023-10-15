import {
    Entity,
    BaseEntity,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    Column,
    Unique,
} from 'typeorm'
import { ObjectType, ID, Field } from '@nestjs/graphql'
@Entity('location')
@ObjectType()
@Unique(['userId'])
export class LocationEntity extends BaseEntity {
    @Field(() => ID)
    @PrimaryColumn({ type: 'bigint' })
    userId: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    latitude: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    longitude: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    addressLine1: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    addressLine2: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    stateProvince: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    country: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    city: string

    @Field(() => Number, { nullable: true })
    @Column({ nullable: true })
    zipPostal: number
}
