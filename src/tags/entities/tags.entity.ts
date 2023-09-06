import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { ObjectType, Field } from '@nestjs/graphql'

export enum tagType {
    physical_activity = 'physical_activity',
    zodiac = 'zodiac',
    education = 'education',
    religion = 'religion',
}

@Entity('tags')
@ObjectType()
export class TagsEntity extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string

    @Field(() => String, { nullable: true })
    @Column()
    name: string

    @Field(() => String, { nullable: true })
    @Column({ enum: tagType })
    type: string

    @Field(() => Number, { nullable: true })
    @Column({ type: 'decimal', nullable: true })
    order: number | null

    @Field(() => Boolean, { nullable: true })
    @Column({ type: 'boolean', default: true })
    visible: boolean

    @Field(() => String, { nullable: true })
    @Column({ type: 'text', nullable: true })
    emoji: string | null
}
