import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    UpdateDateColumn,
    OneToMany,
    Column,
    BaseEntity,
} from 'typeorm'
import { MessageEntity } from './messages.entity'

@Entity('conversation')
export class ConversationEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    // @ManyToMany(()=>UserEntity)
    // @JoinTable()
    // users:UserEntity();

    @OneToMany(
        () => MessageEntity,
        (messageEntity) => messageEntity.conversation
    )
    messages: MessageEntity

    @UpdateDateColumn()
    lastUpdated: Date

    @Column()
    isDeleted: Boolean

    @Column()
    socketId: string
}
