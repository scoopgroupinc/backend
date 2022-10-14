import { Field, ID, ObjectType } from '@nestjs/graphql'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('meta-details')
@ObjectType()
export class MetaDetails extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string

    @Field(() => String)
    @Column({ default: '0.0.0' })
    forceUpdateAndroid: string

    @Field(() => String)
    @Column({ default: '0.0.0' })
    forceUpdateIOS: string

    @Field(() => String)
    @Column({ default: '0.0.0' })
    updateAndroid: string

    @Field(() => String)
    @Column({ default: "It's time to update" })
    updateTitleAndroid: string

    @Field(() => String)
    @Column({ default: "It's time to update" })
    updateTitleIOS: string

    @Field(() => String)
    @Column({ default: 'update now' })
    updateButtonAndroid: string

    @Field(() => String)
    @Column({ default: 'update now' })
    updateButtonIOS: string

    @Field(() => String)
    @Column({ default: 'we are constantly trying to make Scoop better' })
    updateTextAndroid: string

    @Field(() => String)
    @Column({ default: 'we are constantly trying to make Scoop better' })
    updateTextIOS: string

    @Field(() => String)
    @Column({ default: 'update later' })
    closeUpdateButtonAndroid: string

    @Field(() => String, { nullable: true })
    @Column({ default: 'update later' })
    closeUpdateButtonIOS: string | null
}
