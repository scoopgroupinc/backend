import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    Timestamp,
    ManyToOne,
    ManyToMany,
    BaseEntity,
} from 'typeorm'
import { ConversationEntity } from './conversation.entity'

@Entity('message')
export class MessageEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    createdAt: Date

    @Column()
    // @ManyToOne(()=>UserEntity,(userEntity)=>userEntity.id)
    senderId: number

    // @ManyToOne(()=>UserEntity,(userEntity)=>userEntity.id)
    @Column()
    recieverId: number

    @Column()
    content: string

    @Column()
    type: string

    @Column()
    sentAt: string

    @Column()
    mediaFile: string

    @Column()
    deletedAt: Date

    @ManyToOne(
        () => ConversationEntity,
        (conversationEntity) => conversationEntity.messages
    )
    conversation: ConversationEntity
}
