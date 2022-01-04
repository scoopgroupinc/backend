import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";

@Entity('active_conversation')
export class ActiveConversationEntity{
  @PrimaryColumn()
  id:number;

  @Column()
  socketId:string;

  @Column()
  userId:number;

  @Column()
  conversationId:number
}