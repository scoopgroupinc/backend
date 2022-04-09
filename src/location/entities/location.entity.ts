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
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string
    @Field(() => String)
    @Column({ type: 'bigint' })
    userId: string
    @Field(() => String, { nullable: true })
    @Column()
    latitude: string
    @Field(() => String, { nullable: true })
    @Column()
    longitude: string
    @Field(() => String, { nullable: true })
    @Column()
    addressLine1: string
    @Field(() => String, { nullable: true })
    @Column()
    addressLine2: string
    @Field(() => String, { nullable: true })
    @Column()
    stateProvince: string
    @Field(() => String, { nullable: true })
    @Column()
    country: string
    @Field(() => Number, { nullable: true })
    @Column()
    zipPostal: number
}
