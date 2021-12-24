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
//     constructor(
//         @InjectRepository(ConversationEntity)
//         private readonly converationRepository:Repository<ConversationEntity>,
//         @InjectRepository(ActiveConversationEntity)
//         private readonly activeConversationRepository:Repository<ActiveConversationEntity>,
//         @InjectRepository(MessageEntity)
//         private readonly messageRepository:Repository<MessageEntity>
        
//     ){ }

//     getConversation(creator_id:number,match_id:number):Observable<ConversationDTO | undefined> {
//         return from(
//           this.converationRepository.createQueryBuilder('conversation')
//           .leftJoin('conversation.users','user')
//           .where('user.user_id=: creator_id',{creator_id})
//           .orWhere('user.user_id=:match_id',{match_id})
//           .groupBy('conversation.id')
//           .having('COUNT(*)>1')
//           .getOne()
//         ).pipe(map((conversation:ConversationDTO)=> conversation||undefined))
//     }

//     createConversation(creator,match): Observable<ConversationDTO>{
//         return this.getConversation(creator.id,match.id).pipe(
//             switchMap((conversation:ConversationDTO)=>{
//                 const doesConversationExist = !!conversation;
//                 if(!doesConversationExist){
//                     // const newConversation:ConversationDTO ={
//                     //     users:[creator,match]
//                     // }
//                     // return from(this.converationRepository.save(newConversation));
//                 }

//                 return of(conversation);
//             })
//         )
//     }

//    getConversationForUser(user_id:number):Observable<ConversationDTO[]>{
//         return from(this.converationRepository
//             .createQueryBuilder('conversation')
//             .leftJoin('conversation.users','user')
//             .where('user.user_id= :user_Id',{user_id})
//             .orderBy('conversation.lastUpdated','DESC')
//             .getMany()
//         )
//     }

//     getUsersInConversation(conversationId:number):Observable<ConversationDTO[]>{
//          return from(
//              this.converationRepository
//              .createQueryBuilder('conversation')
//              .leftJoin('conversation.users','user')
//              .where('conversation.id= :conversationId',{id:conversationId})            
//              .getMany()
//          )
//      }


//     getConversationWithUsers(user_id:number):Observable<ConversationDTO[]>{
//          return this.getConversationForUser(user_id).pipe(
//              take(1),
//              switchMap((conversations:ConversationDTO[])=>conversations),
//              mergeMap((conversation:ConversationDTO)=>{
//                  return this.getUsersInConversation(conversation.id);
//              })
//          )
//      }

//     getActiveUsers(conversationId: number): Observable<ActiveConversationDTO[]> {
//         return from(
//           this.activeConversationRepository.find({
//             where: [{conversation_id: conversationId }],
//           }),
//         );
//       }

//      joinConversation(match_id:number,user_id:number,socket_id:string):Observable<ActiveConversationDTO>{
//          return this.getConversation(user_id,match_id).pipe(
//              switchMap((conversation:ActiveConversationDTO)=>{
//                  if(!conversation){
//                      console.warn(`No conversation exists for userId: ${user_id} and match ${match_id}`)
//                      return of();
//                     }
//                     const conversationId= conversation.id;
//                     return from (this.activeConversationRepository.findOne({user_id})).pipe(
//                      switchMap((activeConversation:ActiveConversationDTO)=>{
//                          if(activeConversation){
//                              return from(this.activeConversationRepository.delete({user_id}))
//                              .pipe(
//                                 switchMap(()=>{
//                                     return from(
//                                         this.activeConversationRepository.save({
//                                             id:conversationId,
//                                             user_id,
//                                             socket_id,
//                                             lastUpdated: new Date(),
                                            
//                                         })
//                                     )
//                                 })
//                             )
//                          }else{
//                             return from(
//                                 this.activeConversationRepository.save({
//                                     id:conversationId,
//                                     user_id,
//                                     socket_id,
//                                     lastUpdated: new Date(),
                                    
//                                 })
//                             )
//                          }
//                      })
//                     );

//              })
//          )
//      }

//     leaveConversation(socket_id:string):Observable<DeleteResult>{
//          return from(this.activeConversationRepository.delete({socket_id}));
//      }

    //  createMessage(messageDTo:MessageDTO):Observable<MessageDTO>{
    //     //  return  from(this.messageRepository.save(messageDTo));
    //  }

//      getmessages(conversation_id:number): Observable<MessageDTO[]>{
//          return  from (
//              this.messageRepository
//              .createQueryBuilder('messages')
//              .where('message.conversation.id=:conversation_id',{conversation_id})
//              .orderBy('message.created_at','ASC')
//              .getMany()
//          )
//      }

//      deleteMessage(message_id:number){
//          return from(
//              this.messageRepository
//              .createQueryBuilder()
//              .update(MessageDTO)
//              .set({deleted_at:new Date()})
//              .where('id=:id',{id:message_id})
//              .execute()
//          )
//      }
}