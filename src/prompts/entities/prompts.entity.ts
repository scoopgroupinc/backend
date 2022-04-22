import { Field, ID, ObjectType } from '@nestjs/graphql'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

export enum promptType {
    prompts = 'prompts',
    visual_prompts = 'visual_prompts',
}

@Entity('prompts')
@ObjectType()
export class Prompts extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string
    
    @Field(() => String)
    @Column()
    prompt: string

    @Field(() => String)
    @Column({ enum: promptType })
    type: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    sample_answer: string | null
}
