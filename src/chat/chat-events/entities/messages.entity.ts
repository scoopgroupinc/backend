import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp, ManyToOne, ManyToMany, BaseEntity } from "typeorm";
import { ConversationEntity } from "./conversation.entity";

@Entity('message')
export class MessageEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @CreateDateColumn()
    created_at:Date;
    
    @Column()
    // @ManyToOne(()=>UserEntity,(userEntity)=>userEntity.id)
    sender_id:number;
 
    // @ManyToOne(()=>UserEntity,(userEntity)=>userEntity.id)
    @Column()
    reciever_id:number;

    @Column()
    content:string;

    @Column()
    type:string;
    
    @Column()
    sent_at:string;
    
    @Column()
    media_file:string;

    @Column()
    deleted_at:Date;

    @ManyToOne(()=>ConversationEntity,(conversationEntity)=>conversationEntity.messages)
    conversation:ConversationEntity
}