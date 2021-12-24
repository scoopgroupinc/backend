import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";

@Entity('active_conversation')
export class ActiveConversationEntity{
  @PrimaryColumn()
  id:number;

  @Column()
  socket_id:string;

  @Column()
  user_id:number;

  @Column()
  conversation_id:number
}