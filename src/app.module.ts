import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';  

@Module({
  imports: [UserModule,GraphQLModule.forRoot({
  autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
}),],
  controllers: [],
  providers: [],
})
export class AppModule {}
