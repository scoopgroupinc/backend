import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import { MailerModule } from '@nestjs-modules/mailer'
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter'
import { join } from 'path'
import { DatabaseConfig } from './config/database.config'
import * as configs from 'config'
import { AuthModule } from './auth/auth.module'
import { config } from './config/config'
import { UserProfileModule } from './user-profile/user-profile.module'
import { LocationModule } from './location/location.module'
import { UserPreferenceModule } from './user-preference/user-preference.module'
import { TagsModule } from './tags/tags.module'
import { RatingModule } from './rating/rating.module'
import { RatingCommentModule } from './rating-comment/rating-comment.module'
import { RatingGroupModule } from './rating-group/rating-group.module'
import { RateCriteriasModule } from './rate-criterias/rate-criterias.module'
import { PromptsModule } from './prompts/prompts.module'
import { UserPromptsModule } from './user-prompts/user-prompts.module'
import { ComplaintsModule } from './complaints/complaints.module'
import { MatchesModule } from './matches/matches.modules.'
import { UserChoiceModule } from './user-choice/user-choice.module'
import { MetaDetailsModule } from './meta-details/meta.module'

const { user, pass, host, port } = configs.get('mail')
@Module({
    imports: [
        ConfigModule.forRoot({
            load: [config],
            isGlobal: true,
        }),

        GraphQLModule.forRoot({
            autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
            playground: true,
            introspection: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (database: ConfigService) => ({
                ...database.get('database'),
                host: process.env.DB_HOST1,
            }),
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (database: ConfigService) => ({
                ...database.get('database'),
                host: process.env.DB_HOST2,
            }),
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (database: ConfigService) => ({
                ...database.get('database'),
                host: process.env.DB_HOST3,
            }),
        }),
        MailerModule.forRoot({
            // transport: 'smtps://user@domain.com:pass@smtp.domain.com',
            transport: {
                host,
                port,
                ignoreTLS: true,
                secure: true,
                auth: {
                    user,
                    pass,
                },
            },
            defaults: {
                from: `"Scoop Love" ${user}`,
            },
            template: {
                dir: __dirname + '/templates/',
                adapter: new EjsAdapter(),
                options: {
                    strict: false,
                },
            },
        }),
        AuthModule,
        UserModule,
        UserProfileModule,
        UserPreferenceModule,
        LocationModule,
        TagsModule,
        RatingModule,
        RatingCommentModule,
        RatingGroupModule,
        RateCriteriasModule,
        PromptsModule,
        UserPromptsModule,
        ComplaintsModule,
        MatchesModule,
        UserChoiceModule,
        MetaDetailsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
