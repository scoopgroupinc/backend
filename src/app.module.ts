import { DatabaseConfig } from './config/database.config';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { config } from './config/config';
import { UserProfileModule } from './user-profile/user-profile.module';
import { LocationModule } from './location/location.module';
import { UserPreferenceModule } from './user-preference/user-preference.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
   
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    AuthModule,
    UserModule,
    UserProfileModule,
    UserPreferenceModule,
    LocationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
