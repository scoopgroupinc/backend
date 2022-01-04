import {Module} from '@nestjs/common';
import { MessageGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationEntity } from './entities/conversation.entity';
import { MessageEntity } from './entities/messages.entity';
import { ActiveConversationEntity } from './entities/active-conversation.entity';
import { RedisIoAdapter } from '../adapters/redis.adapter';
import { ChatService } from './chat.service';


@Module({
    imports:[
        TypeOrmModule.forFeature([
            // ActiveConversationEntity,
            // ConversationEntity,           
            // MessageEntity,
        ]           
        ),

    ],
    controllers:[],
    providers:[MessageGateway],
})

export class MessageModule{}