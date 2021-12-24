import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import {GraphQLModule} from '@nestjs/graphql'
import { MessageModule } from './chat/chat-events/chat.module';

@Module({
  imports: [
     TypeOrmModule.forRoot(typeOrmConfig),
    // GraphQLModule.forRoot({
    //   autoSchemaFile: true,
    //   playground:true
    // })
    MessageModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
