import {
SubscribeMessage,
WebSocketGateway,
OnGatewayInit,
WebSocketServer,
OnGatewayConnection,
OnGatewayDisconnect,
WsResponse,

} from '@nestjs/websockets';
import {Logger, UseGuards} from '@nestjs/common';
import {Socket} from 'socket.io';
import {Server} from 'ws'
import { Subscription,take,of  } from 'rxjs';
import { ChatService } from './chat.service';
import { MessageDTO } from './dto/message.dto';
import { ActiveConversationDTO } from './dto/active-conversation.dto';


@WebSocketGateway({ namespace: '/chat' })
export class MessageGateway implements OnGatewayInit,OnGatewayConnection, OnGatewayDisconnect{
   constructor(
    //    private authService:AuthService,
    //    private chatService:ChatService
    ){}

    @WebSocketServer() server:Server;

    private logger: Logger = new Logger('MessageGateway');

        
    @SubscribeMessage('joinRoom')
    public joinRoom(client:Socket, message:any):void{
        console.log(message)
        client.join('client.id');
        this.server.to(message.id).emit('newRoom',message);
    }
    
    public afterInit(server:Server):void{
        return this.logger.log('Init');
    }

    public async handleDisconnect(client:Socket){
        this.logger.log(`Client disconnected: ${client.id}`);
        // return await this.chatService
        // .leaveConversation(client.id)
        // .pipe(take(1))
        // .subscribe();
    }
    
    // @UseGuards()
    public handleConnection(client:Socket):void{
        this.logger.log(`Client connected: ${client.id}`);
        const jwt= client.handshake.headers.authorization || null;
        // this.authService.getJwtUser(jwt).subscribe((user:User)=>{
        //     if(!user){
        //       return  this.handleDisconnect(client);
        //     }

        //     client.data.user= user;
        //     this.getConversations(client,user.user_id);
            
        // })
       
    }

    // getConversations(client:Socket,user_id:number):Subscription{
    //     // return  this.chatService.getConversationWithUsers(user_id)
    //     // .subscribe((conversations)=>{
    //     //     this.server.to(client.id).emit('conversations',conversations);
    //     // })
    // }


    @SubscribeMessage('createconversation')
   async  createConversation (client:Socket,match){
        // return this.chatService
        // .createConversation(client.data.user,match)
        // .pipe(take(1))
        // .subscribe(()=>{
        //     this.getConversations(client,client.data.user.user_id)
        // })
   }

   @SubscribeMessage('msgToServer')
    public handleMessage(client:Socket,payload:any):void{

        console.log(client,payload)
        if(!payload.conversation){
            // return of(null);
        }
       
        const {user}= client.data;
        payload.user= user;

        if(payload.conversation.id){
            // this.chatService.createMessage(payload)
            // .pipe(take(1))
            // .subscribe((message:MessageDTO)=>{
            //     payload.id= message.id;

            //     this.chatService
            //     .getActiveUsers(payload.conversation.id)
            //     .pipe(take(1))
            //     .subscribe((activeConversations:ActiveConversationDTO[])=>{
            //         activeConversations.forEach(
            //             (activeConversation:ActiveConversationDTO)=>{
            //                 this.server
            //                 .to(activeConversation.socket_id)
            //                 .emit('msgToClient',payload)
            //             }
            //         )
            //     })
            // })
        }
        // return this.server.to(payload.room).emit('msgToClient',payload)
    }

    @SubscribeMessage('deletedMessage')
    deleteMessage(message_id:number){
    //   return  this.chatService.deleteMessage(message_id)
    //     .pipe(take(1))
    //     .subscribe();
    }

    @SubscribeMessage('leaveConversation')
    leaveConversation(client:Socket){
        // this.chatService.leaveConversation(client.id)
        // .pipe(take(1))
        // .subscribe();
    }

    @SubscribeMessage('getMediFile')
    uploadMediaFile(client:Socket){

    }
}
