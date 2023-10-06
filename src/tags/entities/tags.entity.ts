import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { ObjectType, Field } from '@nestjs/graphql'

export enum tagType {
    physical_activity = 'physical_activity',
    physical_activity_frequency = 'physical_activity_frequency',
    drink = 'drink',
    diet = 'diet',
    date_options = 'date_options',
    gender = 'gender',
    zodiac = 'zodiac',
    language = 'language',
    meyer_briggs = 'meyer_briggs',
    drug_usage = 'drug_usage',
    alcohol_usage = 'alcohol_usage',
    smoking_usage = 'smoking_usage',
    travel_goals = 'travel_goals',
    pets = 'pets',
    music_genre = 'music_genre',
    book_genre = 'book_genre',
    film_genre = 'film_genre',
    creative = 'creative',
    education = 'education',
    ethnicity = 'ethnicity',
    religion = 'religion',
    religion_practice = 'religion_practice',
    cannibis_usage = 'cannibis_usage',
    relationship_type = 'relationship_type',
    relationship_goal = 'relationship_goal',
    parenting_goal = 'parenting_goal',
    politics = 'politics',
    staying_in = 'staying_in',
    going_out = 'going_out',
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
    @Column({ nullable: true })
    emoji: string | null
}
