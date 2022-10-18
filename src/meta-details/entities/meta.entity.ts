import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

@Entity('meta_details')
@ObjectType()
export class MetaDetails extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string

    @Field(() => String)
    @Column()
    forceUpdateAndroid: string

    @Field(() => String)
    @Column()
    forceUpdateIOS: string

    @Field(() => String)
    @Column()
    updateAndroid: string

    @Field(() => String)
    @Column()
    updateIOS: string

    @Field(() => String)
    @Column()
    updateTitleAndroid: string

    @Field(() => String)
    @Column()
    updateTitleIOS: string

    @Field(() => String)
    @Column()
    updateButtonAndroid: string

    @Field(() => String)
    @Column()
    updateButtonIOS: string

    @Field(() => String)
    @Column()
    updateTextAndroid: string

    @Field(() => String)
    @Column()
    updateTextIOS: string

    @Field(() => String)
    @Column()
    closeUpdateButtonAndroid: string

    @Field(() => String, { nullable: true })
    @Column()
    closeUpdateButtonIOS: string

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date

    @Field(() => String)
    @UpdateDateColumn()
    updateAt: Date
}
