import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DeleteResult } from "typeorm";
import { MessageEntity } from "./entities/messages.entity";
import {ConversationEntity} from './entities/conversation.entity'
import { Observable,of,from,take } from "rxjs";
import {map,tap,switchMap, mergeMap} from 'rxjs/operators'
import { ConversationDTO } from "./dto/conversation.dto";
import { ActiveConversationDTO } from "./dto/active-conversation.dto";
import { ActiveConversationEntity } from "./entities/active-conversation.entity";
import { MessageDTO } from "./dto/message.dto";

@Injectable()
export class ChatService{
    constructor(
        @InjectRepository(ConversationEntity)
        private converationRepository:Repository<ConversationEntity>,
        @InjectRepository(ActiveConversationEntity)
        private activeConversationRepository:Repository<ActiveConversationEntity>,
        @InjectRepository(MessageEntity)
        private messageRepository:Repository<MessageEntity>
        
    ){ }

    getConversation(creatorId:number,matchId:number):Observable<ConversationDTO | undefined> {
        return from(
          this.converationRepository.createQueryBuilder('conversation')
          .leftJoin('conversation.users','user')
          .where('user.id=: id',{id:creatorId})
          .orWhere('user.id= :id',{id:matchId})
          .groupBy('conversation.id')
          .having('COUNT(*)>1')
          .getOne()
        ).pipe(map((conversation:ConversationDTO)=> conversation||undefined))
    }

    createConversation(creator,match): Observable<ConversationDTO>{
        return this.getConversation(creator.id,match.id).pipe(
            switchMap((conversation:ConversationDTO)=>{
                const doesConversationExist = !!conversation;
                if(!doesConversationExist){
                    const newConversation:ConversationDTO ={
                        users:[creator,match]
                    }
                    return from(this.converationRepository.save(newConversation));
                }

                return of(conversation);
            })
        )
    }

   getConversationForUser(userId:number):Observable<ConversationDTO[]>{
        return from(this.converationRepository
            .createQueryBuilder('conversation')
            .leftJoin('conversation.users','user')
            .where('user.id= :id',{id:userId})
            .orderBy('conversation.lastUpdated','DESC')
            .getMany()
        )
    }

    getUsersInConversation(conversationId:number):Observable<ConversationDTO[]>{
         return from(
             this.converationRepository
             .createQueryBuilder('conversation')
             .leftJoin('conversation.users','user')
             .where('conversation.id= :id',{id:conversationId})            
             .getMany()
         )
     }


    getConversationWithUsers(userId:number):Observable<ConversationDTO[]>{
         return this.getConversationForUser(userId).pipe(
             take(1),
             switchMap((conversations:ConversationDTO[])=>conversations),
             mergeMap((conversation:ConversationDTO)=>{
                 return this.getUsersInConversation(conversation.id);
             })
         )
     }

    getActiveUsers(conversationId: number): Observable<ActiveConversationDTO[]> {
        return from(
          this.activeConversationRepository.find({
            where: [{conversationId }],
          }),
        );
      }

     joinConversation(matchId:number,userId:number,socketId:string):Observable<ActiveConversationDTO>{
         return this.getConversation(userId,matchId).pipe(
             switchMap((conversation:ActiveConversationDTO)=>{
                 if(!conversation){
                     console.warn(`No conversation exists for userId: ${userId} and match ${matchId}`)
                     return of();
                    }
                    const conversationId= conversation.id;
                    return from (this.activeConversationRepository.findOne({userId})).pipe(
                     switchMap((activeConversation:ActiveConversationDTO)=>{
                         if(activeConversation){
                             return from(this.activeConversationRepository.delete({userId}))
                             .pipe(
                                switchMap(()=>{
                                    return from(
                                        this.activeConversationRepository.save({
                                            id:conversationId,
                                            userId,
                                            socketId,
                                            lastUpdated: new Date(),
                                            
                                        })
                                    )
                                })
                            )
                         }else{
                            return from(
                                this.activeConversationRepository.save({
                                    id:conversationId,
                                    userId,
                                    socketId,
                                    lastUpdated: new Date(),
                                    
                                })
                            )
                         }
                     })
                    );

             })
         )
     }

    leaveConversation(socketId:string):Observable<DeleteResult>{
         return from(this.activeConversationRepository.delete({socketId}));
     }

     createMessage(messageDTo:MessageDTO):Observable<MessageDTO>{
         return  from(this.messageRepository.save(messageDTo));
     }

     getmessages(conversationId:number): Observable<MessageDTO[]>{
         return  from (
             this.messageRepository
             .createQueryBuilder('messages')
             .where('message.conversation.id=:conversation_id',{conversationId})
             .orderBy('message.created_at','ASC')
             .getMany()
         )
     }

     deleteMessage(messageId:number){
         return from(
             this.messageRepository
             .createQueryBuilder()
             .update(MessageDTO)
             .set({deletedAt:new Date()})
             .where('id=:id',{id:messageId})
             .execute()
         )
     }
}