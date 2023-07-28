import {
    Entity,
    Column,
    CreateDateColumn,
    BeforeInsert,
    PrimaryColumn,
} from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { ObjectType, Field } from '@nestjs/graphql' // Import the necessary decorators

import { TEMPLATE_ID, USER_LINK_STATE } from './user-link.constants'

@Entity('user_link')
@ObjectType() // Decorate the class with @ObjectType() to expose it in GraphQL
export class UserLink {
    @PrimaryColumn('uuid')
    @Field() // Expose the id property as a field in GraphQL
    id: string

    @BeforeInsert()
    generateUUID() {
        this.id = uuidv4()
    }

    @Column()
    @Field({ nullable: true }) // Expose the userId property as a field in GraphQL with nullable option
    userId?: string

    @CreateDateColumn()
    @Field() // Expose the createdAt property as a field in GraphQL
    createdAt: Date

    @Column({ default: USER_LINK_STATE.ACTIVE })
    @Field() // Expose the active property as a field in GraphQL
    state: string

    @Column({ default: TEMPLATE_ID.SHARE_PROFILE })
    @Field() // Expose the templateId property as a field in GraphQL
    templateId: string
}
